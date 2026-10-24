import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { obtenerPago, sitio } from "@/lib/mercadopago";
import { actualizarPedido, leerPedido } from "@/lib/pedidos";
import { avisarPorTelegram, avisarPorMail, avisoVenta, enviarMail, mailCompra } from "@/lib/notificaciones";
import { linkDescarga } from "@/lib/descargas";
import { expandir } from "@/lib/productos";

export const runtime = "nodejs";

/**
 * Valida la firma de Mercado Pago.
 * Manifiesto: id:<data.id>;request-id:<x-request-id>;ts:<ts>;
 * HMAC-SHA256 en hexadecimal usando la clave secreta del webhook.
 */
function firmaValida(req: Request, dataId: string): boolean {
  const secreto = process.env.MP_WEBHOOK_SECRET;
  if (!secreto) {
    console.warn("[webhook] MP_WEBHOOK_SECRET sin configurar: no se valida firma");
    return false;
  }

  const cabecera = req.headers.get("x-signature");
  const requestId = req.headers.get("x-request-id");
  if (!cabecera) return false;

  let ts = "";
  let hash = "";
  for (const parte of cabecera.split(",")) {
    const [clave, valor] = parte.split("=");
    if (!clave || !valor) continue;
    if (clave.trim() === "ts") ts = valor.trim();
    if (clave.trim() === "v1") hash = valor.trim();
  }
  if (!ts || !hash) return false;

  // Los ids alfanuméricos van en minúscula; los campos ausentes se omiten.
  const partes = [`id:${dataId.toLowerCase()};`];
  if (requestId) partes.push(`request-id:${requestId};`);
  partes.push(`ts:${ts};`);
  const manifiesto = partes.join("");

  const calculado = crypto
    .createHmac("sha256", secreto)
    .update(manifiesto)
    .digest("hex");

  const a = Buffer.from(calculado, "utf8");
  const b = Buffer.from(hash, "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const cuerpo = await request.json().catch(() => ({}) as any);

  const tipo = cuerpo?.type ?? url.searchParams.get("type");
  const dataId =
    url.searchParams.get("data.id") ?? String(cuerpo?.data?.id ?? "");

  if (!dataId) return NextResponse.json({ ok: true });

  if (!firmaValida(request, dataId)) {
    return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
  }

  try {
    if (tipo === "payment") {
      const pago = await obtenerPago(dataId);
      if (!pago.external_reference) return NextResponse.json({ ok: true });

      const estado =
        pago.status === "approved"
          ? "aprobado"
          : pago.status === "rejected" || pago.status === "cancelled"
            ? "rechazado"
            : "pendiente";

      await actualizarPedido(pago.external_reference, {
        estado,
        pago_id: String(pago.id),
        email: pago.payer?.email,
      });

      if (estado === "aprobado") {
        await avisar(pago.external_reference, String(pago.id), pago.payer?.email);
      }
    }
  } catch (error) {
    // Devolvemos 200 igual: si respondemos error, MP reintenta en loop.
    console.error("[webhook]", error);
  }

  return NextResponse.json({ ok: true });
}

/**
 * Avisa de una venta confirmada: Telegram para vos, mail para el cliente.
 * Los errores se tragan a propósito — un aviso caído no debe afectar el pago.
 */
async function avisar(referencia: string, pagoId: string, emailPago?: string) {
  const pedido = await leerPedido(referencia);
  const items = (pedido?.items as { id?: string; title: string; quantity: number }[]) ?? [];
  const email = pedido?.email ?? emailPago;

  const datos = {
    referencia,
    total: pedido?.total ?? 0,
    email,
    items,
    pagoId,
  };

  const aviso = avisoVenta(datos);
  await avisarPorTelegram(aviso);
  await avisarPorMail(
    `Venta ${referencia} — $ ${datos.total.toLocaleString("es-AR")}`,
    aviso.replace(/<[^>]+>/g, "")
  );

  if (!email) return;

  // Link firmado sólo para lo que sea software descargable
  // Un pack se entrega como los devices que trae adentro, un link cada uno.
  const descargas = expandir(items.map((i) => i.id).filter((id): id is string => !!id))
    .filter((p) => p.linea === "software" && !!p.descarga)
    .map((p) => ({ nombre: p.nombre, url: linkDescarga(sitio(), p.slug, referencia) }));

  await enviarMail({
    para: email,
    asunto: `Tu compra en RAV — ${referencia}`,
    html: mailCompra(datos, descargas),
  });
}
