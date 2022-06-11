import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../../redux'
import { getLoading } from '../../actions/loading'

const getBaseUrl = () => {
  const ENV = process.env.NODE_ENV
  console.log(ENV)
  if (ENV === 'development') {
    return 'http://192.168.99.103:3000'
  } else if (ENV === 'production') {
    return 'http://192.168.99.103:5000'
  }
}
const ajax = axios.create({
  baseURL: getBaseUrl(),
  timeout: 5000
})
ajax.interceptors.request.use(config => {
  NProgress.start()
  store.dispatch(getLoading(true))
  return config
})
ajax.interceptors.response.use(
  response => {
    NProgress.done()
    store.dispatch(getLoading(false))
    return response
  },
  err => {
    store.dispatch(getLoading(false))
    return Promise.reject(err)
  }
)

export default ajax
