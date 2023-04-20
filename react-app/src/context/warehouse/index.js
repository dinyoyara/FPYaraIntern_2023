import { createContext, useState } from 'react';

import axiosClient from '../../services/axios.service';
import { handleAxiosError } from '../helpers';

const WarehouseContext = createContext();

function WarehouseProvider({ children }) {
    const [warehouses, setWarehouses] = useState([]);
    const [warehouse, setWarehouse] = useState();
    const [errors, setErrors] = useState([]);

    const createWarehouseAsync = async (name, size, type) => {
        try {
            await axiosClient.post(`/warehouses`, { name, type, size });
            await getAllWarehousesByCustomerAsync();
            return true;
        } catch (error) {
            handleAxiosError(error, setErrors);
            return false;
        }
    };

    const updateWarehouseAsync = async (id, name, size, type) => {
        try {
            await axiosClient.put(`/warehouses/${id}`, { name, size, type });
            await getAllWarehousesByCustomerAsync();
            return true;
        } catch (error) {
            setErrors(error.response.data.message);
            return false;
        }
    };

    const getAllWarehousesByCustomerAsync = async () => {
        try {
            const response = await axiosClient.get(`/warehouses`);
            setWarehouses(response.data);
        } catch (error) {
            //setError(error.response.data.message);
        }
    };

    const getWarehouseAsync = async (id) => {
        try {
            const response = await axiosClient.get(`/warehouses/${id}`);
            setWarehouse(response.data);
            return true;
        } catch (error) {
            return false;
            //setError(error.response.data.message);
        }
    };

    const deleteWarehouseAsync = async (id) => {
        try {
            await axiosClient.delete(`/warehouses/${id}`);
            await getAllWarehousesByCustomerAsync();
        } catch (error) {
            //setError(error.response.data.message);
        }
    };

    const clearErrors = () => {
        setErrors([]);
    };

    const valueToShare = {
        warehouse,
        warehouses,
        errors,
        createWarehouseAsync,
        updateWarehouseAsync,
        getAllWarehousesByCustomerAsync,
        getWarehouseAsync,
        deleteWarehouseAsync,
        clearErrors
    };

    return <WarehouseContext.Provider value={valueToShare}>{children}</WarehouseContext.Provider>;
}

export default WarehouseProvider;
export { WarehouseContext };
