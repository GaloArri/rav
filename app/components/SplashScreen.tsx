"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const DURACION = 700; // ms visible
const FADE = 300; // ms de salida

export default function SplashScreen() {
  // Se decide antes del primer paint del cliente: si ya visitó, nunca se monta.
  const [activo, setActivo] = useState(false);
  const [saliendo, setSaliendo] = useState(false);

  useEffect(() => {
    const yaVisito = sessionStorage.getItem("hasVisited");
    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (yaVisito || sinMovimiento) {
      sessionStorage.setItem("hasVisited", "true");
      return;
    }

    setActivo(true);
    document.body.style.overflow = "hidden";

    const salida = setTimeout(() => setSaliendo(true), DURACION);
    const fin = setTimeout(() => {
      setActivo(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("hasVisited", "true");
    }, DURACION + FADE);

    return () => {
      clearTimeout(salida);
      clearTimeout(fin);
      document.body.style.overflow = "";
    };
  }, []);

  if (!activo) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-background",
        "transition-opacity duration-300",
        saliendo ? "opacity-0" : "opacity-100"
      )}
    >
      <Image
        src="/assets/logorav1.png"
        alt=""
        width={480}
        height={192}
        sizes="(max-width: 768px) 70vw, 480px"
        className="object-contain w-2/3 max-w-sm dark:invert-0 invert"
        priority
      />
    </div>
  );
}
