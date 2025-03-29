import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuth } from "../../models/userAuth";
import { RootState } from "../store";
import { api } from "../../services/api/api";
import { userModule } from "../../services/api/userModule/userModule";
import { users } from "../../services/api/userModule/users/users";

interface AuthState {
  value: UserAuth | null
}

const initialState: AuthState = {
  value: localStorage.getItem('token') 
    ? await users.auth(localStorage.getItem('token') as string)
    : null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserAuth>) => {
      state.value = action.payload
    },
    setRole: (state, action: PayloadAction<Pick<UserAuth, 'roleId' | 'isAdmin'>>) => {
      if (state.value) {
        state.value = {...state.value, ...action.payload}
      }
    },
  }
})

export const {setUser, setRole} = authSlice.actions
export const selectAuth = (state: RootState) => state.auth.value
export default authSlice.reducer