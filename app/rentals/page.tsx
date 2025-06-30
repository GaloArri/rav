import Header from "../components/Header"
import Footer from "../components/Footer"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Package, Clock, Shield } from "lucide-react"

const rentalEquipment = [
  {
    name: "Sistema de Sonido Completo",
    description: "Sistema profesional para eventos medianos y grandes",
    image: "/placeholder.jpg?height=300&width=400",
  },
  {
    name: "Micrófonos Profesionales",
    description: "Set de micrófonos de alta calidad",
    image: "/placeholder.jpg?height=300&width=400",
  },
  {
    name: "Consola Digital",
    description: "Mezcladora digital profesional",
    image: "/placeholder.jpg?height=300&width=400",
  },
  {
    name: "Monitores de Escenario",
    description: "Par de monitores profesionales",
    image: "/placeholder.jpg?height=300&width=400",
  },
]

const features = [
  {
    icon: Calendar,
    title: "Reserva Flexible",
    description: "Sistema de reservas adaptable a sus necesidades",
  },
  {
    icon: Package,
    title: "Equipo Completo",
    description: "Todo lo necesario para su evento",
  },
  {
    icon: Clock,
    title: "Soporte 24/7",
    description: "Asistencia técnica disponible en todo momento",
  },
  {
    icon: Shield,
    title: "Garantía Total",
    description: "Equipos asegurados y en perfecto estado",
  },
]

export default function RentalsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl font-bold mb-6">Alquiler de Equipos</h1>
              <p className="text-lg text-muted-foreground">
                Ofrecemos una amplia gama de equipos de audio profesional para todo tipo de eventos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="flex flex-col h-full">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {rentalEquipment.map((equipment, index) => (
                <Card key={index} className="overflow-hidden flex flex-col h-full">
                  <div className="relative h-48">
                    <Image
                      src={equipment.image || "/placeholder.svg"}
                      alt={equipment.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{equipment.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow">
                    <div className="flex flex-col h-full">
                      <p className="text-muted-foreground mb-4 line-clamp-2">{equipment.description}</p>
                      <div className="mt-auto flex justify-between items-center">
                        <Button>Consultar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}