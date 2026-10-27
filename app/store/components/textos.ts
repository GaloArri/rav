// Textos de interfaz del store que no vale la pena llevar al diccionario
// general. Siempre en los dos idiomas.

import type { Bilingue } from "@/lib/segmentos";

export const TX = {
  titulo: { es: "Herramientas para el vivo", en: "Tools for the live show" },
  bajada: {
    es: "Software para Ableton, equipos de escenario y trabajos de taller, hechos en Buenos Aires por el equipo que opera el playback de los shows.",
    en: "Software for Ableton, stage gear and workshop builds, made in Buenos Aires by the crew that runs playback at the shows.",
  },
  desde: { es: "Desde", en: "From" },
  devices: { es: "devices", en: "devices" },
  equipos: { es: "equipos", en: "units" },
  trabajos: { es: "trabajos", en: "services" },
  verFicha: { es: "Ver ficha y comprar", en: "See details and buy" },
  verFichaPedido: { es: "Ver detalle", en: "See details" },
  documentacion: { es: "Documentación", en: "Documentation" },
  ahorras: { es: "ahorrás", en: "you save" },
  pedirCotizacion: { es: "Pedir cotización", en: "Ask for a quote" },
  armaTuSistema: { es: "Armá tu sistema", en: "Build your rig" },
  armaBajada: {
    es: "Marcá los devices que vas a usar. Te decimos si te conviene comprarlos sueltos o en un bundle, y lo sumás al carrito.",
    en: "Tick the devices you will use. We tell you whether they cost less separately or in a bundle, and you add it to the cart.",
  },
  tuSistema: { es: "Tu sistema", en: "Your rig" },
  elegidos: { es: "elegidos", en: "selected" },
  conviene: { es: "Te conviene", en: "Best option" },
  sueltosNombre: { es: "Sueltos", en: "Separately" },
  agregarAlCarrito: { es: "Agregar al carrito", en: "Add to cart" },
  agregadoAlCarrito: { es: "Listo, está en el carrito", en: "Done, it's in the cart" },
  irAlCarrito: { es: "Ir al carrito", en: "Go to cart" },
  nadaElegido: {
    es: "Marcá al menos un device.",
    en: "Tick at least one device.",
  },
  navegacionStore: { es: "Secciones del store", en: "Store sections" },
  placaInicio: {
    es: "La página del RAV Timer, abierta en la red local",
    en: "The RAV Timer page, open on the local network",
  },
} satisfies Record<string, Bilingue>;
