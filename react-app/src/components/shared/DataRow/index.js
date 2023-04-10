import StyledDataRow, { StyledData, StyledAction } from './styles.css';

const DataRow = ({ id, name, type, size, freeSpace, dataButtons, ...styleProps }) => {
    return (
        <StyledDataRow {...styleProps}>
            <StyledData>{name}</StyledData>
            <StyledData>{type}</StyledData>
            <StyledData>{size}</StyledData>
            <StyledData>{freeSpace}</StyledData>
            <StyledData>
                {dataButtons
                    ? dataButtons.map((x) => (
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
