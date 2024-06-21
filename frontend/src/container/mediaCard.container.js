import useToast from '../hooks/useToast.hook'
import { downloadFile } from '../utils/javascript'
import { mediaDownloaded, somethingWentWrong } from '../utils/messages'

const mediaCardContainer = ({ media }) => {
  const { success, error } = useToast()

  const downloadMedia = async () => {
    const response = await downloadFile(media?.link, media?.name)

    if (response.data) success(mediaDownloaded)
    else error(somethingWentWrong)
  }
  return { downloadMedia }
}

export default mediaCardContainer
