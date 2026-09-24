import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { GoogleOAuthProvider } from "@react-oauth/google"

import "./index.css"
// import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { RouterProvider } from "react-router"
import { router } from "./router/index.tsx"
import { CookiesProvider } from "react-cookie"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
          <CookiesProvider>
            <RouterProvider router={router} />
            <Toaster
              position="top-right"
              // containerStyle={{
              //   borderRadius: "10px",
              //   background: "#333",
              //   color: "#fff",
              // }}
            />
          </CookiesProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
