import { Outlet } from "react-router"
import Topbar from "../system/common/top-bar"

const ProtectedLayout = () => {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Topbar />
      <main className="min-h-0 flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export { ProtectedLayout as Component }
