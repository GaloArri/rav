"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Castellano e inglés, como el chip EN/ES que tienen los devices.
// El tipo y el formateador viven en lib/formato.ts, que no es "use client".
export type { Idioma } from "./formato";
export { numero } from "./formato";

import type { Idioma } from "./formato";

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
  saltarAlContenido: { es: "Saltar al contenido", en: "Skip to content" },
  abrirMenu: { es: "Abrir el menú", en: "Open the menu" },
  enLinea: { es: "En línea", en: "Online" },
  carrito: { es: "Carrito", en: "Cart" },
  cambiarTema: { es: "Cambiar entre claro y oscuro", en: "Switch between light and dark" },
  queHacemos: { es: "Qué hacemos", en: "What we do" },
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

  // visor de imágenes
  imagen: { es: "Imagen", en: "Image" },
  imagenAmpliada: { es: "Imagen ampliada", en: "Enlarged image" },
  cerrar: { es: "Cerrar", en: "Close" },
  anterior: { es: "Anterior", en: "Previous" },
  siguiente: { es: "Siguiente", en: "Next" },
  sinImagenes: { es: "Sin imágenes todavía", en: "No images yet" },

  // servicios
  nuestrosServicios: { es: "Nuestros servicios", en: "What we do" },
  catalogoEquipamiento: { es: "Catálogo de equipamiento", en: "Equipment catalogue" },
  verMas: { es: "Ver más", en: "See more" },
  tituloAlquiler: { es: "Alquiler de equipamiento", en: "Equipment rental" },
  bajadaAlquiler: {
    es: "Equipos profesionales para proceso vocal y secuencias",
    en: "Professional gear for vocal processing and playback",
  },
  tituloReparacion: { es: "Reparación de equipos", en: "Equipment repair" },
  bajadaReparacion: {
    es: "Servicio técnico especializado y garantizado",
    en: "Specialist service, guaranteed",
  },
  tituloProgramacion: { es: "Programación de sesiones", en: "Session programming" },
  bajadaProgramacion: {
    es: "Configuración y programación a medida",
    en: "Setup and programming built to order",
  },
  tituloMontaje: { es: "Montaje de equipamiento", en: "Rack assembly" },
  bajadaMontaje: {
    es: "Instalación y configuración profesional",
    en: "Professional install and configuration",
  },
  tituloDiseno: { es: "Diseño e impresión 3D", en: "3D design and printing" },
  bajadaDiseno: {
    es: "Soluciones de diseño y fabricación tridimensional",
    en: "Three-dimensional design and fabrication",
  },

  // proyectos
  colaboradores: { es: "Todos nuestros colaboradores", en: "Everyone we work with" },

  // nosotros
  sobreNosotros: { es: "Sobre nosotros", en: "About us" },
  fotoTaller: { es: "Foto del taller", en: "Workshop photo" },
  about1: {
    es: "RAV es una empresa joven especializada en soluciones de audio para música en vivo.",
    en: "RAV is a young company working on audio systems for live music.",
  },
  about2: {
    es: "Nacida en Buenos Aires en 2020, surgió con el objetivo de repensar los sistemas de reproducción y playback, combinando tecnología de vanguardia, criterios sostenibles y una fuerte conexión con la escena musical.",
    en: "It started in Buenos Aires in 2020, out of a wish to rethink playback systems, bringing together current technology, a considered approach and a close tie to the music scene.",
  },
  about3: {
    es: "Lo que empezó como un pequeño taller, se transformó en un punto de referencia para artistas, técnicos y productores que buscan precisión, practicidad y calidad en cada show.",
    en: "What began as a small workshop became a reference point for artists, engineers and producers after precision, practicality and quality at every show.",
  },
  about4: {
    es: "Hoy, desde nuestros desarrollos hasta nuestra manera de trabajar, RAV sigue creciendo con una visión clara: aportar valor real al universo sonoro desde la innovación, el detalle y la experiencia.",
    en: "Today, from the tools we build to the way we work, RAV keeps growing with one clear aim: to add real value to live sound through invention, attention to detail and experience.",
  },

  // contacto
  contactanos: { es: "Contactanos", en: "Get in touch" },
  mail: { es: "Correo electrónico", en: "Email" },
  telefono: { es: "Teléfono", en: "Phone" },
  campoNombre: { es: "Nombre", en: "Name" },
  phNombre: { es: "Tu nombre", en: "Your name" },
  campoAsunto: { es: "Asunto", en: "Subject" },
  phAsunto: { es: "¿De qué se trata?", en: "What's it about?" },
  campoMensaje: { es: "Mensaje", en: "Message" },
  phMensaje: { es: "Tu mensaje…", en: "Your message…" },
  enviarMensaje: { es: "Enviar mensaje", en: "Send message" },
  enviando: { es: "Enviando…", en: "Sending…" },
  mensajeEnviado: { es: "¡Mensaje enviado!", en: "Message sent" },
  mensajeEnviadoTexto: {
    es: "Te respondemos lo antes posible.",
    en: "We'll get back to you as soon as we can.",
  },
  errorEnviar: { es: "No se pudo enviar el mensaje", en: "The message couldn't be sent" },
  errorEnviarTexto: {
    es: "Algo salió mal. Probá de nuevo.",
    en: "Something went wrong. Please try again.",
  },
  valNombre: {
    es: "El nombre tiene que tener al menos 2 caracteres",
    en: "Name must be at least 2 characters",
  },
  valMail: {
    es: "Esa dirección de correo no es válida",
    en: "That email address isn't valid",
  },
  valAsunto: {
    es: "El asunto tiene que tener al menos 5 caracteres",
    en: "Subject must be at least 5 characters",
  },
  valMensaje: {
    es: "El mensaje tiene que tener al menos 10 caracteres",
    en: "Message must be at least 10 characters",
  },

  // carrito
  cargando: { es: "Cargando…", en: "Loading…" },
  carritoVacio: { es: "Todavía no agregaste nada.", en: "Nothing in the cart yet." },
  verStore: { es: "Ver el store", en: "Go to the store" },
  cadaUno: { es: "c/u", en: "each" },
  quitar: { es: "Quitar", en: "Remove" },
  quitarUnidad: { es: "Quitar una unidad de", en: "Remove one unit of" },
  agregarUnidad: { es: "Agregar una unidad de", en: "Add one unit of" },
  total: { es: "Total", en: "Total" },
  envioPasoSiguiente: {
    es: "El costo de envío se calcula en el paso siguiente. Retiro en el taller sin cargo.",
    en: "Shipping is worked out in the next step. Pickup at the workshop is free.",
  },
  aQueMail: { es: "¿A qué dirección te escribimos?", en: "Where should we write to you?" },
  aQueMailAyuda: {
    es: "Ahí te llega el comprobante y, si comprás software, el link de descarga.",
    en: "That's where the receipt goes, and the download link if you buy software.",
  },
  pagarMP: { es: "Pagar con Mercado Pago", en: "Pay with Mercado Pago" },
  redirigiendoMP: {
    es: "Redirigiendo a Mercado Pago…",
    en: "Redirecting to Mercado Pago…",
  },
  redirigiendo: { es: "Redirigiendo…", en: "Redirecting…" },
  mediosMP: {
    es: "Tarjeta de crédito, débito, dinero en cuenta o efectivo.",
    en: "Credit card, debit card, account balance or cash.",
  },
  o: { es: "o", en: "or" },
  errorPago: { es: "No se pudo iniciar el pago", en: "The payment couldn't be started" },
  errorInesperado: { es: "Error inesperado", en: "Unexpected error" },

  // botones de compra
  agregado: { es: "Agregado ✓", en: "Added ✓" },
  irAlCarrito: { es: "Ir al carrito", en: "Go to the cart" },
  agregadoAlCarrito: { es: "agregado al carrito", en: "added to the cart" },
  aQueMailDevice: {
    es: "¿A qué dirección te mandamos el device?",
    en: "Where should we send the device?",
  },
  aQueMailDeviceAyuda: {
    es: "Apenas se acredita el pago te llega el link de descarga, junto con el comprobante y las instrucciones de instalación.",
    en: "As soon as the payment clears you get the download link, with the receipt and the install instructions.",
  },
  mailNecesario: {
    es: "Necesitamos un mail válido para mandarte la descarga.",
    en: "We need a valid email to send you the download.",
  },

  // transferencia
  pedido: { es: "Pedido", en: "Order" },
  transferTitulo: { es: "Transferencia bancaria", en: "Bank transfer" },
  transferAviso: {
    es: "Transferí el total y mandanos el comprobante. Preparamos el pedido apenas lo recibimos.",
    en: "Transfer the total and send us the receipt. We start on the order as soon as it arrives.",
  },
  titular: { es: "Titular", en: "Account holder" },
  copiado: { es: "copiado ✓", en: "copied ✓" },
  mandarComprobante: { es: "Mandar comprobante", en: "Send the receipt" },
  reservando: { es: "Reservando…", en: "Holding…" },
  pagarPorTransferencia: { es: "Pagar por transferencia", en: "Pay by transfer" },
  errorPedido: {
    es: "No se pudo registrar el pedido",
    en: "The order couldn't be registered",
  },
  pagas: { es: "Pagás", en: "You pay" },
  enVezDe: { es: "en vez de", en: "instead of" },
  coordinamosEnvio: {
    es: "Te damos los datos y coordinamos el envío.",
    en: "We send you the details and arrange delivery.",
  },

  // gracias
  aprobadoTitulo: { es: "Listo, pago confirmado", en: "Payment confirmed" },
  aprobadoTexto: {
    es: "Te llega el comprobante por mail. Si compraste software, en el mismo mail va el link de descarga. Si compraste hardware, te escribimos para coordinar el envío.",
    en: "The receipt is on its way by email. If you bought software, the download link is in that same email. If you bought hardware, we'll write to arrange delivery.",
  },
  pendienteTitulo: { es: "Pago en proceso", en: "Payment in progress" },
  pendienteTexto: {
    es: "Mercado Pago todavía está confirmando la operación. Puede tardar unos minutos si pagaste por transferencia o efectivo. Te avisamos por mail apenas se acredite.",
    en: "Mercado Pago is still confirming the transaction. It can take a few minutes if you paid by transfer or cash. We'll email you as soon as it clears.",
  },
  rechazadoTitulo: { es: "El pago no se pudo procesar", en: "The payment didn't go through" },
  rechazadoTexto: {
    es: "No se hizo ningún cargo. Podés intentar con otro medio de pago, o escribirnos y lo resolvemos por transferencia.",
    en: "Nothing was charged. You can try another payment method, or write to us and we'll sort it out by transfer.",
  },
  volverAlStore: { es: "Volver al store", en: "Back to the store" },
  escribirnos: { es: "Escribirnos", en: "Email us" },

  // soporte
  documentacion: { es: "Documentación", en: "Documentation" },
  instalacion: { es: "Instalación", en: "Installation" },
  comoSeUsa: { es: "Cómo se usa", en: "How to use it" },
  cuandoAlgoNoAnda: { es: "Cuando algo no anda", en: "When something doesn't work" },
  dondeVa: { es: "Dónde va", en: "Where it goes" },
  vieneEnCarpeta: {
    es: "Viene en carpeta. Los archivos que están al lado del .amxd tienen que quedar siempre con él.",
    en: "It ships in a folder. The files next to the .amxd have to stay with it.",
  },
  noLoResolves: {
    es: "¿No lo resolvés? Escribinos y lo vemos.",
    en: "Still stuck? Write to us and we'll look at it.",
  },
  volverAlProducto: { es: "Volver al producto", en: "Back to the product" },
  sinDocumentacion: {
    es: "La documentación de este device todavía no está escrita. Escribinos a",
    en: "The documentation for this device isn't written yet. Write to us at",
  },
  yTeAyudamos: { es: "y te ayudamos.", en: "and we'll help." },
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
