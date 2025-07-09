import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Sistema de Sonido Profesional",
    price: 2999.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Sistema completo para eventos grandes",
  },
  {
    id: 2,
    name: "Consola Digital",
    price: 1599.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Mezcladora digital de 32 canales",
  },
  {
    id: 3,
    name: "Micrófonos Inalámbricos",
    price: 899.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Set de micrófonos profesionales",
  },
  {
    id: 4,
    name: "Monitores de Estudio",
    price: 1299.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Par de monitores de alta fidelidad",
  },
]

export default function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm"
        >
          <CardContent className="p-0 relative">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start p-4">
            <div className="w-full mb-3">
              <h3 className="font-semibold text-base md:text-lg mb-1 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
              <div className="flex justify-between items-center w-full">
                <p className="text-base md:text-lg font-semibold">${product.price.toFixed(2)}</p>
              </div>
            </div>
            <Button size="sm" asChild className="w-full">
              <Link href={`/products/${product.id}`}>Ver Detalles</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
