import React from 'react';
import NavElement from './navElement';
import StyledHeader from './styles.css';

const Header = ({ handleNavigation }) => {
    const logout = () => {
        console.log('logout');
    };

    return (
        <StyledHeader>
            <NavElement name='Home' click={() => handleNavigation('/')} />
            <NavElement name='Warehouses' click={() => handleNavigation('/warehouses')} />
            <NavElement name='Products' click={() => handleNavigation('/products')} />
            <NavElement name='Movements' click={() => handleNavigation('/movements')} />
            <NavElement name='logout' click={logout} />
        </StyledHeader>
    );
};

export default Header;
