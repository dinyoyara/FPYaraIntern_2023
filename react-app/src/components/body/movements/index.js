import { useState, useEffect } from 'react';

import Card from '../../shared/Card';
import Form from '../../shared/Form';
import { StyledError } from '../../styles.css';
import DataContainer from '../../shared/DataContainer';
import { StyledScreen, StyledDataPart } from '../styles.css';
import useMovementContext from '../../../context/movement/hook';
import useProductContext from '../../../context/product/hook';
import useWarehouseContext from '../../../context/warehouse/hook';
import { formInputHeight } from '../../../styles/const';
import { UNKNOWN, EXTERNAL } from '../../../constants';
import { getDateString, isValueInteger } from './helpers';
import Modal from '../../shared/Modal';

const Movements = () => {
    const [inputDate, setInputDate] = useState(new Date().toISOString().split('T')[0]);
    const [inputCount, setInputCount] = useState(1);
    const [inputExporterName, setInputExporterName] = useState();
    const [inputImporterName, setInputImporterName] = useState();
    const [inputProductName, setInputProductName] = useState();

    const [fieldsErrors, setFieldsErrors] = useState({ inputCount: '' });
    const [formIsValid, setFormIsValid] = useState(true);

    const [limitation, setLimitation] = useState();

    const [showDetails, setShowDetails] = useState(false);
    const [showMovements, setShowMovements] = useState(false);

    const [exportOptions, setExportOptions] = useState([]);
    const [importOptions, setImportOptions] = useState([]);
    const [productOptions, setProductOptions] = useState([]);

    const [formName, setFormName] = useState('Import / Export');

    const { warehouse, warehouses, getAllByCustomerAsync, getOneAsync } = useWarehouseContext();
    const { movements, error, clearError, createMovementAsync, getAllByWarehouseIdAsync } = useMovementContext();
    const { products, getAllAsync } = useProductContext();

    useEffect(() => {
        getAllByCustomerAsync();
        getAllAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        clearError();
        checkFormIsValid();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputCount, inputExporterName, inputImporterName, inputProductName]);

    const validateField = (fieldName, value) => {
        const currentErrors = { ...fieldsErrors };
        currentErrors[fieldName] = '';
        switch (fieldName) {
            case 'inputCount':
                if (value < 1 || !isValueInteger(value))
                    currentErrors[fieldName] = `size should be positive and integer`;
                break;
            default:
                break;
        }
        setFieldsErrors(currentErrors);
    };

    const checkFormIsValid = () => {
        const validValues = fieldsErrors.inputCount === '';
        const notEmptyValues = inputExporterName && inputImporterName && inputProductName;
        setFormIsValid(validValues && notEmptyValues);
    };

    const handleOnChange = (event, setter, fieldName) => {
        setter(event.target.value);
        clearError();
        validateField(fieldName, event.target.value);
    };

    const handleCreate = async () => {
        const exportedWh = warehouses.find((x) => x.name === inputExporterName);
        const exportedWhId = exportedWh ? exportedWh.id : null;
        const importedWh = warehouses.find((x) => x.name === inputImporterName);
        const importedWhId = importedWh ? importedWh.id : null;
        const product = products.find((x) => x.name === inputProductName);

        const haveSpace = await validateImporterFreeSpace(importedWh, product, inputCount);
        if (!haveSpace) return;

        const result = await createMovementAsync(exportedWhId, importedWhId, product.id, inputCount, inputDate);

        if (result) {
            getAllByCustomerAsync();
            setShowDetails(false);
            clearForm();
        }
    };

    const validateImporterFreeSpace = async (importedWr, product, count) => {
        const productsSpace = product.size * count;
        if (importedWr && importedWr.freeSpace < productsSpace) {
            setLimitation('no space for this count');
            return false;
        }

        return true;
    };

    const clearForm = () => {
        setInputDate(new Date().toISOString().split('T')[0]);
        setInputCount(1);
        setInputExporterName();
        setInputImporterName();
        setInputProductName();
        setImportOptions([]);
        setExportOptions([]);
        setProductOptions([]);
    };

    const handleShowDetails = async (id) => {
        const result = await getOneAsync(id);
        if (result) setShowDetails(true);
    };

    const hideDetails = () => {
        setShowDetails(false);
        setShowMovements(false);
    };

    const handleShowMovements = async (id) => {
        const result = await getAllByWarehouseIdAsync(id);
        if (result) setShowMovements(true);
    };

    const handleHideMovements = () => {
        setShowMovements(false);
    };

    // IMPORT / EXPORT
    const handleAddExport = (name, type, warehouseProducts) => {
        setShowMovements(false);
        clearError();
        const exportedWh = warehouses.find((x) => x.name === name);
        if (exportedWh.size === exportedWh.freeSpace) {
            clearForm();
            setLimitation('no products to export');
            return;
        }
        setFormName('Export');

        setInputExporterName(name);
        setExportOptions([{ name: name }]);

        setImportOptions(() => {
            const correctWarehouses = warehouses
                .filter((x) => x.name !== name && (x.type === type || x.type === UNKNOWN))
                .map((x) => ({ name: x.name }));
            correctWarehouses.unshift({ name: EXTERNAL });
            return correctWarehouses;
        });
        setInputImporterName(EXTERNAL);

        setProductOptions(() => {
            return warehouseProducts.map((p) => ({ name: p.name }));
        });
        setInputProductName(warehouseProducts[0].name);
    };

    const handleAddImport = async (name, type, freeSpace) => {
        setShowMovements(false);
        clearError();
        if (freeSpace === 0) {
            clearForm();
            setLimitation('no space for import');
            return;
        }
        setFormName('Import');

        setInputImporterName(name);
        setImportOptions([{ name: name }]);

        setExportOptions(() => {
            const correctWarehouses = warehouses
                .filter((x) => x.name !== name && x.size > x.freeSpace && (type === UNKNOWN ? true : x.type === type))
                .map((x) => ({ name: x.name }));
            correctWarehouses.unshift({ name: EXTERNAL });
            return correctWarehouses;
        });
        setInputExporterName(EXTERNAL);

        const correctProducts = type === UNKNOWN ? products : products.filter((x) => x.type === type);
        setProductOptions(() => {
            return correctProducts.map((x) => ({ name: x.name }));
        });
        setInputProductName(correctProducts[0].name);
    };

    // SET WAREHOUSES DATA
    const getWarehousesDataLabels = () => {
        const { id, freeSpace, ...props } = warehouses[0];
        return Object.keys(props);
    };

    const getWarehousesData = () => {
        return warehouses.map((x) => ({ id: x.id, name: x.name, size: x.size, type: x.type }));
    };

    const getWarehousesDataActions = () => {
        return [{ name: 'details', onClick: (id) => handleShowDetails(id) }];
    };

    // SET MOVEMENTS DATA
    const getMovementsDataLabel = () => {
        return ['exported Warehouse', 'imported Warehouse', 'product', 'count', 'date'];
    };

    const getMovementsData = () => {
        return movements
            .sort((x) => x.date)
            .map((x) => ({
                id: x.id,
                exportedWarehouse: x.exportedWarehouse ? x.exportedWarehouse.name : EXTERNAL,
                importedWarehouse: x.importedWarehouse ? x.importedWarehouse.name : EXTERNAL,
                product: x.product.name,
                productCount: x.productCount,
                date: getDateString(x.date)
            }));
    };

    // SET FORM ELEMENTS
    const getFormInputs = () => {
        return [
            {
                id: 'date',
                type: 'date',
                value: inputDate,
                label: 'Date:',
                height: formInputHeight,
                onChange: (e) => handleOnChange(e, setInputDate, 'inputDate')
            },
            {
                id: 'count',
                type: 'number',
                value: inputCount,
                label: 'Count:',
                height: formInputHeight,
                onChange: (e) => handleOnChange(e, setInputCount, 'inputCount')
            }
        ];
    };

    const getFormSelects = () => {
        return [
            {
                id: 'export',
                defaultValue: inputExporterName,
                label: 'Export from:',
                onChange: (e) => handleOnChange(e, setInputExporterName, 'inputExporterName'),
                height: formInputHeight,
                options: exportOptions
            },
            {
                id: 'import',
                defaultValue: inputImporterName,
                label: 'Import to:',
                onChange: (e) => handleOnChange(e, setInputImporterName, 'inputExporterName'),
                height: formInputHeight,
                options: importOptions
            },
            {
                id: 'product',
                defaultValue: inputProductName,
                label: 'Product:',
                onChange: (e) => handleOnChange(e, setInputProductName, 'inputProductName'),
                height: formInputHeight,
                options: productOptions
            }
        ];
    };

    const getFormButtons = () => {
        return [
            {
                text: 'Create',
                type: 'button',
                active: formIsValid,
                handleClick: handleCreate
            },
            {
                text: 'Clear',
                type: 'button',
                active: true,
                handleClick: clearForm
            }
        ];
    };

    // JSX
    return (
        <StyledScreen>
            <StyledDataPart width='30%'>
                <Form
                    selectsInfo={getFormSelects()}
                    inputsInfo={getFormInputs()}
                    buttonsInfo={getFormButtons()}
                    title={formName}
                    error={error}
                />
                {fieldsErrors.inputCount ? <StyledError>{fieldsErrors.inputCount}</StyledError> : null}
            </StyledDataPart>

            <StyledDataPart width='65%'>
                {!showMovements && warehouses.length > 0 ? (
                    <DataContainer
                        labelData={getWarehousesDataLabels()}
                        data={getWarehousesData()}
                        title='Warehouses'
                        actions={getWarehousesDataActions()}
                        height='45%'
                        rowContainerHeight='60%'
                    />
                ) : null}
                {!showMovements && warehouses.length === 0 ? <StyledError>No warehouses</StyledError> : null}

                {showDetails ? (
                    <Card
                        data={warehouse}
                        width='100%'
                        height='55%'
                        addExport={handleAddExport}
                        addImport={handleAddImport}
                        showMovements={handleShowMovements}
                        hideMovements={handleHideMovements}
                        isMovementsShowed={showMovements}
                        hideDetails={hideDetails}
                        dataContainerHeight='50%'
                        rowContainerHeight='60%'
                    />
                ) : null}
                {showMovements && movements.length > 0 ? (
                    <DataContainer
                        labelData={getMovementsDataLabel()}
                        data={getMovementsData()}
                        title='Movements'
                        height='45%'
                        rowContainerHeight='60%'
                    />
                ) : null}
                {showMovements && movements.length === 0 ? <StyledError>No movements</StyledError> : null}
            </StyledDataPart>
            <Modal text={limitation} show={limitation} toggle={() => setLimitation()} />
        </StyledScreen>
    );
};

export default Movements;
