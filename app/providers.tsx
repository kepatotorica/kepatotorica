"use client"

import * as React from "react"
import { NextUIProvider } from "@nextui-org/system"
import { useRouter } from "next/navigation"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { useEffect } from "react"

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter()

  useEffect(() => {
    // Extract the hash fragment from the current URL
    let url = window.location.href
    console.log(url)
    if (url.includes("/_#")) {
      url = url.replace("/_#", "")//Strip pocketbase oddities

      const authSplit = url.split("auth")
      // Match /auth/:action/:token and redirect
      if (authSplit.length > 1) {
        const pathSegements = authSplit[1].split('/')
        if (pathSegements.length > 2) {
          const newPath = `/account?action=${pathSegements[1]}&token=${pathSegements[2]}`
          router.push(newPath)
        }
      }
    }


  }, [router])


  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  )
}
