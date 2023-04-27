import { useNavigate } from 'react-router-dom';

import NavElement from './navElement';
import StyledHeader from './styles.css';
import { StyledTitle } from '../styles.css';
import useCustomerContext from '../../context/customer/hook';

const Header = ({ handleNavigation }) => {
    const { customer, logout } = useCustomerContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <StyledHeader>
            {customer ? (
                <>
                    <NavElement name='Warehouses' click={() => handleNavigation('/warehouses')} marginLeft='20px' />
                    <NavElement name='Products' click={() => handleNavigation('/products')} marginLeft='20px' />
                    <NavElement name='Movements' click={() => handleNavigation('/movements')} marginLeft='20px' />
                    <NavElement name='logout' click={handleLogout} marginLeft='auto ' marginRight='20px' />
                </>
            ) : (
                <StyledTitle>Stock application</StyledTitle>
            )}
        </StyledHeader>
    );
};

export default Header;
