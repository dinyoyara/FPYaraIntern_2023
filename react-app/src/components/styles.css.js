import styled from 'styled-components';

const StyledTitle = styled('div')`
    width: 100%;
    font-size: 20px;
    text-align: center;
`;

const StyledError = styled('div')`
    width: 100%;
    font-size: 14px;
    text-align: center;
    color: red;
`;

const StyledLink = styled('div')`
    width: 100%;
    font-size: 14px;
    text-align: center;
    color: blue;
    cursor: pointer;
`;

const StyledFieldContainer = styled('div')`
    margin: 8px 0;
    height: ${(p) => p.height};
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 1rem;
`;

export { StyledTitle, StyledError, StyledLink, StyledFieldContainer };
