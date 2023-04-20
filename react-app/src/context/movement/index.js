import { createContext, useState } from 'react';

import axiosClient from '../../services/axios.service';
import { handleAxiosError } from '../helpers';

const MovementContext = createContext();

function MovementProvider({ children }) {
    const [movements, setMovements] = useState([]);
    const [errors, setErrors] = useState([]);

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
            handleAxiosError(error, setErrors);
            return false;
        }
    };

    const getAllMovementsByWarehouseIdAsync = async (id) => {
        try {
            const response = await axiosClient.get(`/movements/warehouse/${id}`);
            setMovements(response.data);
            return true;
        } catch (error) {
            handleAxiosError(error, setErrors);
            return false;
        }
    };

    const clearErrors = () => {
        setErrors([]);
    };

    const valueToShare = {
        movements,
        errors,
        createMovementAsync,
        getAllMovementsByWarehouseIdAsync,
        clearErrors
    };

    return <MovementContext.Provider value={valueToShare}>{children}</MovementContext.Provider>;
}

export default MovementProvider;
export { MovementContext };
