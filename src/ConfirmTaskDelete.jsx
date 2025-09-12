import React from "react";
import styled from 'styled-components';

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const ButtonDeleteConfirm = styled.button`
  padding: 0.75rem;
  background-image: linear-gradient(to right, #e30693 0%, #e30600 100%); 
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-size: 200% auto; 

  &:hover {
    background-position: right center;
    box-shadow: 0 4px 8px rgba(209, 51, 143, 0.25); 
  }

  &:active {
    transform: translateY(1px); 
  }
`;

const ButtonCancelDelete = styled.button`
  padding: 0.75rem;
  background-image: linear-gradient(to right, #666 0%, #333 100%); 
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-size: 200% auto; 

  &:hover {
    background-position: right center;
    box-shadow: 0 4px 8px rgba(209, 143, 51, 0.25); 
  }

  &:active {
    transform: translateY(1px); 
  }
`;


const ConfirmTaskDelete = ({ onConfirm, onCancel }) => {
    return (
        <div>
            <p>Tem certeza que deseja deletar esta tarefa?</p>
            <ButtonGroup>
                <ButtonDeleteConfirm onClick={onConfirm}>Sim</ButtonDeleteConfirm>
                <ButtonCancelDelete onClick={onCancel}>Não</ButtonCancelDelete>
            </ButtonGroup>
        </div>
    );
}

export default ConfirmTaskDelete;