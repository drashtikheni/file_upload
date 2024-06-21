import React from 'react'

import classNames from 'classnames'

const AuthLayout = ({ children }) => {
  return <div className={classNames('auth-container')}>{children}</div>
}

export default AuthLayout
