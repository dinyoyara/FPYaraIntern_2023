import { createContext, useState } from 'react';

import axiosClient from '../../services/axios.service';

const WarehouseContext = createContext();

function WarehouseProvider({ children }) {
    const [warehouse, setWarehouse] = useState();
    const [error, setError] = useState();

    const createWarehouseAsync = async (name, size, type) => {
        try {
            const result = await axiosClient.post(`/warehouses`, { name, type, size });
            setWarehouse(result.data);
        } catch (error) {
            setError(error);
        }
    };

    const getAllAsync = async () => {};

    const valueToShare = {
        warehouse,
        error,
        createWarehouseAsync
    };

    return <WarehouseContext.Provider value={valueToShare}>{children}</WarehouseContext.Provider>;
}

export default WarehouseProvider;
export { WarehouseContext };
