import StyledDataRow, { StyledData, StyledAction } from './styles.css';

const DataRow = ({ data, actions, width }) => {
    const { id, ...restData } = data;
    return (
        <StyledDataRow>
            {Object.values(restData).map((x, i) => (
                <StyledData key={x + i} width={width}>
                    {x}
                </StyledData>
            ))}
            {actions ? (
                <StyledData width={width}>
                    {actions.map((x, i) => (
                        <StyledAction key={x.name + i} onClick={() => x.onClick(id)}>
                            {x.name}
                        </StyledAction>
                    ))}
                </StyledData>
            ) : null}
        </StyledDataRow>
    );
};
export default DataRow;
