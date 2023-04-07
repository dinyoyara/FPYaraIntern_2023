import React from 'react';

import StyledButton from './styles.css';

const Button = ({ text, type, handleClick, active }) => {
    return (
        <StyledButton type={type} onClick={handleClick} disabled={!active}>
            {text}
        </StyledButton>
    );
};

export default Button;
