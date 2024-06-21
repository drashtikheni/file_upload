import { useEffect, useState } from 'react'
import {
  DEFAULT_PAGE_NO,
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
import {
  checkIncludes,
  equal,
  gt,
  head,
  length,
  uniqueArray,
} from '../utils/javascript'
import { mediaRemoved, somethingWentWrong } from '../utils/messages'
import { queryString } from '../utils/querystring'

const mediaContainer = () => {
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedMedias, setSelectedMedias] = useState([])
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

  const removeMedia = async ids => {
    setDeleting(true)

    const res = await api({ method: DELETE, endpoint: MEDIA, body: { ids } })

    setDeleting(false)

    if (equal(res?.status, HTTP_STATUSES.OK)) {
      setSelectedMedias(medias =>
        medias.filter(media => !checkIncludes(media, ids)),
      )
      success(mediaRemoved)
      closeDeleteModal()

      const remainingMedias = length(data) - length(ids)

      dispatch(filterMedia(ids))

      const newPageNumber = gt(length(remainingMedias))
        ? remainingMedias / DEFAULT_PAGE_SIZE
        : DEFAULT_PAGE_NO

      fetchMedia(newPageNumber)
    } else error(res?.err || somethingWentWrong)
  }

  const onSelectionChange = (id, { target: { checked: selected } }) => {
    if (selected) setSelectedMedias(medias => uniqueArray([...medias, id]))
    else setSelectedMedias(medias => medias.filter(media => !equal(id, media)))
  }

  const onSelectAllChange = ({ target: { checked: selected } }) => {
    setSelectedMedias(() => (selected ? data?.map(media => media?._id) : []))
  }

  const openDeleteModal = () => setShowDeleteModal(true)
  const closeDeleteModal = () => setShowDeleteModal(false)

  return {
    data,
    isLoading,
    deleting,
    hasMore,
    uploading,
    selectedMedias,
    showDeleteModal,
    next,
    uploadMedia,
    removeMedia,
    onSelectionChange,
    onSelectAllChange,
    openDeleteModal,
    closeDeleteModal,
  }
}

export default mediaContainer
