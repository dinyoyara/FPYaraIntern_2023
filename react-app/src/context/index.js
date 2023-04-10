import CustomerProvider from './customer';
import WarehouseProvider from './warehouse';
import ProductProvider from './product';

const ContextProvider = ({ children }) => {
    return (
        <CustomerProvider>
            <WarehouseProvider>
                <ProductProvider>{children}</ProductProvider>
            </WarehouseProvider>
        </CustomerProvider>
    );
};

export default ContextProvider;
