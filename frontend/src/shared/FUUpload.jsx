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
import classNames from 'classnames'

import '../presentation/dashboard/Dashboard.css'

const FUUpload = ({ onUpload, uploading }) => {
  const { removeFile, beforeUpload, fileList, uploadMedia } = uploadContainer()

  return (
    <div className={classNames('uploaded-file-container')}>
      <Upload
        accept=".jpg,.jpeg,.png"
        fileList={fileList}
        onRemove={removeFile}
        beforeUpload={beforeUpload}
        className={classNames('uploaded-file')}
      >
        <FUButton icon={<UploadOutlined />}>{pickFileLabel}</FUButton>
      </Upload>
      <FUButton
        type="primary"
        onClick={() => uploadMedia(onUpload)}
        disabled={!gt(length(fileList))}
        loading={uploading}
        className={classNames('upload-button')}
      >
        {uploading ? uploadingStatus.uploading : uploadingStatus.startUpload}
      </FUButton>
    </div>
  )
}

export default memo(FUUpload, areEqualProps)
