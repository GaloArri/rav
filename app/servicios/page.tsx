"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VisorImagenes from "../components/VisorImagenes";
import CarruselFotos from "../components/CarruselFotos";
import Movimiento from "../store/components/Movimiento";
import serviciosData from "../data/servicios.json";
import { useIdioma } from "@/lib/idioma";

type Item = {
  id: number;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  images: string[];
};

/** Las secciones, en el orden en que se muestran. */
const SECCIONES = [
  { id: "equipos-section", clave: "catalogoEquipamiento", bajada: null, datos: "equipos" },
  { id: "alquiler-section", clave: "tituloAlquiler", bajada: "bajadaAlquiler", datos: "alquiler" },
  { id: "reparacion-section", clave: "tituloReparacion", bajada: "bajadaReparacion", datos: "reparacion" },
  { id: "programacion-section", clave: "tituloProgramacion", bajada: "bajadaProgramacion", datos: "programacion" },
  { id: "montaje-section", clave: "tituloMontaje", bajada: "bajadaMontaje", datos: "montaje" },
  { id: "diseno-section", clave: "tituloDiseno", bajada: "bajadaDiseno", datos: "diseno" },
] as const;

/** Dos cifras, como un contador de rack: 01, 02… */
const dos = (n: number) => String(n).padStart(2, "0");

export default function ServiciosPage() {
  const { t, idioma } = useIdioma();

  const [visor, setVisor] = useState<{
    imagenes: string[];
    indice: number;
    titulo: string;
  } | null>(null);

  const cerrarVisor = () => setVisor(null);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="contenido" className="flex-grow">
        <section className="border-b">
          <div className="mx-auto max-w-screen-xl px-4 pb-12 pt-16 md:px-8 md:pb-16 md:pt-24">
            <p data-entra className="etiqueta flex items-center gap-2.5">
              <span className="led" aria-hidden="true" />
              {t("servicios")}
            </p>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
              <h1
                data-entra
                style={{ ["--i" as string]: 1 }}
                className="titulo-grande max-w-[16ch] text-4xl md:text-6xl lg:text-7xl"
              >
                {t("nuestrosServicios")}
              </h1>
              <Link href="/contact" className="boton-rav gap-3">
                {t("pedirCotizacion")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <p
              data-entra
              style={{ ["--i" as string]: 2 }}
              className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-muted-foreground"
            >
              {t("bajadaServicios")}
            </p>
          </div>
        </section>

        {/* Cada servicio es un panel enmarcado, como uno de rack: el borde
            marca dónde empieza y dónde termina, sin cambiar el fondo de la
            página entera. */}
        <div className="mx-auto max-w-screen-xl space-y-6 px-4 py-10 md:space-y-8 md:px-8 md:py-14">
        {SECCIONES.map(({ id, clave, bajada, datos }, i) => {
          const items = serviciosData[datos] as Item[];
          return (
            <section
              key={id}
              id={id}
              aria-labelledby={`t-${id}`}
              className="relative rounded-sm border bg-card"
            >
              <span aria-hidden="true" className="tornillo left-3 top-3" />
              <span aria-hidden="true" className="tornillo right-3 top-3" />
              <span aria-hidden="true" className="tornillo bottom-3 left-3" />
              <span aria-hidden="true" className="tornillo bottom-3 right-3" />

              {/* La franja del frente: el LED y el número de panel. */}
              <div className="flex items-center gap-3 border-b px-9 py-3 md:px-12">
                <span className="led" aria-hidden="true" />
                <p className="etiqueta">
                  <span className="dato text-foreground">{dos(i + 1)}</span> /{" "}
                  {dos(SECCIONES.length)}
                </p>
              </div>

              <div className="grid gap-8 px-9 py-8 md:px-12 md:py-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">

              {/* La ficha de la sección. Va quieta con su panel: pegada abajo
                  del header parecía que la barra la empujaba al scrollear. */}
              <header data-entra>
                <h2
                  id={`t-${id}`}
                  className="text-[28px] font-black uppercase leading-none tracking-[-0.025em]"
                >
                  {t(clave)}
                </h2>
                {bajada && (
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                    {t(bajada)}
                  </p>
                )}
              </header>

              <ul className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-x-8 gap-y-12">
                {items.map((item, n) => {
                  const nombre = (idioma === "en" && item.nameEn) || item.name;
                  const detalle =
                    (idioma === "en" && item.descriptionEn) || item.description;
                  const fotos = item.images.filter((s) => !s.includes("placeholder"));

                  return (
                    <li
                      key={`${item.id}-${item.name}`}
                      data-entra
                      style={{ ["--i" as string]: n % 3 }}
                    >
                      <CarruselFotos
                        imagenes={item.images}
                        nombre={nombre}
                        alAbrir={(indice) =>
                          setVisor({ imagenes: fotos, indice, titulo: nombre })
                        }
                      />
                      <h3 className="mt-5 text-xl font-black uppercase leading-tight tracking-[-0.02em] md:text-2xl">
                        {nombre}
                      </h3>
                      {detalle && (
                        <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">
                          {detalle}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
              </div>
            </section>
          );
        })}
        </div>
      </main>
      <Footer />

      <VisorImagenes
        abierto={visor !== null}
        imagenes={visor?.imagenes ?? []}
        indice={visor?.indice ?? 0}
        titulo={visor?.titulo}
        onCerrar={cerrarVisor}
      />
      <Movimiento />
    </div>
  );
}
