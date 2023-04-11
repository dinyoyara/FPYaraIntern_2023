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

const Movements = () => {
    const [inputSize, setInputCount] = useState();
    const [inputExporterName, setInputExporterName] = useState();
    const [inputImporterName, setInputImporterName] = useState();
    const [inputProductName, setInputProductName] = useState();
    const [formIsValid, setFormIsValid] = useState(true);

    const [showDetails, setShowDetails] = useState(false);
    const [showMovements, setShowMovements] = useState(false);
    const [showForm, setShowForm] = useState(false);

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
        const exporterId = warehouses.find((x) => x.name === inputExporterName).id;
        const importerId = warehouses.find((x) => x.name === inputImporterName).id;
        const result = await createMovementAsync(exporterId, importerId, inputSize);
        if (result) {
            clearForm();
        }
    };

    const clearForm = () => {};

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

    const handleAddExport = (id, type, products) => {
        setShowForm(true);
        setShowMovements(false);
    };

    const handleAddImport = (id, type, freeSpace) => {
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
                id: 'size',
                value: inputSize,
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
                options: []
            },
            {
                id: 'import',
                defaultValue: inputImporterName,
                label: 'Import to:',
                onChange: (e) => handleOnChange(e, setInputImporterName, 'import'),
                height: formInputHeight,
                options: []
            },
            {
                id: 'product',
                defaultValue: inputProductName,
                label: 'Product:',
                onChange: (e) => handleOnChange(e, setInputProductName, 'product'),
                height: formInputHeight,
                options: []
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
                handleClick: () => setShowForm(false)
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
