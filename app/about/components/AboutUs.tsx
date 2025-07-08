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
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center md:items-center md:justify-between space-y-6 md:space-y-0 md:space-x-8 text-center md:text-left min-h-[20rem]">
              <div className="flex-1 flex flex-col justify-center">
                <h1 className="text-3xl font-bold">Sobre nosotros</h1>
                <div className="space-y-4 text-muted-foreground mt-4">
                  <p>
                    Desde su fundación en 2020, Rav se ha dedicado a crear soluciones innovadoras en sistemas de reproducción de audio, combinando tecnología avanzada con un enfoque sostenible. Lo que comenzó como un pequeño taller en Buenos Aires ha crecido para convertirse en un referente en la industria de soluciones de playback.
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 mt-6 md:mt-0 flex justify-center items-center">
                <Image
                  src="/images/about/FOTO 2.jpg"
                  alt="Foto de equipo"
                  width={320}
                  height={320}
                  className="rounded-lg object-cover w-full h-80"
                />
              </div>
            </div>
            {/* Divisor estético */}
            <div className="flex items-center justify-center my-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
              <div className="mx-4 w-3 h-3 bg-primary rounded-full"></div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            </div>
            {/* Fila de 3 imágenes con fondo distinto */}
            <div className="mt-0 p-8 rounded-xl bg-primary/10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="w-full flex justify-center">
                <Image
                  src="/images/about/FOTO 21.jpg"
                  alt="Foto del taller 1"
                  width={320}
                  height={200}
                  className="rounded-lg object-cover w-full h-48"
                />
              </div>
              <div className="w-full flex justify-center">
                <Image
                  src="/images/about/FOTO 23.jpg"
                  alt="Foto del taller 2"
                  width={320}
                  height={200}
                  className="rounded-lg object-cover w-full h-48"
                />
              </div>
              <div className="w-full flex justify-center">
                <Image
                  src="/images/about/FOTO 34.jpg"
                  alt="Foto del taller 3"
                  width={320}
                  height={200}
                  className="rounded-lg object-cover w-full h-48"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
