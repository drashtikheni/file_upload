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

  return { fileList, beforeUpload, removeFile }
}

export default uploadContainer
