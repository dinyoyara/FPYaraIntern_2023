import React from 'react';

import { StyledSelectContainer, StyledSelect, StyledOption } from './styles.css';

const SelectContainer = ({ id, defaultValue, onChange, label, width, height, options }) => {
    return (
        <StyledSelectContainer width={width} height={height}>
            <label htmlFor={id}>{label}</label>
            <StyledSelect id={id} value={defaultValue} onChange={onChange}>
                {options.map((option) => (
                    <StyledOption key={option.name} value={option.name}>
                        {option.name}
                    </StyledOption>
                ))}
            </StyledSelect>
        </StyledSelectContainer>
    );
};

export default SelectContainer;
