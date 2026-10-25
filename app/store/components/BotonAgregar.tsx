"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCarrito } from "@/lib/carrito";
import { useIdioma } from "@/lib/idioma";

export default function BotonAgregar({
  slug,
  nombre,
}: {
  slug: string;
  nombre: string;
}) {
  const { agregar } = useCarrito();
  const router = useRouter();
  const [agregado, setAgregado] = useState(false);
  const { t } = useIdioma();

  return (
    <div className="space-y-2">
      <Button
        className="w-full"
        onClick={() => {
          agregar(slug);
          setAgregado(true);
        }}
      >
        {agregado ? t("agregado") : t("agregar")}
      </Button>

      {agregado && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push("/carrito")}
        >
          {t("irAlCarrito")}
        </Button>
      )}

      <span className="sr-only" role="status">
        {agregado ? `${nombre} ${t("agregadoAlCarrito")}` : ""}
      </span>
    </div>
  );
}
