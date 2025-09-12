import React from "react";
import { auth } from "./firebaseConfig";
import { sendEmailVerification } from "firebase/auth";
import toast from 'react-hot-toast';

export const UnverifiedMessage = () => {
    const handleResend = async () => {
        try {
            await sendEmailVerification(auth.currentUser);
            toast.success("Email de verificação reenviado!");
        } catch (error) {
            console.error("Erro ao reenviar email de verificação:", error);
            toast.error("Erro ao reenviar email de verificação: " + error.message);
        }
    };

    return (
        <div>
            <p>Por favor, verifique seu email para confirmar sua conta.</p>
            <button onClick={handleResend}>Reenviar Email de Verificação</button>
        </div>
    );
};

export default UnverifiedMessage;