import styled from 'styled-components';
import { LoginContainer } from './LoginStyles'; 

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  min-height: 100vh;
  align-items: center;
`;

export const TaskListContainer = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin-top: 2rem;
`;

export const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;

  &:last-child {
    border-bottom: none;
  }
`;

export const TaskDetails = styled.div`
  flex-grow: 1;
`;

export const ActionButton = styled.button`
  background-color: #dc3545; 
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    background-color: #c82333;
  }
`;

export const EditButton = styled(ActionButton)`
  background-color: #ffc107; /* Cor para o botão de edição */
  &:hover {
    background-color: #e0a800;
  }
`;