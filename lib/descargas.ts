import crypto from "node:crypto";

// Links de descarga firmados: el archivo sólo se entrega con un token
// válido y no vencido, así el link que mandás por mail no se puede
// repartir para siempre.

const VALIDEZ_DIAS = 7;

function secreto() {
  const s = process.env.DESCARGA_SECRET;
  if (!s) throw new Error("Falta DESCARGA_SECRET");
  return s;
}

export function firmarDescarga(slug: string, referencia: string) {
  const vence = Date.now() + VALIDEZ_DIAS * 24 * 60 * 60 * 1000;
  const datos = `${slug}:${referencia}:${vence}`;
  const firma = crypto.createHmac("sha256", secreto()).update(datos).digest("hex");
  return { vence, firma };
}

export function verificarDescarga(
  slug: string,
  referencia: string,
  vence: string,
  firma: string
) {
  if (Number(vence) < Date.now()) return false;

  const esperada = crypto
    .createHmac("sha256", secreto())
    .update(`${slug}:${referencia}:${vence}`)
    .digest("hex");

  const a = Buffer.from(esperada, "utf8");
  const b = Buffer.from(firma, "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function linkDescarga(
  sitio: string,
  slug: string,
  referencia: string
) {
  const { vence, firma } = firmarDescarga(slug, referencia);
  const q = new URLSearchParams({ slug, ref: referencia, vence: String(vence), firma });
  return `${sitio}/api/descarga?${q}`;
}
