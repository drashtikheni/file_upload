import React from 'react'
import { Navigate } from 'react-router-dom'

import { TOKEN } from '../../constants/index.constant'
import { LOGIN_URL } from '../../constants/pageRoutes.constant'
import { loadStateFn } from '../../utils/localStorage'

const ProtectedRoute = ({ children }) =>
  loadStateFn(TOKEN) ? children : <Navigate to={LOGIN_URL} replace={true} />

export default ProtectedRoute
