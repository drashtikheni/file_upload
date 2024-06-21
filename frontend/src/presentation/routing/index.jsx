/* eslint-disable no-unused-vars */
import React, { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

import {
  DASHBOARD_URL,
  LOGIN_URL,
  ROOT_URL,
} from '../../constants/pageRoutes.constant'

const Header = lazy(() => import('../layout/Header'))
const ProtectedRoute = lazy(() => import('../routing/ProtectedRoute'))
const Dashboard = lazy(() => import('../dashboard'))
const Login = lazy(() => import('../auth/Login'))
const AuthRoute = lazy(() => import('../routing/AuthRoute'))

const Routing = () => {
  const routes = useRoutes([
    {
      path: ROOT_URL,
      element: (
        <ProtectedRoute>
          <Header />
        </ProtectedRoute>
      ),
      children: [
        {
          path: DASHBOARD_URL,
          element: <Dashboard />,
        },
      ],
    },
    {
      path: LOGIN_URL,
      element: (
        <AuthRoute>
          <Login />
        </AuthRoute>
      ),
    },
    // { path: '*', element: <PageNotFound /> },
  ])

  return routes
}

export default Routing
