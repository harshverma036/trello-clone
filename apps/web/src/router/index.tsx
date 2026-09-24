import RootError from "@/components/system/common/RootError"
import Spinner from "@/components/system/common/Spinner"
import { createBrowserRouter } from "react-router"
import { notRequireAuth, requrieAuth } from "./middleware"

export const router = createBrowserRouter([
  {
    HydrateFallback: Spinner,
    ErrorBoundary: RootError,
    children: [
      {
        lazy: () => import("@/components/layouts/PublicLayout"),
        children: [
          {
            index: true,
            lazy: () => import("@/pages/home"),
            path: "",
          },
          {
            middleware: [notRequireAuth],
            lazy: () => import("@/pages/auth/login"),
            path: "login",
          },
        ],
      },
      {
        id: "app",
        middleware: [requrieAuth],
        lazy: () => import("@/components/layouts/ProtectedLayout"),
        path: "dashboard",
        children: [
          {
            lazy: () => import("@/pages/workspace/workspace-home"),
            path: "workspace",
          },
        ],
      },
    ],
  },
])
