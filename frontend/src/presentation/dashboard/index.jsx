import { DeleteOutlined } from '@ant-design/icons'
import { Checkbox, Modal, Row } from 'antd'
import classNames from 'classnames'
import React from 'react'
import { SCROLL_DIV_ID } from '../../constants/media.constant'
import mediaContainer from '../../container/media.container'
import {
  confirmationTitle,
  deleteConfirmation,
} from '../../description/media.description'
import FUEmpty from '../../shared/FUEmpty'
import FUInfiniteScroll from '../../shared/FUInfiniteScroll'
import FUUpload from '../../shared/FUUpload'
import { checkIncludes, equal, gt, length } from '../../utils/javascript'
import MediaCard from './MediaCard'

const Dashboard = () => {
  const {
    showDeleteModal,
    data,
    isLoading,
    hasMore,
    uploading,
    deleting,
    selectedMedias,
    uploadMedia,
    removeMedia,
    next,
    onSelectionChange,
    onSelectAllChange,
    openDeleteModal,
    closeDeleteModal,
  } = mediaContainer()

  return (
    <div>
      <div className={classNames('upload-media-container')}>
        {gt(length(selectedMedias)) && (
          <DeleteOutlined onClick={openDeleteModal} />
        )}

        <FUUpload uploading={uploading} onUpload={uploadMedia} />
      </div>

      {showDeleteModal && (
        <Modal
          title={confirmationTitle}
          open={true}
          onOk={() => removeMedia(selectedMedias)}
          confirmLoading={deleting}
          onCancel={closeDeleteModal}
        >
          <p>{deleteConfirmation}</p>
        </Modal>
      )}

      <Checkbox
        checked={
          equal(length(data), length(selectedMedias)) &&
          gt(length(selectedMedias))
        }
        onChange={onSelectAllChange}
      />

      {!gt(length(data)) && !isLoading ? (
        <FUEmpty />
      ) : (
        <div className={classNames('media-cards-container')}>
          <FUInfiniteScroll
            scrollableTarget={SCROLL_DIV_ID}
            next={next}
            hasMore={hasMore}
            className={classNames('media-cards-container')}
            dataLength={length(data)}
            isLoading={isLoading}
          >
            <Row className={classNames('card-grid')}>
              {data?.map(media => (
                <div key={media?._id} className={classNames('card-container')}>
                  <Checkbox
                    checked={checkIncludes(media?._id, selectedMedias)}
                    onChange={selected =>
                      onSelectionChange(media?._id, selected)
                    }
                  />
                  <MediaCard
                    media={media}
                    deleting={deleting}
                    removeMedia={removeMedia}
                  />
                </div>
              ))}
            </Row>
          </FUInfiniteScroll>
        </div>
      )}
    </div>
  )
}

export default Dashboard
