import { createContext, useState } from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';

import { JWT_TOKEN } from '../../constants';

const CustomerContext = createContext();
const setCustomerFromJWT = () => {
    const token = localStorage.getItem(JWT_TOKEN);
    if (!token) return null;
    const { id, email, name } = jwt(token);
    return { id, email, name };
};

function CustomerProvider({ children }) {
    const [customer, setCustomer] = useState(setCustomerFromJWT());
    const [error, setError] = useState();

    const signin = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/signin', {
                email,
                password
            });
            localStorage.setItem(JWT_TOKEN, response.data.token);
            setCustomer(setCustomerFromJWT());
            setError(null);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const logout = () => {
        localStorage.removeItem(JWT_TOKEN);
        setCustomer(null);
    };

    const valueToShare = {
        customer,
        error,
        signin,
        logout
    };

    return <CustomerContext.Provider value={valueToShare}>{children}</CustomerContext.Provider>;
}

export default CustomerProvider;
export { CustomerContext };
