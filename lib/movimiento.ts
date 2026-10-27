"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ¿El sistema pidió menos movimiento?
 *
 * Arranca en false para que el servidor y el cliente pinten igual, y se
 * corrige apenas monta. Escucha el cambio: alguien puede prender la
 * preferencia con la página abierta.
 */
export function usaMenosMovimiento() {
  const [menos, setMenos] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const leer = () => setMenos(mq.matches);
    leer();
    mq.addEventListener("change", leer);
    return () => mq.removeEventListener("change", leer);
  }, []);

  return menos;
}

/**
 * Un carrusel que pasa solo, pero se porta bien.
 *
 * Tres cosas que antes no hacía y que pide la WCAG para cualquier cosa que
 * se mueva sola más de cinco segundos al lado de contenido:
 *
 *  - se frena mientras el puntero está encima o algo adentro tiene el foco,
 *    así se puede leer o clickear sin que se escape;
 *  - no arranca nunca si el sistema pidió menos movimiento;
 *  - se frena cuando la pestaña no está a la vista, que además deja de
 *    gastar batería.
 *
 * Devuelve los handlers para pegarle al contenedor. No cambia nada de cómo
 * se ve: el carrusel sigue pasando igual cuando nadie lo está mirando.
 */
export function useCarruselAutomatico(
  avanzar: () => void,
  intervalo: number,
  habilitado = true
) {
  const [quieto, setQuieto] = useState(false);
  const avanzarRef = useRef(avanzar);
  const menosMovimiento = usaMenosMovimiento();

  // El callback cambia en cada render; el intervalo no tiene por qué.
  useEffect(() => {
    avanzarRef.current = avanzar;
  }, [avanzar]);

  useEffect(() => {
    if (!habilitado || quieto || menosMovimiento) return;

    const t = setInterval(() => {
      if (document.hidden) return;
      avanzarRef.current();
    }, intervalo);

    return () => clearInterval(t);
  }, [habilitado, quieto, menosMovimiento, intervalo]);

  return {
    onMouseEnter: () => setQuieto(true),
    onMouseLeave: () => setQuieto(false),
    onFocusCapture: () => setQuieto(true),
    onBlurCapture: () => setQuieto(false),
  };
}
