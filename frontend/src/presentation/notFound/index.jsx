import React from 'react'

import { Result } from 'antd'
import { Button } from 'antd/lib'
import { DASHBOARD_URL } from '../../constants/pageRoutes.constant'
import { notFound } from '../../description/notFound.description'
import useLocation from '../../hooks/useLocation.hook'
import ProtectedRoute from '../routing/ProtectedRoute'

const NotFound = () => {
  const { navigate } = useLocation()

  return (
    <ProtectedRoute>
      <Result
        status={notFound.status}
        title={notFound.title}
        subTitle={notFound.subTitle}
        extra={
          <Button type="primary" onClick={() => navigate(DASHBOARD_URL)}>
            {notFound.btnLabel}
          </Button>
        }
      />
    </ProtectedRoute>
  )
}

export default NotFound
