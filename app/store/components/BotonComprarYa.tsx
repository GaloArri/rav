"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Transferencia from "../../components/Transferencia";

/**
 * Compra directa de un producto, sin pasar por el carrito.
 * Ofrece los dos medios: Mercado Pago y transferencia.
 */
export default function BotonComprarYa({
  slug,
  precioARS,
}: {
  slug: string;
  precioARS: number;
}) {
  const [email, setEmail] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailValido = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const items = [{ slug, cantidad: 1 }];

  async function pagarConMercadoPago() {
    if (!emailValido) {
      setError("Necesitamos un email válido para mandarte la descarga.");
      return;
    }

    setError(null);
    setCargando(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No se pudo iniciar el pago");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error inesperado");
      setCargando(false);
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="email-compra" className="block text-sm font-medium">
          ¿A qué dirección te mandamos el device?
        </label>
        <p id="ayuda-email" className="mt-1 mb-2 text-xs text-muted-foreground">
          Apenas se acredita el pago te llega el link de descarga, junto con el
          comprobante y las instrucciones de instalación.
        </p>
        <Input
          id="email-compra"
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-describedby="ayuda-email"
          placeholder="nombre@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Button
        className="w-full"
        onClick={pagarConMercadoPago}
        disabled={cargando}
      >
        {cargando ? "Redirigiendo…" : "Pagar con Mercado Pago"}
      </Button>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3 py-1">
        <span className="h-px flex-grow bg-border" />
        <span className="text-xs text-muted-foreground">o</span>
        <span className="h-px flex-grow bg-border" />
      </div>

      <Transferencia items={items} total={precioARS} email={email} />
    </div>
  );
}
