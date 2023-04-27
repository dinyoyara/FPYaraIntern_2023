import React from 'react';

import StyledInput from './styles.css';
import { StyledFieldContainer } from '../../styles.css';

const InputContainer = ({ type, id, placeholder, label, width, value, onChange, height }) => {
    return (
        <StyledFieldContainer width={width} height={height}>
            <label htmlFor={id}>{label}</label>
            <StyledInput type={type} id={id} placeholder={placeholder} value={value} onChange={onChange} />
        </StyledFieldContainer>
    );
};

export default InputContainer;
