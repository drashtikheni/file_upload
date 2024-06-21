import { useEffect } from 'react'
import { DEFAULT_PAGE_SIZE, MEDIA } from '../constants/apiPath.constant'
import useRedux from '../hooks/useRedux.hook'
import {
  getMediaState,
  setIsLoading,
  setMedia,
  setNextPage,
} from '../redux/slices/media.slice'
import { api } from '../utils/api'
import { queryString } from '../utils/querystring'

const mediaContainer = () => {
  const { dispatch, selector } = useRedux()
  const { page, data, isLoading, hasMore } = selector(getMediaState)

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    dispatch(setIsLoading(true))

    const params = {
      page,
      pageSize: DEFAULT_PAGE_SIZE,
    }

    const res = await api({ endpoint: `${MEDIA}/${queryString(params)}` })

    dispatch(setMedia(res?.data))
    dispatch(setIsLoading(false))
  }

  const next = () => dispatch(setNextPage())

  return { data, isLoading, hasMore, next }
}

export default mediaContainer
