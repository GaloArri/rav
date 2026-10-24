"use client";

import { useIdioma } from "@/lib/idioma";
import { cn } from "@/lib/utils";

/** El chip EN/ES, igual al que tienen los devices abajo a la izquierda. */
export default function BotonIdioma() {
  const { idioma, cambiar } = useIdioma();

  return (
    <div
      className="flex items-center overflow-hidden rounded-lg border"
      role="group"
      aria-label="Idioma"
    >
      {(["es", "en"] as const).map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => cambiar(i)}
          aria-pressed={idioma === i}
          className={cn(
            "px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors",
            idioma === i
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {i}
        </button>
      ))}
    </div>
  );
}
