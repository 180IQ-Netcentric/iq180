import { getCookie } from '@/utils/cookie'
import Axios from 'axios'

type UrlType = string | undefined

export const client = Axios.create({
  baseURL:
    (import.meta.env.VITE_APP_API_URL as UrlType) ||
    'http://localhost:4000/api',
})
client.interceptors.request.use(
  (req) => {
    if (req.headers && !req.headers.Authorization) {
      const token = getCookie('token')
      // to be checked
      // req.headers.Authorization = `Bearer ${token}`
      req.headers = {
        ...req.headers,
        'x-access-token': token ?? '',
      }
      return req
    } else return req
  },
  (error) => Promise.reject(error)
)
