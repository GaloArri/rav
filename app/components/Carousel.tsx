"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import carouselData from "../data/carousel.json"

export default function Carousel() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const { items } = carouselData

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
    <div className="w-full bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 py-12 md:py-24 items-center">
          {/* Text Content */}
          <div className="relative h-[250px] md:h-[300px] order-2 md:order-1">
            {items.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 w-full transition-opacity duration-500 ease-in-out",
                  current === index ? "opacity-100 z-10" : "opacity-0 z-0",
                )}
              >
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{item.title}</h2>
                  <p className="text-muted-foreground text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Image Carousel */}
          <div className="relative aspect-[16/9] w-full order-1 md:order-2">
            {items.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out rounded-lg overflow-hidden",
                  current === index ? "opacity-100 z-10" : "opacity-0 z-0",
                )}
              >
                <Image src={item.image || "/placeholder.svg"} alt={item.alt} fill priority className="object-cover" />
              </div>
            ))}

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full h-10 w-10"
              onClick={prev}
              disabled={isAnimating}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous slide</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full h-10 w-10"
              onClick={next}
              disabled={isAnimating}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-2 pb-12">
          {items.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                current === index ? "bg-primary w-4" : "bg-primary/30",
              )}
              onClick={() => {
                if (isAnimating) return
                setIsAnimating(true)
                setCurrent(index)
                setTimeout(() => setIsAnimating(false), 500)
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

