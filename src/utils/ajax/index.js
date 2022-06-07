import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../../redux'
import { getLoading } from '../../actions/loading'
const ajax = axios.create({
  baseURL: 'http://localhost:3000',
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
