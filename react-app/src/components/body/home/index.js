import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import useCustomerContext from '../../../context/customer/hook';
import { useState } from 'react';

const Home = () => {
    const [showLogin, setShowLogin] = useState(true);
    const { customer } = useCustomerContext();
    console.log(customer);
    const form = showLogin ? <LoginForm /> : <RegisterForm />;
    return <>{customer ? <div>Welcome, {customer.name}</div> : form}</>;
};

export default Home;
