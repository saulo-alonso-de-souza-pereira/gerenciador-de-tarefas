import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useDispatch } from "react-redux";
import { logout, setAuthError} from "./redux/authSlice";
import { LogoutButtonStyle } from "./LoginStyles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';

const LogoutButton = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(logout());
        }catch{
            dispatch(setAuthError("Logout failed"));
        }
    }
    return(
        <LogoutButtonStyle onClick={handleLogout}>
            <FontAwesomeIcon icon={faUserSlash} /> Logout
        </LogoutButtonStyle>
    )
}

export default LogoutButton;