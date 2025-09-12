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
  color: #750543;
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
  background-image: linear-gradient(to right, #666 0%, #333 100%); 
  border: none;
  border-radius: 4px;
  font-size: 1.5rem;
  cursor: pointer;
  color: #fff;

  &:hover {
    background-position: right center;
    box-shadow: 0 4px 8px rgba(209, 143, 51, 0.25); 
  }

  &:active {
    transform: translateY(1px); 
  }
`;

export const GlobalModalStyle = createGlobalStyle`
  .ReactModal__Overlay {
     background-color: rgba(117, 5, 67, 0.75) !important;
  }
`;