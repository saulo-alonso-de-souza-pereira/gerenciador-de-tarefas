import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import logger from "redux-logger";

const middleware = [];


if (import.meta.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

