import React from 'react';

import { StyledInputContainer, StyledInput } from './styles.css';

const InputContainer = ({ type, id, placeholder, label, width, value, onChange, height }) => {
    return (
        <StyledInputContainer width={width} height={height}>
            <label htmlFor={id}>{label}</label>
            <StyledInput type={type} id={id} placeholder={placeholder} value={value} onChange={onChange} />
        </StyledInputContainer>
    );
};

export default InputContainer;
