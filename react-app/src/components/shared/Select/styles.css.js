import styled from 'styled-components';

const StyledSelectContainer = styled('div')`
    margin: 10px 0;
    height: ${(p) => p.height};
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 1rem;
`;

const StyledSelect = styled('select')`
    height: 60%;
    padding 5px;
    background: rgba(192,192,192, 0.2);
    border: none;
    border-radius: 5px;
`;

const StyledOption = styled('option')``;

export { StyledSelectContainer, StyledSelect, StyledOption };
