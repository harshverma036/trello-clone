import { AUTH_COOKIE } from "@/lib/config"
import { Cookies } from "react-cookie"
import { redirect, type MiddlewareFunction } from "react-router"

export const requrieAuth: MiddlewareFunction = () => {
  const cookies = new Cookies()

  const token = cookies.get(AUTH_COOKIE.TOKEN)
  const user = cookies.get(AUTH_COOKIE.USER_INFO)

  if (!token || !user) {
    throw redirect("/login")
  }
}
