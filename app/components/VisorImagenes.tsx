"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useIdioma } from "@/lib/idioma";

/**
 * Visor a pantalla completa, compartido por Servicios y Proyectos.
 *
 * Antes había una copia en cada página y en Servicios quedaba trabada: la
 * página abría el visor sin pasarle la lista de imágenes, así que no se veía
 * nada pero el `overflow: hidden` del body ya estaba puesto y no se podía
 * seguir navegando. Por eso el candado al scroll ahora depende de que el
 * visor REALMENTE tenga algo que mostrar, no de que alguien lo haya abierto.
 */
export default function VisorImagenes({
  abierto,
  imagenes,
  indice,
  titulo,
  onCerrar,
}: {
  abierto: boolean;
  imagenes: string[];
  indice: number;
  titulo?: string;
  onCerrar: () => void;
}) {
  const [actual, setActual] = useState(indice);
  const { t } = useIdioma();

  useEffect(() => {
    setActual(indice);
  }, [indice]);

  // La única condición que vale: hay imagen para mostrar.
  const visible = abierto && imagenes.length > 0 && Boolean(imagenes[actual]);

  const siguiente = useCallback(() => {
    setActual((i) => (i + 1) % imagenes.length);
  }, [imagenes.length]);

  const anterior = useCallback(() => {
    setActual((i) => (i - 1 + imagenes.length) % imagenes.length);
  }, [imagenes.length]);

  useEffect(() => {
    if (!visible) return;

    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") siguiente();
    };

    document.addEventListener("keydown", alTeclear);
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = previo;
    };
  }, [visible, onCerrar, anterior, siguiente]);

  if (!visible) return null;

  const nombre = titulo ? `${titulo} — ` : "";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={titulo ?? t("imagenAmpliada")}
      onClick={onCerrar}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      {/* Cerrar: fijo arriba a la derecha de la pantalla, para que no se
          vaya de pantalla cuando la foto ocupa todo el alto. */}
      <button
        type="button"
        onClick={onCerrar}
        aria-label={t("cerrar")}
        className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black md:right-6 md:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        className="relative flex max-h-[88vh] max-w-[92vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {imagenes.length > 1 && (
          <>
            <button
              type="button"
              onClick={anterior}
              aria-label={t("anterior")}
              className="absolute left-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black md:-left-16"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={siguiente}
              aria-label={t("siguiente")}
              className="absolute right-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black md:-right-16"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        <Image
          src={imagenes[actual]}
          alt={`${nombre}${t("imagen")} ${actual + 1}`}
          width={1600}
          height={1067}
          sizes="92vw"
          quality={90}
          className="max-h-[88vh] w-auto rounded-sm object-contain"
          priority
        />

        {imagenes.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {imagenes.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActual(i)}
                aria-label={`${t("imagen")} ${i + 1}`}
                aria-current={i === actual ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === actual ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
