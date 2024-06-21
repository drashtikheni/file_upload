import { useEffect, useState } from 'react'
import {
  DEFAULT_PAGE_SIZE,
  HTTP_STATUSES,
  MEDIA,
  POST,
} from '../constants/apiPath.constant'
import { mediaUploaded } from '../description/media.description'
import useRedux from '../hooks/useRedux.hook'
import useToast from '../hooks/useToast.hook'
import { getAuthState } from '../redux/slices/auth.slice'
import {
  addMedia,
  getMediaState,
  setIsLoading,
  setMedia,
  setNextPage,
} from '../redux/slices/media.slice'
import { api } from '../utils/api'
import { equal, head } from '../utils/javascript'
import { queryString } from '../utils/querystring'

const mediaContainer = () => {
  const [uploading, setUploading] = useState(false)
  const { dispatch, selector } = useRedux()
  const { success, error } = useToast()
  const { page, data, isLoading, hasMore } = selector(getMediaState)
  const { data: currentUser } = selector(getAuthState)

  useEffect(() => {
    fetchMedia()
  }, [page])

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

  const uploadMedia = async files => {
    const formData = new FormData()
    formData.append('media', head(files))

    setUploading(true)
    const res = await api({ endpoint: MEDIA, body: formData, method: POST })
    setUploading(false)

    if (equal(res?.status, HTTP_STATUSES.CREATED)) {
      success(mediaUploaded)
      dispatch(addMedia({ ...res.data?.media, createdBy: currentUser }))
    } else error(res?.err)
  }

  return { data, isLoading, hasMore, uploading, next, uploadMedia }
}

export default mediaContainer
