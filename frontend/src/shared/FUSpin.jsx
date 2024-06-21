import React, { memo } from 'react'
import { areEqualProps } from '../utils/javascript'
import { Spin } from 'antd'

const FUSpin = () => {
  return (
    <Spin
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

export default memo(FUSpin, areEqualProps)
