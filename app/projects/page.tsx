"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VisorImagenes from "../components/VisorImagenes";
import artistsData from "../data/artists.json";
import ArtistCarousel from "./components/ArtistCarousel";
import { useIdioma } from "@/lib/idioma";

export default function ArtistsPage() {
  const { t, idioma } = useIdioma();

  const [visorAbierto, setVisorAbierto] = useState(false);
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [indice, setIndice] = useState(0);
  const [nombre, setNombre] = useState("");

  const abrirVisor = (lista: string[], desde: number, artista: string) => {
    if (!lista?.length) return;
    setImagenes(lista);
    setIndice(desde);
    setNombre(artista);
    setVisorAbierto(true);
  };

  const cerrarVisor = () => {
    setVisorAbierto(false);
    setImagenes([]);
    setIndice(0);
    setNombre("");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main
        className="relative flex-grow bg-cover bg-fixed bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/marg6.webp')" }}
      >
        <div className="absolute inset-0 bg-white/70 dark:bg-black/50" />

        <div className="relative z-10">
          <section className="pb-8 pt-32">
            <div className="container mx-auto px-4">
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-3xl font-black uppercase tracking-[-0.03em] md:text-4xl lg:text-5xl">
                  {t("colaboradores")}
                </h1>
              </div>

              <div className="mb-8 flex items-center justify-center">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <div className="mx-4 h-3 w-3 rounded-full bg-primary" />
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              </div>
            </div>
          </section>

          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                  {artistsData.artists.map((artist) => {
                    const bajada =
                      (idioma === "en" && artist.descriptionEn) ||
                      artist.description;

                    return (
                      <div
                        key={artist.id}
                        className="group relative overflow-hidden"
                      >
                        <div className="relative">
                          <ArtistCarousel
                            images={artist.images}
                            artistName={artist.name}
                            onImageClick={(desde: number) =>
                              abrirVisor(artist.images, desde, artist.name)
                            }
                          />

                          <div
                            className="absolute inset-0 cursor-pointer rounded-2xl bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 transition-all duration-500 md:opacity-0 md:group-hover:opacity-100"
                            onClick={() => abrirVisor(artist.images, 0, artist.name)}
                          >
                            {bajada && (
                              <div className="absolute bottom-0 left-0 right-0 translate-y-0 p-6 transition-transform duration-500 md:translate-y-4 md:group-hover:translate-y-0">
                                <p className="text-sm leading-relaxed text-white/90 md:text-base">
                                  {bajada}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="px-2 pt-4">
                          <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-primary dark:text-white md:text-2xl">
                            {artist.name}
                          </h3>
                          <div className="mt-1 flex items-center gap-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-primary to-transparent" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />

      <VisorImagenes
        abierto={visorAbierto}
        imagenes={imagenes}
        indice={indice}
        titulo={nombre}
        onCerrar={cerrarVisor}
      />
    </div>
  );
}
