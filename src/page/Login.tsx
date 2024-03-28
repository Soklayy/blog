import { useEffect } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { axiosInstance } from "../api/axios.instance"
import { useAppDispatch } from "../redux/hook"
import { login } from "../redux/feature/Auth/auth.slide"
const Login = () => {
  const location = useLocation()
  const [param] = useSearchParams(location.search)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    axiosInstance.get('auth/profile', {
      headers: {
        Authorization: `Bearer ${param.get('token')}`,
      }
    }).then((res) => {
      dispatch(login({
        accessToken: param.get('token') || '',
        user: res.data
      }))
      navigate('/')
    }).catch(() => {
      navigate('/')
    })
  }, [])

  return (
    <div className="bg-gray-900 h-full w-screen flex items-center justify-center">
      <AiOutlineLoading3Quarters className="text-green-500 text-8xl animate-spin" />
    </div>
  )
}

export default Login