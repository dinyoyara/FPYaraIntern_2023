import { createContext, useState } from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';

import { JWT_TOKEN, API_BASE_URL } from '../../constants';

const CustomerContext = createContext();

const getCustomerFromJWT = () => {
    const token = localStorage.getItem(JWT_TOKEN);
    if (!token) return null;
    const { id, email, name } = jwt(token);
    return { id, email, name };
};

function CustomerProvider({ children }) {
    const url = API_BASE_URL + '/auth';

    const [customer, setCustomer] = useState(getCustomerFromJWT());
    const [error, setError] = useState();

    const signupAsync = async (name, email, password) => {
        try {
            await axios.post(`${url}/signup`, { name, email, password });
            return true;
        } catch (error) {
            setError(error.response.data.message);
            return false;
        }
    };

    const signinAsync = async (email, password) => {
        try {
            const response = await axios.post(`${url}/signin`, {
                email,
                password
            });
            localStorage.setItem(JWT_TOKEN, response.data.token);
            setCustomer(getCustomerFromJWT());
            setError(null);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const logout = () => {
        localStorage.removeItem(JWT_TOKEN);
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
