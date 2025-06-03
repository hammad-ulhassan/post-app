import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth"
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore( {
    reducer: {
        auth: authReducer
    }
} );

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

setupListeners( store.dispatch )
