import StyledNavElement from './styles.css';

const NavElement = ({ name, click, ...styleProps }) => {
    return (
        <StyledNavElement onClick={click} {...styleProps}>
            {name}
        </StyledNavElement>
    );
};

export default NavElement;
