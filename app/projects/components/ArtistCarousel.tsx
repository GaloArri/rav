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

  const normalizeImages = (imgs: string | string[]): string[] => {
    if (!imgs) return []
    if (typeof imgs === "string") return [imgs]
    if (Array.isArray(imgs)) return imgs
    return []
  }

  const validImages = normalizeImages(images)

  useEffect(() => {
    if (validImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % validImages.length)
      }, 4000) // Cambia cada 4 segundos

    return () => clearInterval(interval)
  }, [validImages.length])


  if (validImages.length === 0) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No hay imágenes disponibles</p>
      </div>
    )
  }
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
      {validImages.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-in-out",
            currentImage === index ? "opacity-100 scale-100" : "opacity-0 scale-105",
          )}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`${artistName} - Imagen ${index + 1}`}
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      ))}

    </div>
  )
}
