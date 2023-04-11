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
import { UNKNOWN } from '../../../constants';

const Movements = () => {
    const [inputDate, setInputDate] = useState();
    const [inputCount, setInputCount] = useState();
    const [inputExporterName, setInputExporterName] = useState();
    const [inputImporterName, setInputImporterName] = useState();
    const [inputProductName, setInputProductName] = useState();

    const [formIsValid, setFormIsValid] = useState(true);

    const [showDetails, setShowDetails] = useState(false);
    const [showMovements, setShowMovements] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [exportOptions, setExportOptions] = useState([]);
    const [importOptions, setImportOptions] = useState([]);
    const [productOptions, setProductOptions] = useState([]);

    const { warehouse, warehouses, getAllByCustomerAsync, getOneAsync } = useWarehouseContext();
    const { movements, error, clearError, createMovementAsync, getAllByWarehouseIdAsync } = useMovementContext();
    const { products, getAllAsync } = useProductContext();

    useEffect(() => {
        setShowMovements(false);
    }, [warehouse]);

    useEffect(() => {
        getAllByCustomerAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnChange = (event, setter, fieldName) => {
        setter(event.target.value);
        clearError();
        // validateField(fieldName, event.target.value);
    };

    const handleCreate = async () => {
        const exporter = warehouses.find((x) => x.name === inputExporterName);
        const importer = warehouses.find((x) => x.name === inputImporterName);
        const product = products.find((x) => x.name === inputProductName);
        console.log(inputDate, exporter, importer, product);
        //const result = await createMovementAsync(exporterId, importerId, inputCount);
        // if (result) {
        //     clearForm();
        // }
    };

    const handleRemoveForm = () => {
        setShowForm(false);
        clearForm();
    };

    const clearForm = () => {
        setInputDate();
        setInputCount();
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

    const handleViewMovements = async (id) => {
        const result = await getAllByWarehouseIdAsync(id);
        if (result) setShowMovements(true);
    };

    const handleHideMovements = () => {
        setShowMovements(false);
    };

    const handleAddExport = (name, type, products) => {
        if (products.length === 0) return;
        setInputExporterName(name);
        setExportOptions([{ name: name }]);
        setProductOptions(() => {
            return products.map((p) => ({ name: p.name }));
        });
        setImportOptions(() => {
            if (warehouses.length === 0) return [];
            return warehouses
                .filter((x) => (x.type === type || x.type === UNKNOWN) && x.name !== name)
                .map((x) => ({ name: x.name }));
        });
        setShowMovements(false);
        setShowForm(true);
    };

    const handleAddImport = async (name, type, freeSpace) => {
        if (freeSpace === 0) return;
        setInputImporterName(name);
        setImportOptions([{ name: name }]);
        setExportOptions(() => {
            return warehouses
                .filter((x) => x.name !== name && (type === UNKNOWN ? true : x.type === type))
                .map((x) => ({ name: x.name }));
        });
        setInputExporterName(exportOptions[0]);
        await getAllAsync();
        const correctProducts = type === UNKNOWN ? products : products.filter((x) => x.type === type);
        setProductOptions(() => {
            return correctProducts.map((x) => ({ name: x.name }));
        });
        setInputProductName(productOptions[0]);
        setShowForm(true);
        setShowMovements(false);
    };

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

    const getMovementsDataLabel = () => {
        return ['exported Warehouse', 'imported Warehouse', 'product', 'count', 'date'];
    };

    const getMovementsData = () => {
        return movements.map((x) => ({
            id: x.id,
            exportedWarehouse: x.exportedWarehouse ? x.exportedWarehouse.name : 'n/a',
            importedWarehouse: x.importedWarehouse ? x.importedWarehouse.name : 'n/a',
            product: x.product.name,
            productCount: x.productCount,
            date: x.date
        }));
    };

    const getFormInputs = () => {
        return [
            {
                id: 'date',
                value: inputDate,
                type: 'date',
                label: 'Date:',
                height: formInputHeight,
                onChange: (e) => handleOnChange(e, setInputDate, 'date')
            },
            {
                id: 'size',
                value: inputCount,
                type: 'number',
                label: 'Size:',
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
                text: 'Remove Form',
                type: 'button',
                active: true,
                handleClick: handleRemoveForm
            }
        ];
    };

    return (
        <StyledScreen>
            {!showForm ? (
                <StyledDataPart width='45%'>
                    {warehouses.length > 0 ? (
                        <DataContainer
                            labelData={getWarehousesDataLabels()}
                            data={getWarehousesData()}
                            title='Warehouses'
                            actions={getWarehousesDataActions()}
                        />
                    ) : (
                        <StyledError>No warehouses</StyledError>
                    )}
                </StyledDataPart>
            ) : (
                <Form
                    selectsInfo={getFormSelects()}
                    inputsInfo={getFormInputs()}
                    buttonsInfo={getFormButtons()}
                    title='Import / Export'
                    error={error}
                />
            )}
            {showDetails ? (
                <Card
                    data={warehouse}
                    width='50%'
                    addExport={handleAddExport}
                    addImport={handleAddImport}
                    viewMovements={handleViewMovements}
                    hideMovements={handleHideMovements}
                    showMovements={showMovements}
                />
            ) : null}
            {showMovements && movements.length > 0 ? (
                <DataContainer labelData={getMovementsDataLabel()} data={getMovementsData()} title='Movements' />
            ) : null}
            {showMovements && movements.length === 0 ? <StyledError>No movements</StyledError> : null}
        </StyledScreen>
    );
};

export default Movements;
