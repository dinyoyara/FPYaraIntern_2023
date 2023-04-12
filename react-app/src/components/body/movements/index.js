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
import { GetDateString } from './helpers';

const Movements = () => {
    const [inputDate, setInputDate] = useState(new Date().toISOString().split('T')[0]);
    const [inputCount, setInputCount] = useState(1);
    const [inputExporterName, setInputExporterName] = useState();
    const [inputImporterName, setInputImporterName] = useState();
    const [inputProductName, setInputProductName] = useState();

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
        setLimitation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showDetails, showMovements]);

    const handleOnChange = (event, setter, fieldName) => {
        setter(event.target.value);
        clearError();
        // validateField(fieldName, event.target.value);
    };

    const handleCreate = async () => {
        const exporter = warehouses.find((x) => x.name === inputExporterName);
        const exporterId = exporter ? exporter.id : null;
        const importer = warehouses.find((x) => x.name === inputImporterName);
        const importerId = importer ? importer.id : null;
        const product = products.find((x) => x.name === inputProductName);
        const productId = product.id;
        console.log(exporterId, importerId, productId, inputCount, inputDate);
        const result = await createMovementAsync(exporterId, importerId, productId, inputCount, inputDate);
        if (result) {
            clearForm();
        }
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

        if (warehouseProducts.length === 0) {
            clearForm();
            setLimitation('no products to export');
            return;
        }
        setLimitation();
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

        setProductOptions(() => {
            return warehouseProducts.map((p) => ({ name: p.name }));
        });
        setInputProductName(warehouseProducts[0].name);
    };

    const handleAddImport = async (name, type, freeSpace) => {
        setShowMovements(false);

        if (freeSpace === 0) {
            clearForm();
            setLimitation('no space for import');
            return;
        }
        setLimitation();
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
        return movements.map((x) => ({
            id: x.id,
            exportedWarehouse: x.exportedWarehouse ? x.exportedWarehouse.name : EXTERNAL,
            importedWarehouse: x.importedWarehouse ? x.importedWarehouse.name : EXTERNAL,
            product: x.product.name,
            productCount: x.productCount,
            date: GetDateString(x.date)
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
                onChange: (e) => handleOnChange(e, setInputDate, 'date')
            },
            {
                id: 'count',
                type: 'number',
                value: inputCount,
                label: 'Count:',
                height: formInputHeight,
                onChange: (e) => handleOnChange(e, setInputCount, 'count')
            }
        ];
    };

    const getFormSelects = () => {
        return [
            {
                id: 'export',
                defaultValue: inputExporterName,
                label: 'Export from:',
                onChange: (e) => handleOnChange(e, setInputExporterName, 'export'),
                height: formInputHeight,
                options: exportOptions
            },
            {
                id: 'import',
                defaultValue: inputImporterName,
                label: 'Import to:',
                onChange: (e) => handleOnChange(e, setInputImporterName, 'import'),
                height: formInputHeight,
                options: importOptions
            },
            {
                id: 'product',
                defaultValue: inputProductName,
                label: 'Product:',
                onChange: (e) => handleOnChange(e, setInputProductName, 'product'),
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
            <Form
                selectsInfo={getFormSelects()}
                inputsInfo={getFormInputs()}
                buttonsInfo={getFormButtons()}
                title={formName}
                error={error}
            />

            <StyledDataPart width='65%'>
                {!showMovements && warehouses.length > 0 ? (
                    <DataContainer
                        labelData={getWarehousesDataLabels()}
                        data={getWarehousesData()}
                        title='Warehouses'
                        actions={getWarehousesDataActions()}
                    />
                ) : null}
                {!showMovements && warehouses.length === 0 ? <StyledError>No warehouses</StyledError> : null}

                {showDetails ? (
                    <Card
                        data={warehouse}
                        width='100%'
                        addExport={handleAddExport}
                        addImport={handleAddImport}
                        showMovements={handleShowMovements}
                        hideMovements={handleHideMovements}
                        isMovementsShowed={showMovements}
                        hideDetails={hideDetails}
                    />
                ) : null}
                {limitation ? <StyledError>{limitation}</StyledError> : null}
                {showMovements && movements.length > 0 ? (
                    <DataContainer labelData={getMovementsDataLabel()} data={getMovementsData()} title='Movements' />
                ) : null}
                {showMovements && movements.length === 0 ? <StyledError>No movements</StyledError> : null}
            </StyledDataPart>
        </StyledScreen>
    );
};

export default Movements;
