import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { GET, ME } from '../../constants/apiPath.constant'
import { EMPTY_OBJECT } from '../../constants/index.constant'
import { api } from '../../utils/api'

const initialState = {
  data: EMPTY_OBJECT,
  isLoading: false,
}

export const fetchCurrentUser = createAsyncThunk(ME, async () => {
  try {
    const res = await api(GET, ME, true)
    return res
  } catch (error) {
    throw new Error(error.message)
  }
})

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.data = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrentUser.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchCurrentUser.rejected, state => {
        state.isLoading = false
      })
  },
})

export const { setCurrentUser } = auth.actions

export const getAuthState = state => state.auth

export default auth.reducer
