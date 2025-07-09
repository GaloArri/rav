import Image from "next/image";

export default function AboutUs() {
  return (
    <section
      className="py-24 relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/about/rav.jpeg')",
      }}
    >
      {/* Overlay para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="flex flex-col items-center justify-center space-y-6 text-center min-h-[20rem]">
              <div className="flex-1 flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Sobre nosotros
                </h1>
                <div className="space-y-4 text-white/90 max-w-3xl">
                  <p className="text-lg leading-relaxed">
                    RAV es una empresa joven especializada en soluciones de
                    audio para música en vivo. <br></br> Nacida en Buenos Aires
                    en 2020, surgió con el objetivo de repensar los sistemas de
                    reproducción y playback, combinando tecnología de
                    vanguardia, criterios sostenibles y una fuerte conexión con
                    la escena musical. <br></br> Lo que empezó como un pequeño
                    taller, se transformó en un punto de referencia para
                    artistas, técnicos y productores que buscan precisión,
                    practicidad y calidad en cada show. <br></br> Hoy, desde
                    nuestros desarrollos hasta nuestra manera de trabajar, RAV
                    sigue creciendo con una visión clara: aportar valor real al
                    universo sonoro desde la innovación, el detalle y la
                    experiencia.
                  </p>
                </div>
              </div>
            </div>

            {/* Divisor estético */}
            <div className="flex items-center justify-center my-12">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              <div className="mx-4 w-3 h-3 bg-white rounded-full"></div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            </div>

            {/* Fila de 3 imágenes con fondo distinto */}
            <div className="mt-0 p-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="w-full flex justify-center">
                <Image
                  src="/images/about/FOTO 21.jpg"
                  alt="Foto del taller 1"
                  width={320}
                  height={200}
                  className="rounded-lg object-cover w-full h-48 shadow-lg"
                />
              </div>
              <div className="w-full flex justify-center">
                <Image
                  src="/images/about/FOTO 23.jpg"
                  alt="Foto del taller 2"
                  width={320}
                  height={200}
                  className="rounded-lg object-cover w-full h-48 shadow-lg"
                />
              </div>
              <div className="w-full flex justify-center">
                <Image
                  src="/images/about/FOTO 34.jpg"
                  alt="Foto del taller 3"
                  width={320}
                  height={200}
                  className="rounded-lg object-cover w-full h-48 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
