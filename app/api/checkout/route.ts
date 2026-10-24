import { NextResponse } from "next/server";
import { crearPreferencia, type ItemPreferencia } from "@/lib/mercadopago";
import { guardarPedido, nuevaReferencia } from "@/lib/pedidos";
import { porSlug, precioPesos } from "@/lib/productos";
import { sitio } from "@/lib/mercadopago";

export const runtime = "nodejs";

type Body = {
  items: { slug: string; cantidad: number }[];
  email?: string;
};

export async function POST(request: Request) {
  try {
    const { items, email } = (await request.json()) as Body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
    }

    // Los precios SIEMPRE salen del catálogo del servidor, nunca del cliente.
    const preferencia: ItemPreferencia[] = [];
    let total = 0;

    for (const { slug, cantidad } of items) {
      const p = porSlug(slug);
      if (!p) {
        return NextResponse.json(
          { error: `Producto desconocido: ${slug}` },
          { status: 400 }
        );
      }
      // El software se lista en dólares; Mercado Pago cobra en pesos.
      const pesos = precioPesos(p);
      if (!pesos) {
        return NextResponse.json(
          { error: `${p.nombre} se cotiza aparte, no se puede pagar online` },
          { status: 400 }
        );
      }

      const unidades = Math.max(1, Math.min(99, Math.floor(cantidad)));
      total += pesos * unidades;

      preferencia.push({
        id: p.slug,
        title: p.nombre,
        description: p.resumen,
        quantity: unidades,
        unit_price: pesos,
        currency_id: "ARS",
        picture_url: `${sitio()}${p.imagenes[0]}`,
      });
    }

    const referencia = nuevaReferencia();

    await guardarPedido({
      referencia,
      estado: "pendiente",
      total,
      email,
      items: preferencia,
    });

    const pref = await crearPreferencia({ items: preferencia, referencia, email });

    return NextResponse.json({
      referencia,
      url: pref.init_point,
    });
  } catch (error) {
    console.error("[checkout]", error);
    return NextResponse.json(
      { error: "No pudimos iniciar el pago. Probá de nuevo en un momento." },
      { status: 500 }
    );
  }
}
