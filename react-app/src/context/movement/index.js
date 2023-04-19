import { createContext, useState } from 'react';

import axiosClient from '../../services/axios.service';

const MovementContext = createContext();

function MovementProvider({ children }) {
    const [movements, setMovements] = useState([]);
    const [error, setError] = useState();

    const createMovementAsync = async (exportedWarehouseId, importedWarehouseId, productId, productCount, date) => {
        try {
            await axiosClient.post(`/movements`, {
                exportedWarehouseId,
                importedWarehouseId,
                productId,
                productCount,
                date
            });
            return true;
        } catch (error) {
            setError(error.response.data.message);
            return false;
        }
    };

    const getAllMovementsByWarehouseIdAsync = async (id) => {
        try {
            const response = await axiosClient.get(`/movements/warehouse/${id}`);
            setMovements(response.data);
            return true;
        } catch (error) {
            return false;
            //setError(error.response.data.message);
        }
    };

    const clearError = () => {
        setError();
    };

    const valueToShare = {
        movements,
        error,
        createMovementAsync,
        getAllMovementsByWarehouseIdAsync,
        clearError
    };

    return <MovementContext.Provider value={valueToShare}>{children}</MovementContext.Provider>;
}

export default MovementProvider;
export { MovementContext };
