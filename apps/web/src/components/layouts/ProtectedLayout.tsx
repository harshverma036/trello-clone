import { Outlet, useNavigate } from "react-router"
import { Button } from "../ui/button"
import { Cookies } from "react-cookie"
import { AUTH_COOKIE } from "@/lib/config"

const ProtectedLayout = () => {
  const navigate = useNavigate()

  const cookie = new Cookies()

  const logout = () => {
    cookie.remove(AUTH_COOKIE.TOKEN, {
      path: "/",
    })
    cookie.remove(AUTH_COOKIE.USER_INFO, {
      path: "/",
    })
    // redirect to login
    navigate("/login", {
      replace: true,
    })
  }

  return (
    <div>
      <Button variant={"destructive"} type="button" onClick={logout}>
        Logout
      </Button>
      <Outlet />
    </div>
  )
}

export { ProtectedLayout as Component }
