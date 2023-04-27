import { StyledTitle } from '../../styles.css';
import DataRow from '../DataRow';
import LabelsRow from '../LabelsRow';
import StyledDataContainer, { StyledRowContainer } from './styles.css';

const DataContainer = ({ labelData, data, title, actions, rowContainerHeight, ...styledProps }) => {
    return (
        <StyledDataContainer {...styledProps}>
            <StyledTitle>{title}</StyledTitle>
            <LabelsRow data={labelData} hasActions={actions} width={`${100 / labelData.length}%`} />
            <StyledRowContainer rowContainerHeight={rowContainerHeight}>
                {data.map((x) => (
                    <DataRow key={x.id} data={x} actions={actions} width={`${100 / labelData.length}%`} />
                ))}
            </StyledRowContainer>
        </StyledDataContainer>
    );
};

export default DataContainer;
