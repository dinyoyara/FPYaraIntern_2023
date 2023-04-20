import { createContext, useState } from 'react';

import axiosClient from '../../services/axios.service';
import { handleAxiosError } from '../helpers';

const ProductContext = createContext();

function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState([]);

    const createProductAsync = async (name, price, size, type) => {
        try {
            await axiosClient.post(`/products`, { name, price, size, type });
            await getAllProductsAsync();
            return true;
        } catch (error) {
            handleAxiosError(error, setErrors);
            return false;
        }
    };

    const getAllProductsAsync = async () => {
        try {
            const response = await axiosClient.get(`/products`);
            setProducts(response.data);
        } catch (error) {
            handleAxiosError(error, setErrors);
        }
    };

    const clearErrors = () => {
        setErrors([]);
    };

    const valueToShare = {
        products,
        errors,
        createProductAsync,
        getAllProductsAsync,
        clearErrors
    };

    return <ProductContext.Provider value={valueToShare}>{children}</ProductContext.Provider>;
}

export default ProductProvider;
export { ProductContext };
