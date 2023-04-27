import StyledLabelsRow, { StyledLabel } from './styles.css';

const LabelsRow = ({ data, hasActions, width }) => {
    return (
        <StyledLabelsRow>
            {data.map((x, i) => (
                <StyledLabel key={x} width={width}>
                    {x}
                </StyledLabel>
            ))}
            {hasActions ? <StyledLabel width={width}>action</StyledLabel> : null}
        </StyledLabelsRow>
    );
};
export default LabelsRow;
