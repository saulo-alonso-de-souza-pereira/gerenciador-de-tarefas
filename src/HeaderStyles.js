import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  background-color: #fff;
  color: #054375;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: fixed; /* Fixa a barra no topo */
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

export const UserInfo = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;