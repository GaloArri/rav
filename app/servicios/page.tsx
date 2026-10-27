"use client";

import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VisorImagenes from "../components/VisorImagenes";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import serviciosData from "../data/servicios.json";
import { useIdioma } from "@/lib/idioma";
import { useCarruselAutomatico } from "@/lib/movimiento";

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

/** El carrusel de arriba, hoy sin usar. Los títulos salen del diccionario. */
const SERVICIOS_CARRUSEL = SECCIONES.map(({ id, clave }) => ({
  sectionId: id,
  clave,
}));

function useScrollAnimation() {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };
}

function ImageCarousel({
  images,
  itemName,
  onImageClick,
}: {
  images: string[];
  itemName: string;
  onImageClick: (images: string[], indice: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useIdioma();

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative h-64 overflow-hidden rounded-2xl">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="relative h-full w-full flex-shrink-0">
            <Image
              src={image || "/placeholder.svg"}
              alt={`${itemName} — ${t("imagen")} ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="cursor-pointer object-cover transition-transform duration-300 hover:scale-105"
              onClick={() => onImageClick(images, index)}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label={t("anterior")}
            className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-[opacity,background-color] duration-300 hover:bg-black/70 group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label={t("siguiente")}
            className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-[opacity,background-color] duration-300 hover:bg-black/70 group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`${t("imagen")} ${index + 1}`}
                className={`toque-24 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SectionGrid({
  data,
  addToRefs,
  onImageClick,
}: {
  data: Item[];
  addToRefs: (el: HTMLElement | null) => void;
  onImageClick: (images: string[], indice: number) => void;
}) {
  const { idioma } = useIdioma();

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {data.map((item, index) => {
          const nombre = (idioma === "en" && item.nameEn) || item.name;
          const bajada =
            (idioma === "en" && item.descriptionEn) || item.description;

          return (
            <div
              key={`${item.id}-${item.name}`}
              className="group relative overflow-hidden transition-[opacity,transform] duration-700 ease-out"
              style={{ transitionDelay: `${index * 100}ms` }}
              ref={addToRefs}
            >
              <div className="relative">
                <ImageCarousel
                  images={item.images}
                  itemName={nombre}
                  onImageClick={onImageClick}
                />

                {/* El degradado de abajo, con la bajada encima. Clickear abre
                    la primera foto en el visor. */}
                <div
                  className="absolute inset-0 cursor-pointer rounded-2xl bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100"
                  onClick={() => onImageClick(item.images, 0)}
                >
                  {bajada && (
                    <div className="absolute bottom-0 left-0 right-0 translate-y-0 p-6 text-white transition-transform duration-500 md:translate-y-4 md:group-hover:translate-y-0">
                      <p className="text-sm leading-relaxed text-white/90">
                        {bajada}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-2 pt-4">
                <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary md:text-2xl">
                  {nombre}
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
  );
}

function ServicesCarousel({
  addToRefs,
}: {
  addToRefs: (el: HTMLElement | null) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t } = useIdioma();

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % SERVICIOS_CARRUSEL.length);
  const prevSlide = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + SERVICIOS_CARRUSEL.length) % SERVICIOS_CARRUSEL.length
    );

  const irASeccion = (sectionId: string) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pausa = useCarruselAutomatico(nextSlide, 4000, isAutoPlaying);

  return (
    <div
      className="mx-auto max-w-6xl transition-[opacity,transform] duration-700 ease-out"
      ref={addToRefs}
      {...pausa}
    >
      <div className="relative">
        <div className="select-none overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {SERVICIOS_CARRUSEL.map((servicio) => (
              <div key={servicio.sectionId} className="w-full flex-shrink-0">
                <div className="mx-4 rounded-2xl border border-border/50 bg-background p-12 transition-colors duration-300 hover:border-primary/20">
                  <div className="text-center">
                    <h3 className="mb-6 text-xl font-light text-foreground md:text-2xl">
                      {t(servicio.clave)}
                    </h3>
                    <div className="mt-8">
                      <Button
                        size="lg"
                        className="rounded-full px-8"
                        onClick={() => irASeccion(servicio.sectionId)}
                      >
                        {t("verMas")}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            prevSlide();
            setIsAutoPlaying(false);
          }}
          aria-label={t("anterior")}
          className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors duration-300 hover:bg-background md:flex"
        >
          <ChevronLeft className="h-5 w-5 text-muted-foreground" />
        </button>

        <button
          type="button"
          onClick={() => {
            nextSlide();
            setIsAutoPlaying(false);
          }}
          aria-label={t("siguiente")}
          className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors duration-300 hover:bg-background md:flex"
        >
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {SERVICIOS_CARRUSEL.map((s, index) => (
          <button
            key={s.sectionId}
            type="button"
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
            }}
            aria-label={t(s.clave)}
            className={`toque-24 h-2 rounded-full transition-[width,background-color] duration-300 ${
              index === currentIndex
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ServiciosPage() {
  const addToRefs = useScrollAnimation();
  const { t } = useIdioma();

  const [visorAbierto, setVisorAbierto] = useState(false);
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [indice, setIndice] = useState(0);

  /**
   * Abre el visor con la lista completa, no con una sola URL. Antes esto
   * mandaba la URL sola y la lista quedaba vacía: el visor no mostraba nada
   * pero igual trababa el scroll de la página.
   */
  const abrirVisor = (lista: string[], desde: number) => {
    if (!lista?.length) return;
    setImagenes(lista);
    setIndice(desde);
    setVisorAbierto(true);
  };

  const cerrarVisor = () => {
    setVisorAbierto(false);
    setImagenes([]);
    setIndice(0);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="contenido"
        className="relative flex-grow bg-cover bg-fixed bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/project-artists/duko1.webp')" }}
      >
        <div className="absolute inset-0 bg-white/70 dark:bg-black/50" />

        <section className="relative py-32 pb-16">
          <div className="relative z-10">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-black uppercase tracking-[-0.03em] md:text-4xl lg:text-5xl">
                {t("nuestrosServicios")}
              </h1>
            </div>
            <div className="mb-8 flex items-center justify-center">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="mx-4 h-3 w-3 rounded-full bg-primary" />
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>
          </div>
        </section>

        {SECCIONES.map(({ id, clave, bajada, datos }, i) => (
          <section
            key={id}
            id={id}
            className={
              i % 2 === 0
                ? "scroll-mt-20 bg-white/50 py-24 dark:bg-black/20"
                : "scroll-mt-20 py-24"
            }
          >
            <div className="container mx-auto px-4">
              <div
                className="mb-16 text-center transition-[opacity,transform] duration-700 ease-out"
                ref={addToRefs}
              >
                <h2 className="mb-2 text-2xl font-black uppercase tracking-[-0.03em] md:text-3xl">
                  {t(clave)}
                </h2>
                {bajada && (
                  <>
                    <div className="mx-auto mb-4 h-px w-24 bg-primary" />
                    <p className="mx-auto max-w-md text-base leading-relaxed text-gray-700 dark:text-muted-foreground/80 md:text-lg">
                      {t(bajada)}
                    </p>
                  </>
                )}
              </div>
              <SectionGrid
                data={serviciosData[datos] as Item[]}
                addToRefs={addToRefs}
                onImageClick={abrirVisor}
              />
            </div>
          </section>
        ))}
      </main>
      <Footer />

      <VisorImagenes
        abierto={visorAbierto}
        imagenes={imagenes}
        indice={indice}
        onCerrar={cerrarVisor}
      />

      <style jsx global>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}
