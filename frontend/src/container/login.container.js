import { useState } from 'react'

import { HTTP_STATUSES, LOGIN, POST } from '../constants/apiPath.constant'
import { TOKEN } from '../constants/index.constant'
import { DASHBOARD_URL, SIGNUP_URL } from '../constants/pageRoutes.constant'
import useLocation from '../hooks/useLocation.hook'
import useRedux from '../hooks/useRedux.hook'
import { setCurrentUser } from '../redux/slices/auth.slice'
import { api } from '../utils/api'
import { equal } from '../utils/javascript'
import { saveStateFn } from '../utils/localStorage'
import useToast from '../hooks/useToast.hook'
import { invalidCredentials } from '../utils/messages'

const loginContainer = () => {
  const { dispatch } = useRedux()
  const { navigate } = useLocation()
  const { error } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const login = async values => {
    setIsLoading(true)
    const res = await api({
      method: POST,
      endpoint: LOGIN,
      body: values,
      isProtectedEndpoint: false,
    })

    setIsLoading(false)

    if (equal(res?.status, HTTP_STATUSES.OK)) {
      saveStateFn(TOKEN, res?.data?.token)
      dispatch(setCurrentUser(res?.data))
      navigate(DASHBOARD_URL)
    } else if (equal(res?.statusCode, HTTP_STATUSES.BAD_REQUEST))
      error(invalidCredentials)
    else error(res?.err)
  }

  const goToSignup = () => navigate(SIGNUP_URL)

  return { isLoading, login, goToSignup }
}

export default loginContainer
