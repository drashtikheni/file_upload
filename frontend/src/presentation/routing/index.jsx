/* eslint-disable no-unused-vars */
import React from 'react'
import { useRoutes } from 'react-router-dom'

import {
  DASHBOARD_URL,
  LOGIN_URL,
  ROOT_URL,
  SIGNUP_URL,
} from '../../constants/pageRoutes.constant'
import Login from '../auth/Login'
import Signup from '../auth/Signup'
import Dashboard from '../dashboard'
import Header from '../layout/Header'
import NotFound from '../notFound'
import AuthRoute from './AuthRoute'
import ProtectedRoute from './ProtectedRoute'

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
    { path: '*', element: <NotFound /> },
  ])

  return routes
}

export default Routing
