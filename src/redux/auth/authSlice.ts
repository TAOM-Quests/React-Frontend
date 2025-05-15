import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserAuth } from '../../models/userAuth'
import { RootState } from '../store'
import { getUserByToken } from './funcs'

interface AuthState {
  value: UserAuth | null
}

const initialState: AuthState = {
  value: await getUserByToken(),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserAuth>) => {
      state.value = action.payload
    },
    logout: state => {
      state.value = null
    },
  },
})

export const { setUser, logout } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth.value
export default authSlice.reducer
