import styled from 'styled-components';
import { headerHeight } from '../../../styles/const';

const StyledWarehouseScreen = styled('div')`
    width: 100vw;
    height: calc(100vh - ${headerHeight});
    padding: 30px;
    display: flex;
    flex-direction: column;
`;

export default StyledWarehouseScreen;
