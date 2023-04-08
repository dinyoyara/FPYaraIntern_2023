import CustomerProvider from './auth';

const ContextProvider = ({ children }) => {
    return <CustomerProvider>{children}</CustomerProvider>;
};

export default ContextProvider;
