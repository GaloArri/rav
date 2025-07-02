"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ArtistCarouselProps {
  images: string[]
  artistName: string
}

export default function ArtistCarousel({ images, artistName }: ArtistCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000) // Cambia cada 3 segundos

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl group shadow-lg">
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            currentImage === index ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`${artistName} - Imagen ${index + 1}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ))}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                currentImage === index ? "bg-white w-4" : "bg-white/60 hover:bg-white/80",
              )}
              onClick={() => setCurrentImage(index)}
              aria-label={`Ver imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
