import Image from "next/image"

const workshopImages = [
  {
    src: "/images/products/placeholder.jpg",
    alt: "Taller de Rav - Diseño y planificación",
    title: "Diseño y Planificación"
  },
  {
    src: "/images/products/placeholder.jpg",
    alt: "Taller de Rav - Ensamblaje de componentes",
    title: "Ensamblaje de Componentes"
  },
  {
    src: "/images/products/placeholder.jpg",
    alt: "Taller de Rav - Pruebas y calibración",
    title: "Pruebas y Calibración"
  },
  {
    src: "/images/products/placeholder.jpg",
    alt: "Taller de Rav - Control de calidad",
    title: "Control de Calidad"
  }
]

export default function WorkshopGallery() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nuestro Taller</h2>
          <p className="text-lg text-muted-foreground">
            Este es el lugar donde todo pasa. Donde las ideas se convierten en realidad y donde cada 
            componente cobra vida. No es solo un taller, es donde creamos las herramientas que hacen 
            que tu música suene como debe sonar.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {workshopImages.map((image, index) => (
              <div key={index} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 