"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Simplificar: solo esperar un tiempo fijo y completar
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        onComplete()
      }, 500)
    }, 2000) // 2 segundos total

    return () => clearTimeout(timer)
  }, [onComplete])

  const currentTheme = mounted ? (theme === "system" ? systemTheme : theme) : "dark"

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500",
        currentTheme === "dark"
          ? "bg-gradient-to-br from-[#1a1a1a] to-[#222222]"
          : "bg-gradient-to-br from-[#f7f7f7] to-white",
        isVisible ? "opacity-100" : "opacity-0",
      )}
    >
      {/* Logo simple */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <Image
            src="/assets/logorav1.png"
            alt="Logo RAV"
            width={180}
            height={180}
            className={cn(
              "transition-all duration-500 object-contain",
              currentTheme === "dark" ? "invert-0" : "invert",
            )}
            priority
          />
        </div>
      </div>
    </div>
  )
}
