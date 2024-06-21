import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { memo } from 'react'

import classNames from 'classnames'
import headerContainer from '../../container/header.container'
import { logoutLabel } from '../../description/login.description'
import FUButton from '../../shared/FUButton'
import FUSpin from '../../shared/FUSpin'
import FUTypography from '../../shared/FUTypography'

import { Outlet } from 'react-router-dom'
import './Header.css'

const { Header: AntHeader } = Layout

const Header = ({ children }) => {
  const { data, isLoading, logout } = headerContainer()

  if (isLoading) return <FUSpin />

  return (
    <Layout style={{ height: '100vh' }}>
      <AntHeader className={classNames('header-container')}>
        <div>
          <FUTypography className={classNames('header-username')}>
            {data?.username}
          </FUTypography>
          <FUButton type="link" onClick={logout}>
            {logoutLabel}
          </FUButton>
        </div>
      </AntHeader>
      <Content>
        <Outlet />
        {children}
      </Content>
    </Layout>
  )
}

export default memo(Header)
