import { Card, Row } from 'antd'
import classNames from 'classnames'
import React from 'react'
import { SCROLL_DIV_ID } from '../../constants/media.constant'
import mediaContainer from '../../container/media.container'
import FUEmpty from '../../shared/FUEmpty'
import FUInfiniteScroll from '../../shared/FUInfiniteScroll'
import { fileSize, gt, length } from '../../utils/javascript'

const { Meta } = Card

const Dashboard = () => {
  const { data, isLoading, hasMore, next } = mediaContainer()

  return (
    <div>
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
                  <Card
                    style={{
                      width: 240,
                      height: 250,
                    }}
                    hoverable
                    cover={
                      <img
                        alt={media?.name}
                        src={media?.link}
                        className={classNames('card-cover')}
                      />
                    }
                  >
                    <Meta
                      title={media?.name}
                      description={fileSize(media?.size)}
                    />
                  </Card>
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
