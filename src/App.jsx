import React, {useEffect} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebaseConfig";
import { setAuthStatus, setAuthError, setLoading } from "./redux/authSlice";
import { GlobalModalStyle } from "./ModalStyles";

import {Login} from "./Login";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import Register from "./Register";
import UnverifiedMessage from "./UnverifiedMessage";
import Header from "./Header";

export const App = () => {
    
    const dispatch = useDispatch();
    const { user, userRole, isLoading } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(setLoading());
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) { 
            await currentUser.reload();
            try {
              const idTokenResult = await currentUser.getIdTokenResult();
              const isAdmin = !!idTokenResult.claims.isAdmin;
              const serializeUser = {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName,
              };
              dispatch(setAuthStatus({ user: serializeUser, userRole: isAdmin ? 'admin' : 'user' }));
            } catch (error) {
              console.error("Erro ao obter o token do usuário:", error);
              dispatch(setAuthError("Erro ao obter o token do usuário"));
            }
          } else {
            dispatch(setAuthStatus({ user: null, userRole: null }));
          }
        });
        return () => unsubscribe();
    }, [dispatch]);

    if (isLoading) {
      return <div>Carregando...</div>;
    }

    return (
      <Router>
        <GlobalModalStyle />
        <Header /> 
        <div style={{ marginTop: '-21px' }}> </div>
        <Routes>
          <Route path="/" element={!user ? <Login  /> : <Navigate to={userRole === 'admin' ? '/admin' : '/user'} />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to={userRole === 'admin' ? '/admin' : '/user'} />} />
          <Route
            path="/admin"
            element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
          />
              <Route
                path="/user"
                element={userRole === 'user' ? <UserDashboard /> : <Navigate to="/" />}
              />
          <Route 
              path="/unverified" 
              element={userRole === "unverified" ? <UnverifiedMessage /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }
