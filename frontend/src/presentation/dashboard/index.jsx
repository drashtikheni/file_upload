import { Row } from 'antd'
import classNames from 'classnames'
import React from 'react'
import { SCROLL_DIV_ID } from '../../constants/media.constant'
import mediaContainer from '../../container/media.container'
import FUEmpty from '../../shared/FUEmpty'
import FUInfiniteScroll from '../../shared/FUInfiniteScroll'
import FUUpload from '../../shared/FUUpload'
import { gt, length } from '../../utils/javascript'
import MediaCard from './MediaCard'

const Dashboard = () => {
  const {
    data,
    isLoading,
    hasMore,
    uploading,
    deleting,
    uploadMedia,
    removeMedia,
    next,
  } = mediaContainer()

  return (
    <div>
      <div className={classNames('upload-media-container')}>
        <FUUpload uploading={uploading} onUpload={uploadMedia} />
      </div>

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
