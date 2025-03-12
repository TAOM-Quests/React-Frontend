import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuth } from "../../models/userAuth";
import { RootState } from "../store";

interface AuthState {
  value: UserAuth | null
}

const initialState: AuthState = {
  value: null
}

const ADMIN_ROLES = [
  'Администратор'
]

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserAuth>) => {
      state.value = action.payload
    },
    setRole: (state, action: PayloadAction<string>) => {
      if (state.value) {
        state.value.role = action.payload
        state.value.isAdmin = ADMIN_ROLES.includes(action.payload)
      }
    },
  }
})

export const {setUser, setRole} = authSlice.actions
export const selectAuth = (state: RootState) => state.auth.value
export default authSlice.reducer