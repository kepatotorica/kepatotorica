"use client"

import * as React from "react"
import { NextUIProvider } from "@nextui-org/system"
import { useRouter } from "next/navigation"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter()

  React.useEffect(() => {
    // Extract the hash fragment from the current URL
    let url = window.location.href
    if (url.includes("/_#")) {
      router.push(url.replace("/_#", ""))//Strip pocketbase oddities
    }
  }, [router])


  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  )
}
