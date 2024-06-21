import { useNavigate, useLocation as useReactLocation } from 'react-router-dom'

const useLocation = () => {
  const location = useReactLocation()
  const navigate = useNavigate()

  return { location, currentPath: location?.pathname, navigate }
}

export default useLocation
