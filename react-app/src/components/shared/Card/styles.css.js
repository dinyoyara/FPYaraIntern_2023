import styled from 'styled-components';

const StyledCard = styled('div')`
    padding-top: 15px;
    margin: 10px 0;
    width: ${(p) => p.width};
    background: rgba(192, 192, 192, 0.1);
    display: flex;
    flex-direction: column;
`;

const StyledCardElement = styled('div')`
    padding: 0 15px;
    height: 25px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 0.5px solid rgba(192, 192, 192, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const StyledValue = styled('span')`
    margin-left: auto;
    font-weight: 600;
    font-size: 16px;
`;
const StyledLinkContainer = styled('div')`
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export default StyledCard;
export { StyledCardElement, StyledValue, StyledLinkContainer };
