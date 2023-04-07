import StyledNavElement from './styles.css';

const NavElement = ({ name, click }) => {
    return <StyledNavElement onClick={click}>{name}</StyledNavElement>;
};

export default NavElement;
