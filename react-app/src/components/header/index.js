import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import NavElement from './navElement';
import StyledHeader from './styles.css';
import useCustomerContext from '../../context/customer/hook';

const Header = ({ handleNavigation }) => {
    const { customer, logout } = useCustomerContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };

    return (
        <StyledHeader>
            {customer ? (
                <>
                    <NavElement name='Warehouses' click={() => handleNavigation('/warehouses')} />
                    <NavElement name='Products' click={() => handleNavigation('/products')} />
                    <NavElement name='Movements' click={() => handleNavigation('/movements')} />
                    <NavElement name='logout' click={handleLogout} />
                </>
            ) : (
                <div>Stock application</div>
            )}
        </StyledHeader>
    );
};

export default Header;
