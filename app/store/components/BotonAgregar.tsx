"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCarrito } from "@/lib/carrito";

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

  return (
    <div className="space-y-2">
      <Button
        className="w-full"
        onClick={() => {
          agregar(slug);
          setAgregado(true);
        }}
      >
        {agregado ? "Agregado ✓" : "Agregar al carrito"}
      </Button>

      {agregado && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push("/carrito")}
        >
          Ir al carrito
        </Button>
      )}

      <span className="sr-only" role="status">
        {agregado ? `${nombre} agregado al carrito` : ""}
      </span>
    </div>
  );
}
