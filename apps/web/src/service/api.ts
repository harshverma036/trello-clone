import { AUTH_COOKIE } from "@/lib/config"
import axios, { type AxiosInstance } from "axios"
import { Cookies } from "react-cookie"

const cookies = new Cookies()

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_HOST || "http://localhost:6900",
  timeout: 10 * 1000,
})

api.interceptors.request.use((config) => {
  const token = cookies.get(AUTH_COOKIE.TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


export default api;