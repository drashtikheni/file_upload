import { useState } from 'react'
import { LOGIN_URL } from '../constants/pageRoutes.constant'
import useLocation from '../hooks/useLocation.hook'
import useToast from '../hooks/useToast.hook'
import { equal } from '../utils/javascript'
import { HTTP_STATUSES, POST, SIGNUP } from '../constants/apiPath.constant'
import { api } from '../utils/api'
import { invalidCredentials } from '../utils/messages'

const signupContainer = () => {
  const { navigate } = useLocation()
  const { error, success } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const signup = async values => {
    setIsLoading(true)
    const res = await api({
      method: POST,
      endpoint: SIGNUP,
      body: values,
      isProtectedEndpoint: false,
    })

    setIsLoading(false)

    if (equal(res?.status, HTTP_STATUSES.CREATED)) {
      success()
      gotoLogin()
    } else if (equal(res?.statusCode, HTTP_STATUSES.BAD_REQUEST))
      error(invalidCredentials)
    else error(res?.err)
  }

  const gotoLogin = () => navigate(LOGIN_URL)

  return { isLoading, signup, gotoLogin }
}

export default signupContainer
