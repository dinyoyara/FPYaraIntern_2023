import { useState, useEffect } from 'react';

import { StyledScreen, StyledDataPart } from '../styles.css';
import { StyledError } from '../../styles.css';
import DataContainer from '../../shared/DataContainer';
import useWarehouseContext from '../../../context/warehouse/hook';
import Card from '../../shared/Card';

const Movements = () => {
    const [showDetails, setShowDetails] = useState(false);

    const { warehouse, warehouses, getAllAsync, getOneAsync } = useWarehouseContext();

    useEffect(() => {
        getAllAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleViewDetails = (id) => {
        getOneAsync(id);
        setShowDetails(true);
    };

    const handleViewMovements = (id) => {
        console.log(id);
    };
    const handleAddEXport = (id, type, products) => {
        console.log(type, products);
    };
    const handleAddImport = (id, type, freeSpace) => {
        console.log(freeSpace);
    };

    const getDataLabels = () => {
        const { id, freeSpace, ...props } = warehouses[0];
        return Object.keys(props);
    };

    const getWarehousesData = () => {
        return warehouses.map((x) => ({ id: x.id, name: x.name, size: x.size, type: x.type }));
    };

    const getDataActions = () => {
        return [{ name: 'details', onClick: (id) => handleViewDetails(id) }];
    };

    return (
        <StyledScreen>
            <StyledDataPart width='45%'>
                {warehouses.length > 0 ? (
                    <DataContainer
                        labelData={getDataLabels()}
                        data={getWarehousesData()}
                        title='Warehouses'
                        actions={getDataActions()}
                    />
                ) : (
                    <StyledError>No warehouses</StyledError>
                )}
            </StyledDataPart>
            {showDetails && warehouse ? (
                <Card
                    data={warehouse}
                    width='50%'
                    addExport={handleAddEXport}
                    addImport={handleAddImport}
                    viewMovements={handleViewMovements}
                />
            ) : null}
        </StyledScreen>
    );
};

export default Movements;
