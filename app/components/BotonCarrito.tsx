"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCarrito } from "@/lib/carrito";

export default function BotonCarrito() {
  const { unidades, listo } = useCarrito();

  return (
    <Link
      href="/carrito"
      className="relative p-2 rounded-md hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={
        unidades > 0 ? `Carrito, ${unidades} productos` : "Carrito, vacío"
      }
    >
      <ShoppingCart className="h-5 w-5" aria-hidden />
      {listo && unidades > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-foreground text-background text-[11px] font-medium flex items-center justify-center tabular-nums">
          {unidades}
        </span>
      )}
    </Link>
  );
}
