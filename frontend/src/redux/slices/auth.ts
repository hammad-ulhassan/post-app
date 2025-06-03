import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../store"

const authSlice = createSlice( {
  name: "auth",
  initialState: {
    isAuth: false,
  },
  reducers: {
    setAuth: ( state, { payload } ) => {
      state.isAuth = payload
    },
  },
} )

export const { setAuth } = authSlice.actions
export const authSelector = ( state: RootState ) => state.auth.isAuth
export default authSlice.reducer
