import React, { memo } from 'react'

import { Typography } from 'antd'

const { Text } = Typography

const FUTypography = ({ children, className }) => {
  return <Text className={className}>{children}</Text>
}

export default memo(FUTypography)
