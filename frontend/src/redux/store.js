import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authSlice from './slices/auth.slice'
import { LOGOUT } from '../constants/index.constant'
import { equal } from '../utils/javascript'

const appReducer = combineReducers({
  auth: authSlice,
})

const reducerProxy = (state, action) => {
  if (equal(action.type, LOGOUT)) {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

export const store = configureStore({
  reducer: reducerProxy,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
