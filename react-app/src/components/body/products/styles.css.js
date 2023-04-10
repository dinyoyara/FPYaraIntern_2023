import styled from 'styled-components';

import { headerHeight } from '../../../styles/const';

const StyledProductsScreen = styled('div')`
    width: 100vw;
    height: calc(100vh - ${headerHeight});
    box-sizing: border-box;
    padding: 30px;
    display: flex;
    justify-content: space-between;
`;

export default StyledProductsScreen;
