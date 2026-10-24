import { NextResponse } from "next/server";
import { porSlug, precioPesos } from "@/lib/productos";
import { guardarPedido, nuevaReferencia } from "@/lib/pedidos";
import { avisarPorTelegram, avisarPorMail, ahora } from "@/lib/notificaciones";
import { totalConDescuento } from "@/lib/tienda";

export const runtime = "nodejs";

/**
 * Pedido por transferencia bancaria. No hay pasarela: se reserva el pedido
 * como pendiente y el pago se confirma a mano cuando llega el comprobante.
 */
export async function POST(request: Request) {
  try {
    const { items, email } = (await request.json()) as {
      items: { slug: string; cantidad: number }[];
      email?: string;
    };

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
    }

    // Los precios salen del catálogo del servidor, igual que en el checkout.
    let bruto = 0;
    const detalle: string[] = [];

    for (const { slug, cantidad } of items) {
      const p = porSlug(slug);
      const pesos = p ? precioPesos(p) : undefined;
      if (!p || !pesos) {
        return NextResponse.json(
          { error: "Hay un producto que no se puede pagar online" },
          { status: 400 }
        );
      }
      const unidades = Math.max(1, Math.min(99, Math.floor(cantidad)));
      bruto += pesos * unidades;
      detalle.push(`• ${unidades}× ${p.nombre}`);
    }

    const total = totalConDescuento(bruto);
    const referencia = nuevaReferencia();

    await guardarPedido({
      referencia,
      estado: "pendiente",
      total,
      email,
      items,
    });

    const aviso = [
        "🏦 <b>Pedido por transferencia</b>",
        ahora(),
        "",
        detalle.join("\n"),
        "",
        `<b>Total con descuento: $ ${total.toLocaleString("es-AR")}</b>`,
        email ? `Cliente: ${email}` : null,
        `Pedido: <code>${referencia}</code>`,
        "",
        "Esperando comprobante.",
    ]
      .filter(Boolean)
      .join("\n");

    await avisarPorTelegram(aviso);
    await avisarPorMail(
      `Pedido por transferencia ${referencia} — $ ${total.toLocaleString("es-AR")}`,
      aviso.replace(/<[^>]+>/g, "")
    );

    return NextResponse.json({ referencia, total });
  } catch (error) {
    console.error("[transferencia]", error);
    return NextResponse.json(
      { error: "No pudimos registrar el pedido. Probá de nuevo." },
      { status: 500 }
    );
  }
}
