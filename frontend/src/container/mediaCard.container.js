import { useState } from 'react'
import useToast from '../hooks/useToast.hook'
import { downloadFile } from '../utils/javascript'
import { mediaDownloaded, somethingWentWrong } from '../utils/messages'

const mediaCardContainer = ({ media }) => {
  const [selectedMedia, setSelectedMedia] = useState(null)
  const { success, error } = useToast()

  const downloadMedia = async () => {
    const response = await downloadFile(media?.link, media?.name)

    if (response.data) success(mediaDownloaded)
    else error(somethingWentWrong)
  }

  const openDeleteModal = () => setSelectedMedia(media)
  const closeDeleteModal = () => setSelectedMedia(null)

  const onDelete = async onDeleteMedia => {
    await onDeleteMedia(selectedMedia?._id)
    closeDeleteModal()
  }

  return {
    selectedMedia,
    downloadMedia,
    openDeleteModal,
    onDelete,
    closeDeleteModal,
  }
}

export default mediaCardContainer
