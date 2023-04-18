import styled from 'styled-components';

const StyledGreeting = styled('div')`
    padding-top: 30px;
    width: 100%;
    font-size: 40px;
    text-align: center;
`;

const StyledAuthForm = styled('div')`
    height: ${(p) => p.height};
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    alight-item: center;
`;

export { StyledGreeting, StyledAuthForm };
