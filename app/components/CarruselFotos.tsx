"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useIdioma } from "@/lib/idioma";

/** Sin foto cargada, el dato apunta a /placeholder.jpg. */
const esPlaceholder = (src: string) => src.includes("placeholder");

/**
 * Las fotos de un artista o de un servicio. Con una sola, es una foto fija;
 * con más, pasa sola cada 4 s y unos segmentos finos pegados al borde de
 * abajo marcan cuál se está viendo. Tocar la foto abre el visor en esa.
 *
 * Pasa sola aunque el sistema pida menos movimiento: lo que esa preferencia
 * evita es la animación, y el CSS global ya vuelve instantáneo el fundido en
 * ese caso, así que queda un cambio de foto sin movimiento. Se frena con el
 * puntero encima, para poder mirarla o tocarla.
 */
export default function CarruselFotos({
  imagenes,
  nombre,
  alAbrir,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  imagenes: string[];
  nombre: string;
  alAbrir?: (indice: number) => void;
  /** Ancho real de la foto en pantalla: sin esto Next elige mal el tamaño */
  sizes?: string;
}) {
  const [actual, setActual] = useState(0);
  const [quieto, setQuieto] = useState(false);
  const { t } = useIdioma();

  const fotos = (imagenes ?? []).filter((src) => !esPlaceholder(src));
  const total = fotos.length;

  useEffect(() => {
    if (total < 2 || quieto) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setActual((i) => (i + 1) % total);
    }, 4000);
    return () => clearInterval(id);
  }, [total, quieto]);

  // Sin fotos todavía: la placa oscura, como el hardware del store que espera
  // su foto. Un cuadro gris con "Sin imágenes" se veía roto.
  if (total === 0) {
    return (
      <div className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-sm border bg-placa p-4">
        <span className="led-apagado" aria-hidden="true" />
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(40_5%_58%)]">
          {t("fotosProximamente")}
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden rounded-sm border bg-muted"
      onMouseEnter={() => setQuieto(true)}
      onMouseLeave={() => setQuieto(false)}
    >
      {fotos.map((src, i) => (
        <div
          key={src}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            actual === i ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={src}
            alt={`${nombre} — ${t("imagen")} ${i + 1}`}
            fill
            sizes={sizes}
            className="foto-viva object-cover"
          />
        </div>
      ))}

      {/* Toda la foto abre el visor. Es un botón de verdad para que se llegue
          con teclado. */}
      <button
        type="button"
        onClick={() => alAbrir?.(actual)}
        aria-label={`${t("ampliar")}: ${nombre}`}
        className="absolute inset-0 z-10 cursor-zoom-in"
      />

      {/* Un segmento por foto, pegado al borde de abajo. La mezcla por
          diferencia los hace legibles sobre fotos claras y oscuras sin
          ponerles un fondo atrás. */}
      {total > 1 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 bottom-3 z-20 flex gap-1 mix-blend-difference"
        >
          {fotos.map((src, i) => (
            <span
              key={src}
              className={cn(
                "h-[2px] flex-1 bg-white transition-opacity duration-300",
                i === actual ? "opacity-100" : "opacity-30"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
