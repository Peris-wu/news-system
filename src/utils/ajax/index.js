import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const ajax = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})
ajax.interceptors.request.use(config => {
  NProgress.start()
  return config
})
ajax.interceptors.response.use(
  response => {
    NProgress.done()
    return response
  },
  err => {
    return Promise.reject(err)
  }
)

export default ajax
