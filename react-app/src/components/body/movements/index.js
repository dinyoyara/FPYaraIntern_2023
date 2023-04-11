import { useState, useEffect } from 'react';

import { StyledScreen, StyledDataPart } from '../styles.css';
import { StyledError } from '../../styles.css';
import DataContainer from '../../shared/DataContainer';
import useWarehouseContext from '../../../context/warehouse/hook';
import useMovementContext from '../../../context/movement/hook';
import Card from '../../shared/Card';

const Movements = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [showMovements, setShowMovements] = useState(false);

    const { warehouse, warehouses, getAllAsync, getOneAsync } = useWarehouseContext();
    const { movements, error, createMovementAsync, getAllByWarehouseIdAsync } = useMovementContext();

    useEffect(() => {
        setShowMovements(false);
    }, [warehouse]);

    useEffect(() => {
        getAllAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const handleAddEXport = (id, type, products) => {
        console.log(type, products);
    };
    const handleAddImport = (id, type, freeSpace) => {
        console.log(freeSpace);
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

    return (
        <StyledScreen>
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
            {showDetails ? (
                <Card
                    data={warehouse}
                    width='50%'
                    addExport={handleAddEXport}
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
