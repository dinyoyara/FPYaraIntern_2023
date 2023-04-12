import { StyledLink } from '../../styles.css';
import StyledModal, { StyledText } from './styles.css';

const Modal = ({ show, text, toggle }) => {
    return (
        <>
            {show ? (
                <StyledModal>
                    <StyledText>{text}</StyledText>
                    <StyledLink onClick={toggle}>close</StyledLink>
                </StyledModal>
            ) : null}
        </>
    );
};

export default Modal;
