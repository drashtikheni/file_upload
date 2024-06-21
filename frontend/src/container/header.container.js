import { useEffect } from 'react'
import { LOGOUT } from '../constants/index.constant'
import { LOGIN_URL } from '../constants/pageRoutes.constant'
import useLocation from '../hooks/useLocation.hook'
import useRedux from '../hooks/useRedux.hook'
import { fetchCurrentUser, getAuthState } from '../redux/slices/auth.slice'
import { clearStateFn } from '../utils/localStorage'

const headerContainer = () => {
  const { dispatch, selector } = useRedux()
  const { navigate } = useLocation()
  const { data, isLoading } = selector(getAuthState)

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [])

  const logout = () => {
    clearStateFn()
    dispatch({ type: LOGOUT })
    navigate(LOGIN_URL)
  }

  return { data, isLoading, logout }
}

export default headerContainer
