// Cómo se ordena el store: tres segmentos, y adentro de cada uno, familias.
// Los productos siguen viviendo en lib/productos.ts; acá sólo se dice dónde
// va cada slug. Un producto nuevo que no se agregue a ninguna familia no
// aparece en el listado (sí en su ficha), así que sumalo acá también.

import type { Linea } from "./productos";

export type Bilingue = { es: string; en: string };

export type Familia = {
  id: string;
  titulo: Bilingue;
  texto?: Bilingue;
  slugs: string[];
};

export type Segmento = {
  id: "software" | "hardware" | "pedido";
  linea: Linea;
  titulo: Bilingue; // el nombre corto, para la navegación
  encabezado: Bilingue; // el h2 de la sección
  bajada: Bilingue;
  entrega: Bilingue;
  familias: Familia[];
};

export const SEGMENTOS: Segmento[] = [
  {
    id: "software",
    linea: "software",
    titulo: { es: "Software", en: "Software" },
    encabezado: { es: "Software para Ableton", en: "Software for Ableton" },
    bajada: {
      es: "Diez devices de Max for Live para el playback en vivo. Se pagan en pesos y se descargan apenas se acredita el pago.",
      en: "Ten Max for Live devices for live playback. Paid in Argentine pesos and downloaded as soon as the payment clears.",
    },
    entrega: { es: "Descarga inmediata", en: "Instant download" },
    familias: [
      {
        id: "timer",
        titulo: { es: "El sistema del Timer", en: "The Timer system" },
        texto: {
          es: "El Timer lee el Set y publica el show en una página web. Cada módulo le suma una parte a esa página.",
          en: "The Timer reads the Set and publishes the show to a web page. Each module adds one part to that page.",
        },
        slugs: ["rav-timer", "rav-full-setlist", "rav-remote", "rav-tune", "rav-bridge", "pack-playback"],
      },
      {
        id: "independientes",
        titulo: { es: "Independientes", en: "Standalone" },
        texto: {
          es: "Andan solos, sin el Timer: timecode, CDJ, Quad Cortex, SPD-SX PRO y el bypass del Auto-Tune.",
          en: "They work on their own, without the Timer: timecode, CDJ, Quad Cortex, SPD-SX PRO and the Auto-Tune bypass.",
        },
        slugs: ["rav-ltc", "rav-cdj", "rav-qc-preset", "rav-spd-kit", "rav-bypass"],
      },
    ],
  },
  {
    id: "hardware",
    linea: "stock",
    titulo: { es: "Hardware", en: "Hardware" },
    encabezado: { es: "Equipos de escenario", en: "Stage gear" },
    bajada: {
      es: "Talkback, timecode y soportes, armados en el taller de RAV. Se pagan online, en pesos.",
      en: "Talkback, timecode and holders, built in the RAV workshop. Paid online, in Argentine pesos.",
    },
    entrega: { es: "Se arma en el taller", en: "Built in the workshop" },
    familias: [
      {
        id: "timecode",
        titulo: { es: "Timecode", en: "Timecode" },
        slugs: ["talkback-ltc-reader", "ltc-reader"],
      },
      {
        id: "talkback",
        titulo: { es: "Talkback", en: "Talkback" },
        texto: {
          es: "De pie o de mano, de uno o dos canales. El micrófono entra por XLR y sale por XLR.",
          en: "Floor or handheld, one or two channels. The mic goes in over XLR and out over XLR.",
        },
        slugs: ["foot-talkback-1ch", "foot-talkback-2ch", "finger-talkback-1ch", "finger-talkback-2ch"],
      },
      {
        id: "escenario",
        titulo: { es: "Escenario", en: "On stage" },
        slugs: ["midi-controller-shuly-01", "guitar-support-case"],
      },
    ],
  },
  {
    id: "pedido",
    linea: "pedido",
    titulo: { es: "A pedido", en: "Made to order" },
    encabezado: { es: "A pedido", en: "Made to order" },
    bajada: {
      es: "Trabajos de taller que no tienen dos iguales. No se pagan online: nos contás qué necesitás y lo cotizamos.",
      en: "Workshop jobs where no two are alike. Not paid online: tell us what you need and we quote it.",
    },
    entrega: { es: "Se cotiza a medida", en: "Quoted per job" },
    familias: [
      {
        id: "taller",
        titulo: { es: "Taller", en: "Workshop" },
        slugs: ["cables-a-medida", "piezas-3d", "rack-a-medida"],
      },
    ],
  },
];

export const segmentoDe = (linea: Linea) =>
  SEGMENTOS.find((s) => s.linea === linea)!;

/** La familia de un producto, para la ficha y los "relacionados". */
export function familiaDe(slug: string) {
  for (const s of SEGMENTOS)
    for (const f of s.familias) if (f.slugs.includes(slug)) return { segmento: s, familia: f };
  return null;
}
