import { entries, equal } from './javascript'
import { EMPTY_VALUE } from '../constants/index.constant'

export const queryString = params => {
  let tempParams = EMPTY_VALUE

  entries(params).forEach(([key, value]) => {
    tempParams += value
      ? `${equal(tempParams, EMPTY_VALUE) ? '?' : '&'}${key}=${value}`
      : EMPTY_VALUE
  })

  return tempParams
}
