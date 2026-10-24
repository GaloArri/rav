import { NextResponse } from "next/server";
import { verificarDescarga } from "@/lib/descargas";
import { porSlug } from "@/lib/productos";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams;
  const slug = q.get("slug") ?? "";
  const ref = q.get("ref") ?? "";
  const vence = q.get("vence") ?? "";
  const firma = q.get("firma") ?? "";

  if (!slug || !ref || !vence || !firma) {
    return NextResponse.json({ error: "Link incompleto" }, { status: 400 });
  }

  if (!verificarDescarga(slug, ref, vence, firma)) {
    return NextResponse.json(
      { error: "Este link venció o no es válido. Escribinos y te lo renovamos." },
      { status: 403 }
    );
  }

  const producto = porSlug(slug);
  if (!producto?.descarga) {
    return NextResponse.json({ error: "Archivo no disponible" }, { status: 404 });
  }

  // producto.descarga apunta al archivo real (Supabase Storage, S3, etc.)
  return NextResponse.redirect(producto.descarga, 302);
}
