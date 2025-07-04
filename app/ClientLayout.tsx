"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import SplashScreen from "./components/SplashScreen"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showSplash, setShowSplash] = useState(true)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Verificar si ya visitó en esta sesión
    const hasVisited = sessionStorage.getItem("hasVisited")
    if (hasVisited) {
      setShowSplash(false)
    }
    setIsReady(true)
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
    sessionStorage.setItem("hasVisited", "true")
  }

  // Mostrar loading básico mientras se inicializa
  if (!isReady) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="en" suppressHydrationWarning className="!scroll-smooth">
      <body className={cn("min-h-screen bg-background font-sans antialiased overflow-x-hidden", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
          <div className={cn("min-h-screen", showSplash ? "hidden" : "block")}>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
