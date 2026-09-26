import { AUTH_COOKIE } from "@/lib/config"
import type { JwtTokenSchema } from "@repo/schema/auth"
import { useEffect, useState } from "react"
import { Cookies } from "react-cookie"

const useGetUser = () => {
  const cookies = new Cookies()

  const [token, setToken] = useState<string | null>()
  const [userInfo, setUserInfo] = useState<JwtTokenSchema>()

  useEffect(() => {
    ;(() => {
      const get_user_token = cookies.get(AUTH_COOKIE.TOKEN)
      const get_user_info = cookies.get(AUTH_COOKIE.USER_INFO)

      if (get_user_token) {
        setToken(get_user_token)
      }

      if (get_user_info) {
        setUserInfo(get_user_info)
      }
    })()
  }, [])

  return {
    token,
    userInfo,
  }
}

export default useGetUser
