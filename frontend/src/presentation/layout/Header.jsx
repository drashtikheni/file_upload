import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React from 'react'

import classNames from 'classnames'
import headerContainer from '../../container/header.container'
import { logoutLabel } from '../../description/login.description'
import FUButton from '../../shared/FUButton'
import FUSpin from '../../shared/FUSpin'
import FUTypography from '../../shared/FUTypography'

import './Header.css'

const { Header: AntHeader } = Layout

const Header = () => {
  const { data, isLoading, logout } = headerContainer()

  if (isLoading) return <FUSpin />

  return (
    <Layout>
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
        <div
          style={{
            padding: 24,
            height: '100%',
          }}
        >
          Content
        </div>
      </Content>
    </Layout>
  )
}

export default Header
