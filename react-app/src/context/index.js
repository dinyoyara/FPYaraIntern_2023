import CustomerProvider from './customer';
import WarehouseProvider from './warehouse';

const ContextProvider = ({ children }) => {
    return (
        <CustomerProvider>
            <WarehouseProvider>{children}</WarehouseProvider>
        </CustomerProvider>
    );
};

export default ContextProvider;
