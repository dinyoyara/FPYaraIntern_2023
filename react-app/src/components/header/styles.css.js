import styled from 'styled-components';
import { headerHeight } from '../../styles/const';

const StyledHeader = styled('div')`
    height: ${headerHeight};
    background: rgba(192, 192, 192, 0.2);
    display: flex;
    align-items: center;
`;

export default StyledHeader;
