import { useContext } from 'react';
import { CustomerContext } from '.';

function useCustomerContext() {
    return useContext(CustomerContext);
}

export default useCustomerContext;
