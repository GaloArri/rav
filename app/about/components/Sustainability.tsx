import { Leaf, Recycle, Heart } from "lucide-react"

const compromisos = [
  {
    icon: Leaf,
    title: "Materiales Sostenibles",
    description: "Utilizamos materiales reciclados, ecológicos y de origen responsable en nuestros productos y soluciones.",
  },
  {
    icon: Recycle,
    title: "Economía Circular",
    description: "Diseñamos sistemas y equipos con un enfoque en la durabilidad y reciclaje, promoviendo una economía circular en la industria del audio.",
  },
  {
    icon: Heart,
    title: "Producción Ética",
    description:
      "Colaboramos con proveedores certificados que aseguran prácticas laborales responsables y condiciones de trabajo seguras para todos.",
  },
]

export default function Sustainability() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Nuestro Compromiso con la Sostenibilidad</h2>
          <p className="text-lg text-muted-foreground">
            La sostenibilidad no es solo un aspecto de nuestros productos, es el pilar que guía todas nuestras soluciones y servicios.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {compromisos.map((compromiso, index) => (
            <div key={index} className="text-center">
              <compromiso.icon className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4">{compromiso.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{compromiso.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
