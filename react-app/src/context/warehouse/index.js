import { createContext, useState } from 'react';

import axiosClient from '../../services/axios.service';

const WarehouseContext = createContext();

function WarehouseProvider({ children }) {
    const [warehouses, setWarehouses] = useState([]);
    const [warehouse, setWarehouse] = useState();
    const [error, setError] = useState('');

    const createWarehouseAsync = async (name, size, type) => {
        try {
            await axiosClient.post(`/warehouses`, { name, type, size });
            await getAllByCustomerAsync();
            return true;
        } catch (error) {
            setError(error.response.data.message);
            return false;
        }
    };

    const updateAsync = async (id, name, size, type) => {
        try {
            await axiosClient.put(`/warehouses/${id}`, { name, size, type });
            await getAllByCustomerAsync();
            return true;
        } catch (error) {
            setError(error.response.data.message);
            return false;
        }
    };

    const getAllByCustomerAsync = async () => {
        try {
            const response = await axiosClient.get(`/warehouses`);
            setWarehouses(response.data);
        } catch (error) {
            //setError(error.response.data.message);
        }
    };

    const getOneAsync = async (id) => {
        try {
            const response = await axiosClient.get(`/warehouses/${id}`);
            setWarehouse(response.data);
            return true;
        } catch (error) {
            return false;
            //setError(error.response.data.message);
        }
    };

    const deleteAsync = async (id) => {
        try {
            await axiosClient.delete(`/warehouses/${id}`);
            await getAllByCustomerAsync();
        } catch (error) {
            //setError(error.response.data.message);
        }
    };

    const clearError = () => {
        setError(null);
    };

    const valueToShare = {
        warehouse,
        warehouses,
        error,
        createWarehouseAsync,
        updateAsync,
        getAllByCustomerAsync,
        getOneAsync,
        deleteAsync,
        clearError
    };

    return <WarehouseContext.Provider value={valueToShare}>{children}</WarehouseContext.Provider>;
}

export default WarehouseProvider;
export { WarehouseContext };
