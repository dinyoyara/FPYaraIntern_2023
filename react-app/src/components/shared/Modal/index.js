import { StyledLink } from '../../styles.css';
import StyledModal from './styles.css';

const Modal = ({ show, text, toggle }) => {
    return (
        <>
            {show ? (
                <StyledModal>
                    <div>{text}</div>
                    <StyledLink onClick={toggle}>close</StyledLink>
                </StyledModal>
            ) : null}
        </>
    );
};

export default Modal;
