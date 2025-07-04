import Header from "../components/Header"
import Footer from "../components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wrench, Clock, Shield, CheckCircle } from "lucide-react"

const repairServices = [
  {
    icon: Wrench,
    title: "Reparación Profesional",
    description: "Servicio técnico especializado para todo tipo de equipos de audio profesional.",
  },
  {
    icon: Clock,
    title: "Diagnóstico Rápido",
    description: "Evaluación detallada de su equipo en 24-48 horas.",
  },
  {
    icon: Shield,
    title: "Garantía de Servicio",
    description: "Todos nuestros trabajos cuentan con garantía de 3 meses.",
  },
  {
    icon: CheckCircle,
    title: "Repuestos Originales",
    description: "Utilizamos únicamente repuestos originales y de alta calidad.",
  },
]

export default function RepairsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl font-bold mb-6">Servicio Técnico Especializado</h1>
              <p className="text-lg text-muted-foreground">
                Contamos con técnicos certificados y años de experiencia en la reparación de equipos de audio
                profesional.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {repairServices.map((service, index) => (
                <Card key={index}>
                  <CardHeader>
                    <service.icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
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

