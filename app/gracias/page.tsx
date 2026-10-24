"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { useCarrito } from "@/lib/carrito";
import { SOPORTE_MAIL } from "@/lib/tienda";

const MENSAJES = {
  aprobado: {
    titulo: "Listo, pago confirmado",
    texto:
      "Te llega el comprobante por mail. Si compraste software, en el mismo mail va el link de descarga. Si compraste hardware, te escribimos para coordinar el envío.",
  },
  pendiente: {
    titulo: "Pago en proceso",
    texto:
      "Mercado Pago todavía está confirmando la operación. Puede tardar unos minutos si pagaste por transferencia o efectivo. Te avisamos por mail apenas se acredite.",
  },
  rechazado: {
    titulo: "El pago no se pudo procesar",
    texto:
      "No se hizo ningún cargo. Podés intentar con otro medio de pago, o escribirnos y lo resolvemos por transferencia.",
  },
} as const;

type Estado = keyof typeof MENSAJES;

function Contenido() {
  const params = useSearchParams();
  const estado = (params.get("estado") ?? "pendiente") as Estado;
  const { vaciar } = useCarrito();
  const mensaje = MENSAJES[estado] ?? MENSAJES.pendiente;

  // Si el pago salió bien, el carrito ya no tiene sentido.
  useEffect(() => {
    if (estado === "aprobado") vaciar();
  }, [estado, vaciar]);

  return (
    <div className="max-w-xl mx-auto px-4 py-16 md:py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">{mensaje.titulo}</h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">{mensaje.texto}</p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild>
          <Link href="/store">Volver al store</Link>
        </Button>
        <Button asChild variant="outline">
          <a href={`mailto:${SOPORTE_MAIL}`}>Escribirnos</a>
        </Button>
      </div>
    </div>
  );
}

export default function GraciasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div className="py-24 text-center">Cargando…</div>}>
          <Contenido />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
