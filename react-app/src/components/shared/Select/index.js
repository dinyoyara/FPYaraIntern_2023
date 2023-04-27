import React from 'react';

import { StyledFieldContainer } from '../../styles.css';
import StyledSelect from './styles.css';

const SelectContainer = ({ id, defaultValue, onChange, label, width, height, options }) => {
    return (
        <StyledFieldContainer width={width} height={height}>
            <label htmlFor={id}>{label}</label>
            <StyledSelect id={id} value={defaultValue} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.name} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </StyledSelect>
        </StyledFieldContainer>
    );
};

export default SelectContainer;
