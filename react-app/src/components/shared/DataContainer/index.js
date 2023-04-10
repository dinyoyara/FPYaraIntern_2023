import { StyledTitle } from '../../styles.css';
import DataRow from '../DataRow';
import StyledDataContainer from './styles.css';

const DataContainer = ({ labelData, data, title, dataButtons }) => {
    return (
        <StyledDataContainer>
            <StyledTitle>{title}</StyledTitle>
            <DataRow
                name={labelData.name}
                type={labelData.type}
                size={labelData.size}
                freeSpace={labelData.freeSpace}
                fontWeight='700'
                marginTop='30px'
            />
            {data.map((x) => (
                <DataRow
                    id={x.id}
                    key={x.id}
                    name={x.name}
                    type={x.type}
                    size={x.size}
                    freeSpace={x.freeSpace}
                    dataButtons={dataButtons}
                />
            ))}
        </StyledDataContainer>
    );
};

export default DataContainer;
