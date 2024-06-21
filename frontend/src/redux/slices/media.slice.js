import { createSlice, current } from '@reduxjs/toolkit'

import {
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
} from '../../constants/apiPath.constant'
import { EMPTY_ARRAY } from '../../constants/index.constant'
import {
  gt,
  gte,
  length,
  next,
  removeUniqueArray,
} from '../../utils/javascript'

const initialState = {
  data: EMPTY_ARRAY,
  hasMore: true,
  isLoading: false,
  page: DEFAULT_PAGE_NO,
}

const media = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setNextPage: state => {
      const currentState = current(state)
      state.page = next(currentState.page || DEFAULT_PAGE_NO)
    },
    setMedia: (state, action) => {
      const currentState = current(state)

      state.hasMore = gte(
        length(action.payload?.results || EMPTY_ARRAY),
        DEFAULT_PAGE_SIZE,
      )

      state.data = gt(currentState?.page, DEFAULT_PAGE_NO)
        ? removeUniqueArray([
            ...(currentState?.results || EMPTY_ARRAY),
            ...(action?.payload?.results || EMPTY_ARRAY),
          ])
        : action.payload?.results || EMPTY_ARRAY
    },
    addMedia: (state, action) => {
      const currentState = current(state)
      state.data = [action.payload, ...(currentState.data || EMPTY_ARRAY)]
    },
  },
})

export const { setIsLoading, setNextPage, setMedia, addMedia } = media.actions

export const getMediaState = state => state.media

export default media.reducer
