import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { GoogleOAuthProvider } from "@react-oauth/google"

import "./index.css"
// import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { RouterProvider } from "react-router"
import { router } from "./router/index.tsx"
import { CookiesProvider } from "react-cookie"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
        <CookiesProvider>
          <RouterProvider router={router} />
        </CookiesProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </StrictMode>
)
