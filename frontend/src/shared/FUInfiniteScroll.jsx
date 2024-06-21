import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { EMPTY_COUNT } from '../constants/index.constant'
import { noMoreDataLabel } from '../description/common.description'
import { gt } from '../utils/javascript'
import FUSpin from './FUSpin'
import FUTypography from './FUTypography'

const FUInfiniteScroll = ({
  hasMore,
  children,
  dataLength = EMPTY_COUNT,
  next,
  scrollableTarget,
  className,
  isLoading,
}) => {
  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={next}
      endMessage={
        gt(dataLength) && <FUTypography>{noMoreDataLabel}</FUTypography>
      }
      hasMore={hasMore}
      scrollableTarget={scrollableTarget}
      className={className}
      loader={isLoading && <FUSpin />}
    >
      {children}
    </InfiniteScroll>
  )
}

export default FUInfiniteScroll
