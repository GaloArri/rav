import Image from "next/image"

export default function AboutUs() {
  const images = [
    { src: "/images/about/FOTO 21.jpg", alt: "Nuestro taller" },
    { src: "/images/about/FOTO 23.jpg", alt: "Proceso de diseño" },
    { src: "/images/about/FOTO 34.jpg", alt: "Materiales sostenibles" },
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Sobre nosotros</h1>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Desde su fundación en 2020, Rav se ha dedicado a crear soluciones innovadoras en sistemas de reproducción de audio, combinando tecnología avanzada con un enfoque sostenible. Lo que comenzó como un pequeño taller en Buenos Aires ha crecido para convertirse en un referente en la industria de soluciones de playback.
                </p>
                <p>
                  Nuestra filosofía es clara: ofrecer productos de alta calidad que perduren en el tiempo, mientras reducimos al máximo nuestro impacto ambiental. Seleccionamos cuidadosamente materiales sostenibles y trabajamos con fabricantes éticos que comparten nuestros valores.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4 text-muted-foreground">
              <p>
                Cada producto en nuestra colección está diseñado y fabricado pensando en la durabilidad, tanto en estilo como en rendimiento. Este compromiso con la calidad y la sostenibilidad nos ha valido la confianza de clientes a nivel mundial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
