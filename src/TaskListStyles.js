import styled from 'styled-components';

export const TaskListContainer = styled.div`
  /* Mantenha o estilo do container principal */
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  width: 100%;
  max-width: 900px;
  margin: 2rem auto;
`;

export const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
`;

export const TaskCard = styled.div`
  position: relative;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardGradientBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 8px; /* Largura do gradiente lateral */
  background-image: linear-gradient(to bottom, #d0d000, #e30693);
`;

export const CardContent = styled.div`
  padding-left: 1rem; /* Espaço para o gradiente lateral */
`;

export const TaskTitle = styled.h4`
  font-size: 1.25rem;
  color: #333;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
`;

export const TaskText = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TaskActions = styled.div`
  display: flex;
  justify-content: flex-end; /* Alinha os botões à direita */
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #666;
  transition: color 0.2s ease;

  &:hover {
    color: #000;
  }
`;
