import styled from 'styled-components';

import { headerHeight } from '../../styles/const';

const StyledScreen = styled('div')`
    width: 100vw;
    height: calc(100vh - ${headerHeight});
    box-sizing: border-box;
    padding: 50px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    position: relative;
`;

const StyledDataPart = styled('div')`
    width: ${(p) => p.width};
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export { StyledDataPart, StyledScreen };
