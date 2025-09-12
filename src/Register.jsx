import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { LoginContainer, Title, LoginForm, Input, Button, CenterContainer } from "./LoginStyles";
import toast from 'react-hot-toast';

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: displayName,
            });
            toast.success('Cadastro realizado com sucesso!');
            navigate("/");
        } catch (error) {
            console.error("Error registering user:", error.message);
            toast.error("Erro ao realizar cadastro: " + error.message);
        }
    };

    return (
        <CenterContainer>
            <LoginContainer>
                <Title>Cadastro</Title>
                    <LoginForm onSubmit={handleRegister}>
                        <Input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Seu nome" required />
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />
                    <Button type="submit">Cadastrar</Button>
                    <p>Já possui uma conta? <a href="/">Faça login</a></p>
                </LoginForm>
            </LoginContainer>
        </CenterContainer>
    );
};

export default Register;
