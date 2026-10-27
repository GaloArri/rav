"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Si el sistema pidió menos movimiento, o si es una pantalla táctil. */
function sinMovimiento() {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(hover: none)").matches
  );
}

/**
 * Inclina lo que envuelve hacia el puntero, como un equipo que se mira de
 * costado, con un brillo que sigue al mouse. En pantallas táctiles o con
 * menos movimiento no hace nada.
 */
export function Inclinable({
  children,
  className,
  grados = 6,
}: {
  children: ReactNode;
  className?: string;
  grados?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={cn("inclinable", className)}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse" || sinMovimiento()) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--ry", `${(x - 0.5) * grados * 2}deg`);
        el.style.setProperty("--rx", `${(0.5 - y) * grados * 2}deg`);
        el.style.setProperty("--gx", `${x * 100}%`);
        el.style.setProperty("--gy", `${y * 100}%`);
        el.classList.add("siguiendo");
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
        el.classList.remove("siguiendo");
      }}
    >
      {children}
      <span aria-hidden="true" className="inclinable-brillo" />
    </div>
  );
}

/** Los cuatro tornillos de las orejas de un panel de rack. */
export function Tornillos() {
  return (
    <>
      <span aria-hidden="true" className="tornillo left-2.5 top-2.5" />
      <span aria-hidden="true" className="tornillo right-2.5 top-2.5" />
      <span aria-hidden="true" className="tornillo bottom-2.5 left-2.5" />
      <span aria-hidden="true" className="tornillo bottom-2.5 right-2.5" />
    </>
  );
}

/** Un número que corre hasta su valor nuevo en vez de saltar. */
export function Contador({ valor }: { valor: number }) {
  const [mostrado, setMostrado] = useState(valor);
  const desde = useRef(valor);

  useEffect(() => {
    if (sinMovimiento()) {
      setMostrado(valor);
      desde.current = valor;
      return;
    }
    const inicio = performance.now();
    const origen = desde.current;
    let cuadro = 0;
    const paso = (t: number) => {
      const k = Math.min(1, (t - inicio) / 420);
      const suave = 1 - Math.pow(1 - k, 3);
      setMostrado(Math.round(origen + (valor - origen) * suave));
      if (k < 1) cuadro = requestAnimationFrame(paso);
      else desde.current = valor;
    };
    cuadro = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(cuadro);
  }, [valor]);

  return <>{mostrado}</>;
}
