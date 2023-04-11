import CustomerProvider from './customer';
import WarehouseProvider from './warehouse';
import ProductProvider from './product';
import MovementProvider from './movement';

const ContextProvider = ({ children }) => {
    return (
        <CustomerProvider>
            <WarehouseProvider>
                <ProductProvider>
                    <MovementProvider>{children}</MovementProvider>
                </ProductProvider>
            </WarehouseProvider>
        </CustomerProvider>
    );
};

export default ContextProvider;
