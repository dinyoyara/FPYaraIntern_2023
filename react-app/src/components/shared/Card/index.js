import { StyledLink, StyledError } from '../../styles.css';
import DataContainer from '../DataContainer';
import StyledCard, { StyledCardElement, StyledValue, StyledLinkContainer } from './styles.css';

const Card = ({ data, width, addImport, addExport, viewMovements }) => {
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
                    <StyledCardElement>
                        name: <StyledValue>{data.name}</StyledValue>
                    </StyledCardElement>
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
                        <StyledLink onClick={() => addExport(data.id, data.type, data.products)}>add export</StyledLink>
                        <StyledLink onClick={() => addImport(data.id, data.type, data.freeSpace)}>
                            add import
                        </StyledLink>
                        <StyledLink onClick={() => viewMovements(data.id)}>view movements</StyledLink>
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
