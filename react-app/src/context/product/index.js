import { createContext, useState } from 'react';

import axiosClient from '../../services/axios.service';

const ProductContext = createContext();

function ProductProvider({ children }) {
    const [products, setProducts] = useState();
    const [error, setError] = useState();

    const createProductAsync = async (name, price, size, type) => {
        try {
            await axiosClient.post(`/products`, { name, price, type, size });
            await getAllAsync();
            return true;
        } catch (error) {
            setError(error.response.data.message);
            return false;
        }
    };

    const getAllAsync = async () => {
        try {
            const response = await axiosClient.get(`/products`);
            setProducts(response.data);
        } catch (error) {
            //setError(error.response.data.message);
        }
    };

    const clearError = () => {
        setError(null);
    };

    const valueToShare = {
        products,
        error,
        createProductAsync,
        getAllAsync,
        clearError
    };

    return <ProductContext.Provider value={valueToShare}>{children}</ProductContext.Provider>;
}

export default ProductProvider;
export { ProductContext };
