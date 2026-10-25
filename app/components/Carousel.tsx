"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import carouselData from "../data/carousel.json";
import { useIdioma } from "@/lib/idioma";

/**
 * Banda de apertura: la foto al fondo, el título apretado adelante y el
 * índice en mono a un costado, como la numeración de un panel de rack.
 * La lógica es la de siempre: pasa sola cada seis segundos.
 */
export default function Carousel() {
  const [actual, setActual] = useState(0);
  const { items } = carouselData;
  const { idioma, t } = useIdioma();

  const siguiente = useCallback(() => {
    setActual((i) => (i + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    const t = setInterval(siguiente, 6000);
    return () => clearInterval(t);
  }, [siguiente]);

  return (
    <section className="relative border-b bg-placa" aria-label={t("queHacemos")}>
      <div className="relative h-[420px] md:h-[520px]">
        {items.map((item, i) => (
          <div
            key={item.image}
            data-placa={i}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              actual === i ? "opacity-100" : "opacity-0"
            )}
            aria-hidden={actual !== i}
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover"
            />
            {/* El negro come la foto de abajo hacia arriba para que entre el texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/20" />
          </div>
        ))}

        <div className="relative mx-auto flex h-full max-w-screen-xl flex-col justify-end px-4 pb-12 md:px-8 md:pb-16">
          {items.map((item, i) => (
            <div
              key={item.image + "-txt"}
              data-texto={i}
              className={cn(
                "absolute bottom-12 left-4 right-4 transition-opacity duration-700 md:bottom-16 md:left-8 md:right-8",
                actual === i ? "opacity-100" : "pointer-events-none opacity-0"
              )}
              aria-hidden={actual !== i}
            >
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
                {String(i + 1).padStart(2, "0")} · {String(items.length).padStart(2, "0")}
              </p>
              <h2 className="max-w-[14ch] text-5xl font-black uppercase leading-[0.94] tracking-[-0.035em] text-white md:text-7xl">
                {item.title[idioma]}
              </h2>
              <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-white/70 md:text-base">
                {item.description[idioma]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Los puntos, abajo a la derecha, como los indicadores de un panel */}
      <div className="absolute bottom-6 right-4 flex gap-2 md:right-8">
        {items.map((item, i) => (
          <button
            key={item.image}
            type="button"
            data-punto={i}
            onClick={() => setActual(i)}
            aria-label={item.title[idioma]}
            aria-current={actual === i ? "true" : undefined}
            className="flex h-11 w-5 items-center justify-center"
          >
            <span
              className={cn(
                "block h-[6px] w-[6px] rounded-full transition-colors",
                actual === i ? "bg-senal" : "bg-white/30"
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
