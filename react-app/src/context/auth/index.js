import { createContext, useState } from 'react';
import axios from 'axios';

const CustomerContext = createContext();

function CustomerProvider({ children }) {
    const [customer, setCustomer] = useState({
        token: '',
        operationError: ''
    });

    const signin = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/signin', {
                email,
                password
            });
            setCustomer({ token: response.data.token, operationError: '' });
        } catch (error) {
            setCustomer({ token: '', operationError: error.response.data.message });
        }
    };

    const valueToShare = {
        customer,
        signin
    };

    return <CustomerContext.Provider value={valueToShare}>{children}</CustomerContext.Provider>;
}

export default CustomerProvider;
export { CustomerContext };
