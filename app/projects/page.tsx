"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VisorImagenes from "../components/VisorImagenes";
import Movimiento from "../store/components/Movimiento";
import artistsData from "../data/artists.json";
import CarruselFotos from "../components/CarruselFotos";
import { useIdioma } from "@/lib/idioma";
import { cn } from "@/lib/utils";

/** Dos cifras, como un contador de rack: 01, 02… */
const dos = (n: number) => String(n).padStart(2, "0");

/** Hasta qué lugar de la lista llegan los del escalón del medio: 2º al 5º. */
const ESCALON_MEDIO = 4;

/** Las fotos reales de un artista; los placeholders no cuentan. */
const fotosDe = (imagenes: string[]) =>
  imagenes.filter((src) => !src.includes("placeholder"));

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

  const artistas = artistsData.artists;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="contenido" className="flex-grow">
        {/* Cabecera: la regla del rack con su etiqueta, el título apretado
            y la bajada. Sin foto de fondo: la superficie es el negro. */}
        <section className="border-b">
          <div className="mx-auto max-w-screen-xl px-4 pb-12 pt-16 md:px-8 md:pb-16 md:pt-24">
            <p
              data-entra
              className="etiqueta flex items-center gap-2.5"
            >
              <span className="led" aria-hidden="true" />
              {t("proyectos")}
              <span className="dato text-foreground">
                {dos(artistas.length)}
              </span>
              {t("artistas")}
            </p>

            <h1
              data-entra
              style={{ ["--i" as string]: 1 }}
              className="titulo-grande mt-6 max-w-[16ch] text-4xl md:text-6xl lg:text-7xl"
            >
              {t("colaboradores")}
            </h1>

            <p
              data-entra
              style={{ ["--i" as string]: 2 }}
              className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-muted-foreground"
            >
              {t("bajadaProyectos")}
            </p>
          </div>
        </section>

        {/* Tres escalones por orden en artists.json: el primero ocupa todo el
            ancho, los cuatro siguientes van de a dos y el resto de a tres. El
            orden del archivo es el orden de importancia. */}
        <section aria-label={t("colaboradores")}>
          <div className="mx-auto max-w-screen-xl px-4 py-12 md:px-8 md:py-16">
            <ul className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-6 lg:gap-x-12 lg:gap-y-20">
              {artistas.map((artist, i) => {
                const nivel = i === 0 ? "grande" : i <= ESCALON_MEDIO ? "medio" : "chico";
                const bajada =
                  (idioma === "en" && artist.descriptionEn) ||
                  artist.description;
                const fotos = fotosDe(artist.images);
                const cuenta = (
                  <span className="etiqueta shrink-0">
                    {fotos.length > 0 ? (
                      <>
                        <span className="dato text-foreground">{dos(fotos.length)}</span>{" "}
                        {t("fotos")}
                      </>
                    ) : (
                      "—"
                    )}
                  </span>
                );

                return (
                  <li
                    key={artist.id}
                    data-entra
                    style={{ ["--i" as string]: i % 3 }}
                    className={cn(
                      nivel === "grande" && "md:col-span-6",
                      nivel === "medio" && "md:col-span-3",
                      nivel === "chico" && "md:col-span-3 lg:col-span-2"
                    )}
                  >
                    <article
                      className={cn(
                        nivel === "grande" &&
                          "lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-end lg:gap-12"
                      )}
                    >
                      <CarruselFotos
                        imagenes={artist.images}
                        nombre={artist.name}
                        sizes={
                          nivel === "grande"
                            ? "(max-width: 1024px) 100vw, 66vw"
                            : nivel === "medio"
                              ? "(max-width: 768px) 100vw, 50vw"
                              : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        }
                        alAbrir={(desde) => abrirVisor(fotos, desde, artist.name)}
                      />

                      {nivel === "grande" ? (
                        <div className="pt-6 lg:pb-1 lg:pt-0">
                          <p className="etiqueta flex items-center justify-between gap-4">
                            <span className="dato">{dos(i + 1)}</span>
                            {cuenta}
                          </p>
                          <h2 className="titulo-grande mt-5 text-4xl md:text-5xl">
                            {artist.name}
                          </h2>
                          {bajada && (
                            <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted-foreground">
                              {bajada}
                            </p>
                          )}
                        </div>
                      ) : (
                        <>
                          {/* La regla de la tarjeta: número a la izquierda,
                              cantidad de fotos a la derecha, como un panel de 1U. */}
                          <div className="regla-rack gap-4">
                            <div className="flex min-w-0 items-baseline gap-4">
                              <span className="dato text-[11px] tracking-[0.14em] text-muted-foreground">
                                {dos(i + 1)}
                              </span>
                              <h2
                                className={cn(
                                  "truncate font-black uppercase leading-none tracking-[-0.025em]",
                                  nivel === "medio" ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
                                )}
                              >
                                {artist.name}
                              </h2>
                            </div>
                            {cuenta}
                          </div>

                          {bajada && (
                            <p
                              className={cn(
                                "max-w-[60ch] pt-4 leading-relaxed text-muted-foreground",
                                nivel === "medio" ? "text-[15px]" : "line-clamp-3 text-[14px]"
                              )}
                            >
                              {bajada}
                            </p>
                          )}
                        </>
                      )}
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
      <Footer />

      <VisorImagenes
        abierto={visorAbierto}
        imagenes={imagenes}
        indice={indice}
        titulo={nombre}
        onCerrar={cerrarVisor}
      />
      <Movimiento />
    </div>
  );
}
