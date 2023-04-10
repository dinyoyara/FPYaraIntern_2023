import { StyledTitle } from '../../styles.css';
import DataRow from '../DataRow';
import LabelsRow from '../LabelsRow';
import StyledDataContainer from './styles.css';

const DataContainer = ({ labelData, data, title, actions }) => {
    return (
        <StyledDataContainer>
            <StyledTitle>{title}</StyledTitle>
            <LabelsRow data={labelData} hasActions={actions} />
            {data.map((x) => (
                <DataRow key={x.id} data={x} actions={actions} />
            ))}
        </StyledDataContainer>
    );
};

export default DataContainer;
