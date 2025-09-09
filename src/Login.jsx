import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser} from "./firebaseConfig";
import { setAuthError } from "./redux/authSlice";
import { LoginContainer, Title, LoginForm, Input, Button, CenterContainer } from "./LoginStyles";

export const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
        } catch (error) {
            dispatch(setAuthError(error.message));
        }
    };

    return (
        <CenterContainer>
                <LoginContainer>
                    <Title>Login</Title>
                    <LoginForm onSubmit={handleLogin}>
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button type="submit">Entrar</Button><br />
                        <Button type="button" onClick={() => navigate('/register')}>Cadastrar</Button>
                </LoginForm>
            </LoginContainer>
        </CenterContainer>
    );
}