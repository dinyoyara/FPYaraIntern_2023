import CustomerProvider from './customer';

const ContextProvider = ({ children }) => {
    return <CustomerProvider>{children}</CustomerProvider>;
};

export default ContextProvider;
