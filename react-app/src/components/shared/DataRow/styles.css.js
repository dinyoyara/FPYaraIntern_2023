import styled from 'styled-components';

const StyledDataRow = styled('div')`
    padding: 8px;
    width: 100%;
    height: 35px;
    box-sizing: border-box;
    display: flex;
    background: rgba(192, 192, 192, 0.2);
    margin-bottom: 5px;
`;

const StyledData = styled('div')`
    width: ${(p) => p.width};
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: space-around;
`;

const StyledAction = styled('div')`
    font-size: 14px;
    color: blue;
    cursor: pointer;
`;

export default StyledDataRow;
export { StyledData, StyledAction };
