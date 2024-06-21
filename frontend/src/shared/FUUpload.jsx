import { UploadOutlined } from '@ant-design/icons'
import React, { memo } from 'react'

import { Upload } from 'antd'
import uploadContainer from '../container/upload.container'
import {
  pickFileLabel,
  uploadingStatus,
} from '../description/media.description'
import { areEqualProps, gt, length } from '../utils/javascript'
import FUButton from './FUButton'

const FUUpload = ({ onUpload, uploading }) => {
  const { removeFile, beforeUpload, fileList, uploadMedia } = uploadContainer()

  return (
    <>
      <Upload
        accept=".jpg,.jpeg,.png"
        fileList={fileList}
        onRemove={removeFile}
        beforeUpload={beforeUpload}
      >
        <FUButton icon={<UploadOutlined />}>{pickFileLabel}</FUButton>
      </Upload>
      <FUButton
        type="primary"
        onClick={() => uploadMedia(onUpload)}
        disabled={!gt(length(fileList))}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? uploadingStatus.uploading : uploadingStatus.startUpload}
      </FUButton>
    </>
  )
}

export default memo(FUUpload, areEqualProps)
