"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { useCarrito } from "@/lib/carrito";
import { SOPORTE_MAIL } from "@/lib/tienda";
import { useIdioma } from "@/lib/idioma";
import Texto from "../components/Texto";

const MENSAJES = {
  aprobado: { titulo: "aprobadoTitulo", texto: "aprobadoTexto" },
  pendiente: { titulo: "pendienteTitulo", texto: "pendienteTexto" },
  rechazado: { titulo: "rechazadoTitulo", texto: "rechazadoTexto" },
} as const;

type Estado = keyof typeof MENSAJES;

function Contenido() {
  const params = useSearchParams();
  const estado = (params.get("estado") ?? "pendiente") as Estado;
  const { vaciar } = useCarrito();
  const { t } = useIdioma();
  const mensaje = MENSAJES[estado] ?? MENSAJES.pendiente;

  // Si el pago salió bien, el carrito ya no tiene sentido.
  useEffect(() => {
    if (estado === "aprobado") vaciar();
  }, [estado, vaciar]);

  return (
    <div className="max-w-xl mx-auto px-4 py-16 md:py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">{t(mensaje.titulo)}</h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">{t(mensaje.texto)}</p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild>
          <Link href="/store">{t("volverAlStore")}</Link>
        </Button>
        <Button asChild variant="outline">
          <a href={`mailto:${SOPORTE_MAIL}`}>{t("escribirnos")}</a>
        </Button>
      </div>
    </div>
  );
}

export default function GraciasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="contenido" className="flex-grow">
        <Suspense fallback={<div className="py-24 text-center"><Texto clave="cargando" /></div>}>
          <Contenido />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
