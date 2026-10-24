// Configuración comercial del store.

export const SOPORTE_MAIL = "soporte@rav.ar";
export const VENTAS_MAIL = "hola@rav.ar";

// Canal de contacto para cotizaciones y comprobantes.
// "mail" usa VENTAS_MAIL. "telegram" usa TELEGRAM_USUARIO.
export type Canal = "mail" | "telegram";

// Cambiá este valor para mover todos los botones de contacto de golpe.
// Si lo ponés en "telegram", completá TELEGRAM_USUARIO abajo.
export const CONTACTO = "mail" as Canal;

// Usuario de Telegram sin arroba, si algún día se usa ese canal.
export const TELEGRAM_USUARIO = "";

// Los devices se listan en dólares y se cobran en pesos. Este es el tipo de
// cambio con el que se convierte. ACTUALIZAR cuando se mueva el dólar: es el
// único lugar donde se toca.
// TODO: Juan tiene que definir qué dólar usa (oficial, blue, tarjeta).
export const DOLAR = 1560;

// Datos para cobrar por transferencia (cuenta Lemon).
export const TRANSFERENCIA = {
  titular: "RAV",
  cvu: "0000168300000028472771",
  descuento: 0.1, // 10% off por pagar sin intermediario
};

export function totalConDescuento(total: number) {
  return Math.round(total * (1 - TRANSFERENCIA.descuento));
}

/** Link de contacto con el asunto y el cuerpo ya escritos. */
export function linkContacto(asunto: string, cuerpo: string) {
  if (CONTACTO === "telegram" && TELEGRAM_USUARIO) {
    return `https://t.me/${TELEGRAM_USUARIO}?text=${encodeURIComponent(
      `${asunto}\n\n${cuerpo}`
    )}`;
  }
  const q = new URLSearchParams({ subject: asunto, body: cuerpo });
  return `mailto:${VENTAS_MAIL}?${q}`;
}

export function consultaProducto(nombre: string) {
  return linkContacto(
    `Consulta por ${nombre}`,
    `Hola, quiero consultar por ${nombre}.\n\nContame:\n- Qué necesitás exactamente:\n- Para cuándo:\n`
  );
}

export function envioComprobante(referencia: string) {
  return linkContacto(
    `Comprobante del pedido ${referencia}`,
    `Hola, hice la transferencia del pedido ${referencia}.\n\nAdjunto el comprobante.\n`
  );
}

/** Texto del botón según el canal configurado. */
export const ETIQUETA_CONTACTO =
  CONTACTO === "telegram" ? "por Telegram" : "por mail";
