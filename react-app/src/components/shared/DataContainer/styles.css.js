import styled from 'styled-components';

const StyledDataContainer = styled('div')`
    width: 100%;
    height: ${(p) => p.height};
`;

const StyledRowContainer = styled('div')`
    height: ${(p) => p.rowContainerHeight};
    overflow-y: auto;
`;
export default StyledDataContainer;
export { StyledRowContainer };
