import styled from 'styled-components';

const StyledCard = styled('div')`
    width: ${(p) => p.width};
    display: flex;
    flex-direction: column;
`;

const StyledCardElement = styled('div')`
    height: 35px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 0.5px solid grey;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const StyledValue = styled('span')`
    margin-left: auto;
    font-weight: 700;
    font-size: 18px;
`;
export default StyledCard;
export { StyledCardElement, StyledValue };
