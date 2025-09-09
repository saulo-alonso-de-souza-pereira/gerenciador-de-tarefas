import React from 'react';
import Modal from 'react-modal';
import { StyledModal, CloseButton } from './ModalStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Custom Modal"
      ariaHideApp={false}
    >
      <CloseButton onClick={onRequestClose}><FontAwesomeIcon icon={faXmark} /></CloseButton>
      {children}
    </StyledModal>
  );
};

export default CustomModal;