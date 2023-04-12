import styled from 'styled-components';

const StyledModal = styled('div')`
    width: 250px;
    height: 100px;
    padding: 20px;
    padding-bottom: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: solid 0.1px red;
`;

const StyledText = styled('div')`
    color: red;
`;

export default StyledModal;
export { StyledText };
