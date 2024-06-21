import { Empty } from 'antd'
import React, { memo } from 'react'
import { areEqualProps } from '../utils/javascript'

const FUEmpty = () => {
  return <Empty description={false} />
}

export default memo(FUEmpty, areEqualProps)
