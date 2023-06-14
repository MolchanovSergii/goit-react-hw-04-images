import { OverlayStyled, ModalStyled } from './Modal.Styled';
import PropTypes from 'prop-types';

const Modal = ({ imgURL, alt, closeModal, onKeyDown }) => {
  return (
    <OverlayStyled onClick={closeModal} onKeyDown={onKeyDown} tabIndex={0}>
      <ModalStyled>
        <img src={imgURL} alt={alt} />
      </ModalStyled>
    </OverlayStyled>
  );
};

export default Modal;

Modal.propTypes = {
  imgURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};
