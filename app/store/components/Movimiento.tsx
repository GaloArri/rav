"use client";

import { useEffect } from "react";

/**
 * Las entradas de cada sección. Todo arranca visible: recién cuando este
 * script corre se marca <html class="mov"> y se esconden las partes que
 * todavía no llegaron a la pantalla. Si el JS no corre, o si el sistema pidió
 * menos movimiento, no se esconde nada (ver CLAUDE.md, "Nada arranca invisible").
 */
export default function Movimiento() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const raiz = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-entra]"));

    // Lo que ya está en pantalla no se esconde: entra en el mismo cuadro.
    const alto = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < alto * 0.92) el.classList.add("visto");
    });
    raiz.classList.add("mov");

    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add("visto");
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => !el.classList.contains("visto") && obs.observe(el));

    return () => {
      obs.disconnect();
      raiz.classList.remove("mov");
    };
  }, []);

  return null;
}
