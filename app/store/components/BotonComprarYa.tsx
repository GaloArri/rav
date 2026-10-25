"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Transferencia from "../../components/Transferencia";
import { useIdioma } from "@/lib/idioma";

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
  const { t } = useIdioma();

  const emailValido = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const items = [{ slug, cantidad: 1 }];

  async function pagarConMercadoPago() {
    if (!emailValido) {
      setError(t("mailNecesario"));
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
      if (!res.ok) throw new Error(data.error ?? t("errorPago"));
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : t("errorInesperado"));
      setCargando(false);
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="email-compra" className="block text-sm font-medium">
          {t("aQueMailDevice")}
        </label>
        <p id="ayuda-email" className="mt-1 mb-2 text-xs text-muted-foreground">
          {t("aQueMailDeviceAyuda")}
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
        {cargando ? t("redirigiendo") : t("pagarMP")}
      </Button>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3 py-1">
        <span className="h-px flex-grow bg-border" />
        <span className="text-xs text-muted-foreground">{t("o")}</span>
        <span className="h-px flex-grow bg-border" />
      </div>

      <Transferencia items={items} total={precioARS} email={email} />
    </div>
  );
}
