import styled from 'styled-components';

const StyledLabelsRow = styled('div')`
    padding: 8px;
    width: 100%;
    height: 35px;
    box-sizing: border-box;
    display: flex;
    background: rgba(192, 192, 192, 0.2);
    margin-top: 30px;
    margin-bottom: 5px;
    font-weight: 700;
`;

const StyledLabel = styled('div')`
    width: ${(p) => p.width};
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: space-around;
`;

export default StyledLabelsRow;
export { StyledLabel };
