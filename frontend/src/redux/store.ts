import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postApi, userApi } from "../services/baseQuery";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat( ...[ userApi.middleware, postApi.middleware ] ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
