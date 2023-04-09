import { useState } from 'react';

import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import useCustomerContext from '../../../context/customer/hook';
import { StyledLink } from './styles.css';

const Home = () => {
    const [showLogin, setShowLogin] = useState(true);
    const { customer } = useCustomerContext();

    const changeActiveForm = () => {
        setShowLogin((prev) => !prev);
    };

    const form = showLogin ? <LoginForm /> : <RegisterForm goToLogin={setShowLogin} />;
    return (
        <>
            {customer ? (
                <div>Welcome, {customer.name}</div>
            ) : (
                <>
                    {form}
                    <StyledLink onClick={changeActiveForm}>{showLogin ? 'signup' : 'signin'}</StyledLink>
                </>
            )}
        </>
    );
};

export default Home;