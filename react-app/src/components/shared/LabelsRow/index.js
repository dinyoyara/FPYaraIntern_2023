import StyledLabelsRow, { StyledLabel } from './styles.css';

const LabelsRow = ({ data, hasActions, ...styleProps }) => {
    return (
        <StyledLabelsRow {...styleProps}>
            {data.map((x, i) => (
                <StyledLabel key={i}>{x}</StyledLabel>
            ))}
            {hasActions ? <StyledLabel>action</StyledLabel> : null}
        </StyledLabelsRow>
    );
};
export default LabelsRow;
