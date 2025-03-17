import { combineReducers, configureStore } from "@reduxjs/toolkit"
import  authReducer from './auth/authSlice'

const rootReducer = combineReducers({
  auth: authReducer
})
export const setupStore = (preloadedState?: Partial<RootState>) => configureStore({
  reducer: rootReducer,
  preloadedState
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']