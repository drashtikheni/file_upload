import { useEffect, useState } from 'react'
import {
  DEFAULT_PAGE_SIZE,
  DELETE,
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
  filterMedia,
  getMediaState,
  setIsLoading,
  setMedia,
  setNextPage,
} from '../redux/slices/media.slice'
import { api } from '../utils/api'
import { equal, head } from '../utils/javascript'
import { mediaRemoved, somethingWentWrong } from '../utils/messages'
import { queryString } from '../utils/querystring'

const mediaContainer = () => {
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { dispatch, selector } = useRedux()
  const { success, error } = useToast()
  const { page, data, isLoading, hasMore } = selector(getMediaState)
  const { data: currentUser } = selector(getAuthState)

  useEffect(() => {
    fetchMedia()
  }, [page])

  const fetchMedia = async pageNo => {
    dispatch(setIsLoading(true))

    const params = {
      page: pageNo || page,
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

  const removeMedia = async id => {
    setDeleting(true)

    const res = await api({ method: DELETE, endpoint: `${MEDIA}/${id}` })

    setDeleting(false)

    if (equal(res?.status, HTTP_STATUSES.OK)) {
      success(mediaRemoved)
      dispatch(filterMedia(id))
      fetchMedia(page)
    } else error(res?.err || somethingWentWrong)
  }

  return {
    data,
    isLoading,
    deleting,
    hasMore,
    uploading,
    next,
    uploadMedia,
    removeMedia,
  }
}

export default mediaContainer
