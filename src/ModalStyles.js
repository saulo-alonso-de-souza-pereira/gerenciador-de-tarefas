import styled, { createGlobalStyle } from 'styled-components';
import Modal from 'react-modal';

export const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background: #fff !important;;
  color: #054375;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  outline: none;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #054375;
  border: none;
  border-radius: 4px;
  font-size: 1.5rem;
  cursor: pointer;
  color: #fff;

   &:hover {
    background-color: #007bff;
  }
`;

export const GlobalModalStyle = createGlobalStyle`
  .ReactModal__Overlay {
     background-color: rgba(5, 67, 117, 0.8) !important;
  }
`;