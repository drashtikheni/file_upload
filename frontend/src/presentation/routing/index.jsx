/* eslint-disable no-unused-vars */
import React from 'react'
import { useRoutes } from 'react-router-dom'

import {
  DASHBOARD_URL,
  LOGIN_URL,
  ROOT_URL,
  SIGNUP_URL,
} from '../../constants/pageRoutes.constant'
import AuthRoute from './AuthRoute'
import Login from '../auth/Login'
import ProtectedRoute from './ProtectedRoute'
import Header from '../layout/Header'
import Dashboard from '../dashboard'
import Signup from '../auth/Signup'

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
    {
      path: SIGNUP_URL,
      element: (
        <AuthRoute>
          <Signup />
        </AuthRoute>
      ),
    },
    // { path: '*', element: <PageNotFound /> },
  ])

  return routes
}

export default Routing
