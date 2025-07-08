import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const miembrosEquipo = [
  {
    nombre: "Juan Ravasi",
    cargo: "Fundador & Director General",
    imagen: "/images/about/jua.jpg",
    bio: "Con más de 10 años de experiencia en ingeniería de sistemas y tecnología de sonido, Juan es el responsable de la visión estratégica y el desarrollo de nuevas soluciones innovadoras para la industria del audio y el playback.",
  },
  {
    nombre: "Julián Rodríguez",
    cargo: "Jefe de Desarrollo de Producto",
    imagen: "/images/about/jul.jpg",
    bio: "Julián lidera el diseño y la implementación de sistemas avanzados de reproducción y control de audio. Su enfoque se centra en la eficiencia operativa y en ofrecer soluciones personalizadas para cada cliente.",
  },
]

export default function SeccionEquipo() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Conoce a Nuestro Equipo</h2>
          <p className="text-lg text-muted-foreground">
            Un equipo de expertos dedicados a ofrecer soluciones de reproducción de audio de alta calidad y tecnología avanzada.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {miembrosEquipo.map((miembro, index) => (
            <Card key={index} className="bg-muted/30 border-none">
              <CardContent className="p-6">
                <div className="aspect-square relative rounded-full overflow-hidden w-48 h-48 mx-auto mb-6">
              <Image
                src={miembro.imagen || "/placeholder.svg"}
                alt={miembro.nombre}
                fill
                sizes="(max-width: 768px) 100vw, 192px"
                className="object-cover"
                priority
              />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{miembro.nombre}</h3>
                  <p className="text-primary font-medium mb-4">{miembro.cargo}</p>
                  <p className="text-muted-foreground">{miembro.bio}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}