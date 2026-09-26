import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useGetUser from "@/hooks/user"
import { AUTH_COOKIE } from "@/lib/config"
import { CreditCard, LogOut, Settings, User } from "lucide-react"
import { Cookies } from "react-cookie"
import { Link, useNavigate } from "react-router"

const Topbar = () => {
  const { userInfo } = useGetUser()

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
    <header className="flex w-full flex-row justify-between border-b border-gray-900 bg-background px-2 py-2 md:px-4 md:py-3">
      <div className="flex flex-row items-center gap-2">
        <Link
          className=""
          to={{
            pathname: "/dashboard/workspace",
          }}
        >
          <p>CARDHOUSE</p>
        </Link>
        {/* navigation buttons */}
        {/* <Button variant={"ghost"}>Workspaces</Button> */}
      </div>
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Avatar className="cursor-pointer">
                <AvatarImage />
                <AvatarFallback>
                  {userInfo?.email?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            }
          ></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <CreditCard /> Subscription
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut /> Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Topbar
