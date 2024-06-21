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
}) => {
  return (
    <Button {...{ type, htmlType, disabled, loading, onClick, icon }}>
      {children}
    </Button>
  )
}

export default memo(FUButton)
