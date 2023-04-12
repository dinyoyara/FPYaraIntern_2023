import { StyledLink, StyledError, StyledTitle } from '../../styles.css';
import DataContainer from '../DataContainer';
import StyledCard, { StyledCardElement, StyledValue, StyledLinkContainer } from './styles.css';

const Card = ({ data, width, addImport, addExport, hideMovements, showMovements, hideDetails, isMovementsShowed }) => {
    const getDataLabels = () => {
        const { id, ...props } = data.products[0];
        return Object.keys(props);
    };

    const getProductsData = () => {
        return data.products.map((x) => {
            const { id, ...restProduct } = x;
            return restProduct;
        });
    };
    return (
        <>
            {data ? (
                <StyledCard width={width}>
                    {/* <StyledCardElement>
                        name: <StyledValue>{data.name}</StyledValue>
                    </StyledCardElement> */}
                    <StyledTitle>{data.name}</StyledTitle>
                    <StyledCardElement>
                        type: <StyledValue>{data.type}</StyledValue>
                    </StyledCardElement>
                    <StyledCardElement>
                        size: <StyledValue>{data.size}</StyledValue>
                    </StyledCardElement>
                    <StyledCardElement>
                        free space: <StyledValue>{data.freeSpace}</StyledValue>
                    </StyledCardElement>
                    <StyledCardElement>
                        products: {data.products.length > 0 ? null : <StyledValue>n/a</StyledValue>}
                    </StyledCardElement>
                    {data.products.length > 0 ? (
                        <DataContainer labelData={getDataLabels()} data={getProductsData()} />
                    ) : null}
                    <StyledLinkContainer>
                        <StyledLink onClick={() => addExport(data.name, data.type, data.products)}>
                            add export
                        </StyledLink>
                        <StyledLink onClick={() => addImport(data.name, data.type, data.freeSpace)}>
                            add import
                        </StyledLink>
                        {isMovementsShowed ? (
                            <StyledLink onClick={hideMovements}>hide movements</StyledLink>
                        ) : (
                            <StyledLink onClick={() => showMovements(data.id)}>view movements</StyledLink>
                        )}
                        <StyledLink onClick={hideDetails}>hide details</StyledLink>
                    </StyledLinkContainer>
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
