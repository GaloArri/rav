import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const developments = [
  {
    id: 1,
    name: "Sistema de Control Inteligente",
    image: "/placeholder.svg?height=300&width=300",
    description: "Desarrollo de sistema automatizado para control de audio en tiempo real",
    category: "Software",
    year: "2023",
  },
  {
    id: 2,
    name: "Amplificador Modular",
    image: "/placeholder.svg?height=300&width=300",
    description: "Diseño y construcción de amplificador modular de alta potencia",
    category: "Hardware",
    year: "2023",
  },
  {
    id: 3,
    name: "App de Monitoreo",
    image: "/placeholder.svg?height=300&width=300",
    description: "Aplicación móvil para monitoreo remoto de equipos de audio",
    category: "Mobile",
    year: "2022",
  },
  {
    id: 4,
    name: "Procesador Digital",
    image: "/placeholder.svg?height=300&width=300",
    description: "Procesador de señal digital con algoritmos propios de optimización",
    category: "Hardware",
    year: "2022",
  },
]

export default function OurDevelopments() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {developments.map((development) => (
        <Card
          key={development.id}
          className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm"
        >
          <CardContent className="p-0 relative">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={development.image || "/placeholder.svg"}
                alt={development.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

              {/* Badge de categoría */}
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="text-xs">
                  {development.category}
                </Badge>
              </div>

              {/* Año en la esquina inferior */}
              <div className="absolute bottom-3 left-3">
                <Badge variant="outline" className="text-xs bg-white/90 text-black">
                  {development.year}
                </Badge>
              </div>
            </div>
          </CardContent>

          <div className="p-4">
            <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors">
              {development.name}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{development.description}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
