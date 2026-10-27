"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SEGMENTOS } from "@/lib/segmentos";
import { useIdioma } from "@/lib/idioma";
import { cn } from "@/lib/utils";
import { TX } from "./textos";

const ITEMS = [
  ...SEGMENTOS.map((s) => ({ id: s.id as string, titulo: s.titulo, corto: s.titulo })),
  { id: "arma", titulo: TX.armaTuSistema, corto: TX.tuSistema },
];

/**
 * La barra de segmentos, pegada abajo del header. Marca en qué parte del
 * store estás y lleva a cada una con un toque.
 */
export default function NavSegmentos() {
  const { idioma } = useIdioma();
  const [activo, setActivo] = useState<string | null>(null);
  const nav = useRef<HTMLElement>(null);
  const [barra, setBarra] = useState<{ x: number; w: number } | null>(null);

  // La barrita de abajo se desliza hasta el segmento activo
  useLayoutEffect(() => {
    const el = activo ? nav.current?.querySelector<HTMLElement>(`a[href="#${activo}"]`) : null;
    setBarra(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  }, [activo, idioma]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setActivo(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="sticky top-[68px] z-40 bg-background">
      <nav
        ref={nav}
        aria-label={TX.navegacionStore[idioma]}
        className="relative mx-auto flex h-14 max-w-screen-xl items-center gap-4 overflow-x-auto sm:gap-7 px-4 [scrollbar-width:none] md:px-8"
      >
        {ITEMS.map(({ id, titulo, corto }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={activo === id ? "location" : undefined}
            className={cn(
              "shrink-0 whitespace-nowrap py-2 text-[15px] font-bold transition-colors sm:text-[17px]",
              activo === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="sm:hidden">{corto[idioma]}</span>
            <span className="hidden sm:inline">{titulo[idioma]}</span>
          </a>
        ))}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 left-0 h-[2px] rounded-full bg-foreground transition-[transform,width,opacity] duration-500 [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)]"
          style={{
            width: barra?.w ?? 0,
            transform: `translateX(${barra?.x ?? 0}px)`,
            opacity: barra ? 1 : 0,
          }}
        />
      </nav>
    </div>
  );
}
