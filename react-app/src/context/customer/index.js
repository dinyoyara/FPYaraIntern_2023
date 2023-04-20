import { createContext, useState } from 'react';

import { getCustomerFromJWT } from './helpers';
import axiosClient from '../../services/axios.service';
import { setToken, getToken, removeToken } from '../../services/storage.service';

const CustomerContext = createContext();

function CustomerProvider({ children }) {
    const [customer, setCustomer] = useState(getCustomerFromJWT(getToken));
    const [errors, setErrors] = useState(['aa', 'bb']);

    const signupAsync = async (name, email, password) => {
        try {
            await axiosClient.post(`auth/signup`, { name, email, password });
            return true;
        } catch (error) {
            handleAxiosError(error);
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
            setCustomer(getCustomerFromJWT(getToken));
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const logout = () => {
        removeToken();
        setCustomer(null);
    };

    const clearErrors = () => {
        setErrors([]);
    };

    const handleAxiosError = (error) => {
        const errorMessages = error.response.data.message;
        setErrors(errorMessages);
    };

    const valueToShare = {
        customer,
        errors,
        signupAsync,
        signinAsync,
        logout,
        clearErrors
    };

    return <CustomerContext.Provider value={valueToShare}>{children}</CustomerContext.Provider>;
}

export default CustomerProvider;
export { CustomerContext };
