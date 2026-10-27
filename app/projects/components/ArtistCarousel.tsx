"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useIdioma } from "@/lib/idioma"
import { useCarruselAutomatico } from "@/lib/movimiento"

interface ArtistCarouselProps {
  images: string[]
  artistName: string
  onImageClick?: (currentIndex: number) => void
}

export default function ArtistCarousel({ images, artistName, onImageClick }: ArtistCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const { t } = useIdioma()

  const normalizeImages = (imgs: string | string[]): string[] => {
    if (!imgs) return []
    if (typeof imgs === "string") return [imgs]
    if (Array.isArray(imgs)) return imgs
    return []
  }

  const validImages = normalizeImages(images)

  const pausa = useCarruselAutomatico(
    () => setCurrentImage((prev) => (prev + 1) % validImages.length),
    4000,
    validImages.length > 1
  )


  if (validImages.length === 0) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">{t("sinImagenes")}</p>
      </div>
    )
  }
  return (
    <div
      className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl transition-shadow duration-500 group-hover:shadow-2xl"
      {...pausa}
    >
      {validImages.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-[opacity,transform] duration-1000 ease-in-out",
            currentImage === index ? "opacity-100 scale-100" : "opacity-0 scale-105",
          )}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`${artistName} — ${t("imagen")} ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => onImageClick?.(currentImage)}
          />
        </div>
      ))}

    </div>
  )
}
