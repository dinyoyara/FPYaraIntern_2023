import styled from 'styled-components';

const StyledNavElement = styled('div')`
    margin-left: ${(p) => p.marginLeft};
    margin-right: ${(p) => p.marginRight};
    cursor: pointer;
`;

export default StyledNavElement;
