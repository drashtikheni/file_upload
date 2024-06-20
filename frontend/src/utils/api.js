import axios from 'axios'

import { env } from './javascript'
import { loadStateFn } from './localStorage'
import {
  EMPTY_OBJECT,
  REACT_APP_API_URL,
  TOKEN,
} from '../constants/index.constant'

export const api = async (method, endpoint, isToken, body, cancelToken) => {
  try {
    const baseURL = env(REACT_APP_API_URL)

    const config = {
      url: `${baseURL}/${endpoint}`,
      method,
      headers: EMPTY_OBJECT,
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
