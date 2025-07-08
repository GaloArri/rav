"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import carouselData from "../data/carousel.json"

export default function Carousel() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, systemTheme } = useTheme()
  const { items } = carouselData

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = mounted ? (theme === "system" ? systemTheme : theme) : "dark"

  const next = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((current + 1) % items.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [current, isAnimating, items.length])

  const prev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((current - 1 + items.length) % items.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [current, isAnimating, items.length])

  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 6000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="relative py-8 md:py-12 rounded-lg overflow-hidden">
          {/* Background Images */}
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out",
                current === index ? "opacity-100 z-10" : "opacity-0 z-0",
              )}
            >
              <Image 
                src={item.image || "/placeholder.svg"} 
                alt={item.alt} 
                fill 
                priority 
                className="object-cover rounded-lg" 
              />
              {/* Adaptive gradient overlay based on theme */}
              {currentTheme === "dark" ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 rounded-lg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 rounded-lg" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/40 to-white/20 rounded-lg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-white/30 rounded-lg" />
                </>
              )}
              
              {/* Side fade effects - adaptive to theme */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-r via-transparent rounded-lg",
                currentTheme === "dark" 
                  ? "from-background to-background opacity-30" 
                  : "from-background to-background opacity-50"
              )} />
              <div className={cn(
                "absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r to-transparent rounded-l-lg",
                currentTheme === "dark" ? "from-background" : "from-background"
              )} />
              <div className={cn(
                "absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l to-transparent rounded-r-lg",
                currentTheme === "dark" ? "from-background" : "from-background"
              )} />
            </div>
          ))}

          {/* Centered Content */}
          <div className="relative z-20 flex items-center justify-center min-h-[300px] md:min-h-[350px] px-6">
            <div className="max-w-3xl text-center">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 w-full transition-opacity duration-500 ease-in-out flex items-center justify-center",
                    current === index ? "opacity-100 z-10" : "opacity-0 z-0",
                  )}
                >
                  <div className="space-y-4 px-4">
                    <h2 className={cn(
                      "text-2xl md:text-4xl font-bold mb-3 tracking-tight drop-shadow-lg",
                      currentTheme === "dark" ? "text-white" : "text-gray-900"
                    )}>
                      {item.title}
                    </h2>
                    <p className={cn(
                      "text-base md:text-lg leading-relaxed max-w-2xl mx-auto drop-shadow-md",
                      currentTheme === "dark" ? "text-white/95" : "text-gray-800"
                    )}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 z-30 rounded-full h-10 w-10 backdrop-blur-sm",
              currentTheme === "dark" 
                ? "bg-black/30 hover:bg-black/50 text-white border-white/20" 
                : "bg-white/70 hover:bg-white/90 text-gray-900 border-gray-200"
            )}
            onClick={prev}
            disabled={isAnimating}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous slide</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 z-30 rounded-full h-10 w-10 backdrop-blur-sm",
              currentTheme === "dark" 
                ? "bg-black/30 hover:bg-black/50 text-white border-white/20" 
                : "bg-white/70 hover:bg-white/90 text-gray-900 border-gray-200"
            )}
            onClick={next}
            disabled={isAnimating}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

