import styled from 'styled-components';
export const LoginContainer = styled.div`
  padding: 2rem;
  background-color: #fff; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
`;

export const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; 
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #054375;
  margin-bottom: 1.5rem;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #8cd133;
    box-shadow: 0 0 5px rgba(140, 209, 51, 0.25);
  }
`;

export const Button = styled.button`
  padding: 0.75rem;
  background-image: linear-gradient(to right, #00d084 0%, #0693e3 100%); 
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
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2); 
  }

  &:active {
    transform: translateY(1px); 
  }
`;

export const LogoutButtonStyle = styled.button`
  margin-left: 1rem;
  padding: 0.75rem;
  background-color:  #054375;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007bff;
  }
`;