import { Button } from 'antd'
import React, { memo } from 'react'

import { areEqualProps } from '../utils/javascript'

const FUButton = ({ type, htmlType, disabled, loading, children }) => {
  return <Button {...{ type, htmlType, disabled, loading }}>{children}</Button>
}

export default memo(FUButton, areEqualProps)
