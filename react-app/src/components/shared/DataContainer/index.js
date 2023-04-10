import { StyledTitle } from '../../styles.css';
import DataRow from '../DataRow';
import LabelsRow from '../LabelsRow';
import StyledDataContainer from './styles.css';

const DataContainer = ({ labelData, data, title, actions }) => {
    return (
        <StyledDataContainer>
            <StyledTitle>{title}</StyledTitle>
            <LabelsRow data={labelData} hasActions={actions} width={`${100 / labelData.length}%`} />
            {data.map((x) => (
                <DataRow key={x.id} data={x} actions={actions} width={`${100 / labelData.length}%`} />
            ))}
        </StyledDataContainer>
    );
};

export default DataContainer;
