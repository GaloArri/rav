"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Castellano e inglés, como el chip EN/ES que tienen los devices.
export type Idioma = "es" | "en";

const CLAVE = "rav-idioma";

type Textos = Record<string, { es: string; en: string }>;

export const T: Textos = {
  // navegación
  inicio: { es: "Inicio", en: "Home" },
  servicios: { es: "Servicios", en: "Services" },
  store: { es: "Store", en: "Store" },
  proyectos: { es: "Proyectos", en: "Projects" },
  nosotros: { es: "Nosotros", en: "About" },
  contacto: { es: "Contacto", en: "Contact" },
  menu: { es: "Menú", en: "Menu" },
  abrirMenu: { es: "Abrir el menú", en: "Open the menu" },
  enLinea: { es: "En línea", en: "Online" },
  carrito: { es: "Carrito", en: "Cart" },
  soporte: { es: "Soporte", en: "Support" },

  // marca
  rubro: { es: "Playback · Sincro · Proceso vocal", en: "Playback · Sync · Vocal processing" },
  bajadaMarca: {
    es: "Soluciones informáticas en reproducción de audio con tecnología avanzada. Calidad profesional que perdura en el tiempo.",
    en: "Software and systems for audio playback, built on current technology. Professional quality that lasts.",
  },
  masSobreNosotros: { es: "Más sobre nosotros", en: "More about us" },

  // tira de estado
  playback: { es: "Playback", en: "Playback" },
  sincro: { es: "Sincro", en: "Sync" },
  autotune: { es: "Auto-Tune", en: "Auto-Tune" },
  resta: { es: "Resta", en: "Remaining" },

  // store
  packs: { es: "Packs", en: "Bundles" },
  software: { es: "Software · Max for Live", en: "Software · Max for Live" },
  software2: { es: "Software", en: "Software" },
  hardware: { es: "Hardware", en: "Hardware" },
  taller: { es: "Taller", en: "Workshop" },
  todo: { es: "Todo", en: "All" },
  producto: { es: "producto", en: "product" },
  productos: { es: "productos", en: "products" },
  sinProductos: {
    es: "Todavía no hay productos en esta categoría.",
    en: "Nothing in this category yet.",
  },
  descargaInmediata: { es: "Descarga inmediata", en: "Instant download" },
  seArma: { es: "Se arma en el taller", en: "Built in the workshop" },
  seCotiza: { es: "Se cotiza a medida", en: "Quoted per job" },

  // ficha
  queEs: { es: "Qué es", en: "What it is" },
  queTrae: { es: "Qué trae", en: "What's inside" },
  detalle: { es: "Detalle", en: "Details" },
  requisitos: { es: "Requisitos", en: "Requirements" },
  version: { es: "Versión", en: "Version" },
  comprarAhora: { es: "Comprar ahora", en: "Buy now" },
  agregar: { es: "Agregar al carrito", en: "Add to cart" },
  pedirCotizacion: { es: "Pedir cotización", en: "Request a quote" },
  verDocumentacion: { es: "Ver documentación", en: "Read the docs" },
  seCobraEnPesos: { es: "se cobra en pesos", en: "charged in Argentine pesos" },
  trasPagarSoftware: {
    es: "Después de pagar te llega el link de descarga por mail.",
    en: "The download link arrives by email right after payment.",
  },
  envios: {
    es: "Envíos a todo el país. Retiro en el taller sin cargo.",
    en: "We ship across Argentina. Free pickup at the workshop.",
  },
  antesDeArrancar: {
    es: "Te pasamos precio y plazo antes de arrancar el trabajo.",
    en: "We send price and lead time before starting the job.",
  },
};

type Contexto = {
  idioma: Idioma;
  cambiar: (i: Idioma) => void;
  t: (clave: keyof typeof T | string) => string;
};

const Ctx = createContext<Contexto>({
  idioma: "es",
  cambiar: () => {},
  t: (clave) => T[clave as string]?.es ?? String(clave),
});

export function IdiomaProvider({ children }: { children: React.ReactNode }) {
  const [idioma, setIdioma] = useState<Idioma>("es");

  useEffect(() => {
    // ?idioma=en sirve para compartir el sitio en inglés con un link.
    let elegido: Idioma | null = null;
    try {
      const url = new URLSearchParams(window.location.search).get("idioma");
      if (url === "en" || url === "es") elegido = url;
      if (!elegido) {
        const guardado = window.localStorage.getItem(CLAVE);
        if (guardado === "en" || guardado === "es") elegido = guardado;
      }
    } catch {
      /* sin localStorage se queda en castellano */
    }
    if (elegido) setIdioma(elegido);
  }, []);

  const cambiar = (i: Idioma) => {
    setIdioma(i);
    try {
      window.localStorage.setItem(CLAVE, i);
    } catch {
      /* no pasa nada */
    }
    document.documentElement.lang = i;
  };

  const t = (clave: keyof typeof T | string) =>
    T[clave as string]?.[idioma] ?? String(clave);

  return <Ctx.Provider value={{ idioma, cambiar, t }}>{children}</Ctx.Provider>;
}

export const useIdioma = () => useContext(Ctx);
