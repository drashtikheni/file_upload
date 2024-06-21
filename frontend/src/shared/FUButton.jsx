import { Button } from 'antd'
import React, { memo } from 'react'

const FUButton = ({
  type,
  htmlType,
  disabled,
  loading,
  children,
  onClick,
  icon,
  danger,
  className,
}) => {
  return (
    <Button
      {...{
        type,
        className,
        htmlType,
        disabled,
        loading,
        onClick,
        icon,
        danger,
      }}
    >
      {children}
    </Button>
  )
}

export default memo(FUButton)
