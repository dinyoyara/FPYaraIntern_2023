import { useState } from 'react';

import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import { StyledLink } from '../../styles.css';
import { StyledGreeting } from './styles.css';
import useCustomerContext from '../../../context/customer/hook';

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
                <StyledGreeting>Welcome, {customer.name}</StyledGreeting>
            ) : (
                <>
                    {form}
                    <StyledLink onClick={changeActiveForm}>{showLogin ? 'sign up' : 'sign in'}</StyledLink>
                </>
            )}
        </>
    );
};

export default Home;
