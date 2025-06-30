"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductImage {
  url: string
  alt: string
}

interface ProductGalleryProps {
  images: ProductImage[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = React.useState(0)

  const showNext = () => {
    setCurrentImage((current) => (current + 1) % images.length)
  }

  const showPrevious = () => {
    setCurrentImage((current) => (current - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      <Card className="relative aspect-square overflow-hidden rounded-lg">
        <CardContent className="p-0">
          {images.map((image, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                index === currentImage ? "opacity-100" : "opacity-0",
              )}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 hover:bg-background/90"
              onClick={showPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Imagen anterior</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 hover:bg-background/90"
              onClick={showNext}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Imagen siguiente</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg",
              "ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              currentImage === index && "ring-2 ring-primary",
            )}
            onClick={() => setCurrentImage(index)}
          >
            <Image src={image.url || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

