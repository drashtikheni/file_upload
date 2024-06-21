import React from 'react'
import { Navigate } from 'react-router-dom'

import { TOKEN } from '../../constants/index.constant'
import { AUTH_ROUTES, DASHBOARD_URL } from '../../constants/pageRoutes.constant'
import useLocation from '../../hooks/useLocation.hook'
import { checkIncludes } from '../../utils/javascript'
import { loadStateFn } from '../../utils/localStorage'

const AuthRoute = ({ children }) => {
  const { currentPath } = useLocation()

  return checkIncludes(currentPath, AUTH_ROUTES) && loadStateFn(TOKEN) ? (
    <Navigate to={DASHBOARD_URL} replace={true} />
  ) : (
    children
  )
}

export default AuthRoute
