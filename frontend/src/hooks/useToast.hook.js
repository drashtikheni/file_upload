import toast from 'react-hot-toast'

const useToast = () => {
  const error = toast.error
  const success = toast.success

  return { error, success }
}

export default useToast
