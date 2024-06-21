import axios from 'axios'

import { GET } from '../constants/apiPath.constant'
import { REACT_APP_API_URL, TOKEN } from '../constants/index.constant'
import { env } from './javascript'
import { loadStateFn } from './localStorage'

export const api = async ({
  method = GET,
  endpoint,
  isToken = true,
  body,
  cancelToken,
}) => {
  try {
    const baseURL = env(REACT_APP_API_URL)

    const config = {
      url: `${baseURL}/${endpoint}`,
      method,
      headers: {},
      data: body,
      cancelToken,
    }
    if (isToken) config.headers.authorization = 'Bearer ' + loadStateFn(TOKEN)

    const res = await axios(config)

    return res
  } catch (err) {
    return {
      err: err.response?.data?.err,
      statusCode: err.response?.status,
    }
  }
}
