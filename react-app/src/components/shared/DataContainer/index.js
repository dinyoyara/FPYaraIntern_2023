import { StyledTitle } from '../../styles.css';
import DataRow from '../DataRow';
import StyledDataContainer from './styles.css';

const DataContainer = ({ labelData, data, title, actions }) => {
    return (
        <StyledDataContainer>
            <StyledTitle>{title}</StyledTitle>
            <DataRow data={labelData} fontWeight='700' marginTop='30px' />
            {data.map((x) => (
                <DataRow key={x.id} data={x} actions={actions} />
            ))}
        </StyledDataContainer>
    );
};

export default DataContainer;
