import Image from "next/image"

export default function AboutUs() {
  const images = [
    { src: "/images/about/FOTO 21.jpg", alt: "Nuestro taller" },
    { src: "/images/about/FOTO 23.jpg", alt: "Proceso de diseño" },
    { src: "/images/about/FOTO 34.jpg", alt: "Materiales sostenibles" },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4 text-center">
              <h1 className="text-3xl font-bold">Sobre nosotros</h1>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Desde su fundación en 2020, Rav se ha dedicado a crear soluciones innovadoras en sistemas de reproducción de audio, combinando tecnología avanzada con un enfoque sostenible. Lo que comenzó como un pequeño taller en Buenos Aires ha crecido para convertirse en un referente en la industria de soluciones de playback.
                </p>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
