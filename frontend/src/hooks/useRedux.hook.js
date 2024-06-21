import { useDispatch, useSelector } from 'react-redux'

const useRedux = () => {
  const reduxDispatch = useDispatch()
  const dispatch = params => {
    reduxDispatch(params)
  }
  const selector = params => useSelector(params)

  return { dispatch, selector }
}

export default useRedux
