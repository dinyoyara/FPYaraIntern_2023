import { StyledLink, StyledTitle, StyledError } from '../../styles.css';
import DataContainer from '../DataContainer';
import StyledCard from './styles.css';

const Card = ({ data, width }) => {
    return (
        <>
            {data ? (
                <StyledCard width={width}>
                    <StyledTitle>name: {data.name}</StyledTitle>
                    <StyledTitle>type: {data.type}</StyledTitle>
                    <StyledTitle>size: {data.size}</StyledTitle>
                    <StyledTitle>free space: {data.freeSpace}</StyledTitle>
                    {data.products.length > 0 ? <DataContainer /> : <StyledError>No products</StyledError>}
                    <StyledLink>view movements</StyledLink>
                </StyledCard>
            ) : (
                <StyledError>Loading...</StyledError>
            )}
        </>
    );
};

export default Card;

// {data.products.map((pr) => (
//     <div key={pr.id}>
//         {pr.name} - pr:{pr.price} - c:{pr.count} - s:{pr.size}
//     </div>
// ))}
