import { createContext, useState } from 'react';
import axios from 'axios';

const CustomerContext = createContext();

function CustomerProvider({ children }) {
    const [customer, setCustomer] = useState({
        token: ''
    });

    const signin = async (email, password) => {
        const response = await axios.post('http://localhost:3000/auth/signin', {
            email,
            password
        });

        setCustomer(response.data);
    };

    const valueToShare = {
        customer,
        signin
    };

    return <CustomerContext.Provider value={valueToShare}>{children}</CustomerContext.Provider>;
}

export { CustomerProvider };
export default CustomerContext;
