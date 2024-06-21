import { useState } from 'react'

const uploadContainer = () => {
  const [fileList, setFileList] = useState([])

  const removeFile = file => {
    const index = fileList.indexOf(file)
    const newFileList = fileList.slice()
    newFileList.splice(index, 1)
    setFileList(newFileList)
  }

  const beforeUpload = file => {
    setFileList([file])
    return false
  }

  const uploadMedia = async onUpload => {
    await onUpload(fileList)
    setFileList([])
  }

  return { fileList, beforeUpload, removeFile, uploadMedia }
}

export default uploadContainer
