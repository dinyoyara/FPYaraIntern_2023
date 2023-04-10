import StyledDataRow, { StyledData, StyledAction } from './styles.css';

const DataRow = ({ data, actions, ...styleProps }) => {
    const { id, ...restData } = data;
    return (
        <StyledDataRow {...styleProps}>
            {Object.values(restData).map((x, i) => (
                <StyledData key={i}>{x}</StyledData>
            ))}
            <StyledData>
                {actions
                    ? actions.map((x) => (
                          <StyledAction key={x.name} onClick={() => x.onClick(id)}>
                              {x.name}
                          </StyledAction>
                      ))
                    : 'actions'}
            </StyledData>
        </StyledDataRow>
    );
};
export default DataRow;
