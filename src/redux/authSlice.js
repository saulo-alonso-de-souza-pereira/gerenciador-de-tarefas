import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userRole: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthStatus: (state, action) => {
            state.user = action.payload.user;
            state.userRole = action.payload.userRole;
            state.isLoading = false;
        },
        logout: (state) => {
            state.user = null;
            state.userRole = null;
            state.isLoading = false;
        },
        setAuthError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setLoading: (state) => {
            state.isLoading = true;
        }
    }
});

export const { setAuthStatus, logout, setAuthError, setLoading } = authSlice.actions;
export default authSlice.reducer;
