import jwt from 'jwt-decode';
import { createContext, useState } from 'react';

import axiosClient from '../../services/axios.service';
import { getToken, setToken, removeToken } from '../../services/storage.service';

const CustomerContext = createContext();

const getCustomerFromJWT = () => {
    const token = getToken();
    if (!token) return null;
    const { id, email, name } = jwt(token);
    return { id, email, name };
};

function CustomerProvider({ children }) {
    const [customer, setCustomer] = useState(getCustomerFromJWT());
    const [error, setError] = useState();

    const signupAsync = async (name, email, password) => {
        try {
            await axiosClient.post(`auth/signup`, { name, email, password });
            return true;
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
            return false;
        }
    };

    const signinAsync = async (email, password) => {
        try {
            const response = await axiosClient.post(`auth/signin`, {
                email,
                password
            });
            setToken(response.data.token);
            setCustomer(getCustomerFromJWT());
            setError(null);
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    };

    const logout = () => {
        removeToken();
        setCustomer(null);
    };

    const clearError = () => {
        setError(null);
    };

    const valueToShare = {
        customer,
        error,
        signupAsync,
        signinAsync,
        logout,
        clearError
    };

    return <CustomerContext.Provider value={valueToShare}>{children}</CustomerContext.Provider>;
}

export default CustomerProvider;
export { CustomerContext };
