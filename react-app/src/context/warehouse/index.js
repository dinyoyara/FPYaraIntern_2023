import { createContext, useState } from 'react';

import axiosClient from '../../services/axios.service';

const WarehouseContext = createContext();

function WarehouseProvider({ children }) {
    const [warehouses, setWarehouses] = useState();
    const [error, setError] = useState();

    const createWarehouseAsync = async (name, size, type) => {
        try {
            await axiosClient.post(`/warehouses`, { name, type, size });
            await getAllAsync();
            return true;
        } catch (error) {
            setError(error.response.data.message);
            return false;
        }
    };

    const updateAsync = async (id, name, size, type) => {
        try {
            await axiosClient.put(`/warehouses/${id}`, { name, size, type });
            await getAllAsync();
            return true;
        } catch (error) {
            setError(error.response.data.message);
            return false;
        }
    };

    const getAllAsync = async () => {
        try {
            const response = await axiosClient.get(`/warehouses`);
            setWarehouses(response.data);
        } catch (error) {
            //setError(error.response.data.message);
        }
    };

    const deleteAsync = async (id) => {
        try {
            await axiosClient.delete(`/warehouses/${id}`);
            await getAllAsync();
        } catch (error) {}
    };

    const clearError = () => {
        setError(null);
    };

    const valueToShare = {
        warehouses,
        error,
        createWarehouseAsync,
        updateAsync,
        getAllAsync,
        deleteAsync,
        clearError
    };

    return <WarehouseContext.Provider value={valueToShare}>{children}</WarehouseContext.Provider>;
}

export default WarehouseProvider;
export { WarehouseContext };
