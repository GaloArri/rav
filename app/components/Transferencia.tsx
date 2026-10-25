"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  TRANSFERENCIA,
  totalConDescuento,
  envioComprobante,
  ETIQUETA_CONTACTO,
} from "@/lib/tienda";
import { useIdioma } from "@/lib/idioma";

type Item = { slug: string; cantidad: number };
type Datos = { referencia: string; total: number };

function Copiable({ label, valor }: { label: string; valor: string }) {
  const [copiado, setCopiado] = useState(false);
  const { t } = useIdioma();

  return (
    <div className="flex items-center justify-between gap-3 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(valor);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 1500);
          } catch {
            // el portapapeles puede estar bloqueado; el valor sigue visible
          }
        }}
        className="font-medium hover:underline underline-offset-4 text-right"
      >
        {copiado ? t("copiado") : valor}
      </button>
    </div>
  );
}

/**
 * Pago por transferencia. Sirve para el carrito completo o para un
 * producto suelto: recibe los items y el total ya calculado.
 */
export default function Transferencia({
  items,
  total,
  email,
  onReservado,
}: {
  items: Item[];
  total: number;
  email: string;
  onReservado?: () => void;
}) {
  const [datos, setDatos] = useState<Datos | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useIdioma();

  const conDescuento = totalConDescuento(total);

  async function reservar() {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch("/api/transferencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, email: email || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? t("errorPedido"));
      setDatos(data);
      onReservado?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : t("errorInesperado"));
    } finally {
      setCargando(false);
    }
  }

  if (datos) {
    return (
      <div className="rounded-lg border p-5">
        <h3 className="font-medium">
          {t("pedido")} {datos.referencia}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("transferAviso")}
        </p>

        <div className="mt-4 divide-y border-t border-b">
          <Copiable label={t("titular")} valor={TRANSFERENCIA.titular} />
          <Copiable label="CVU" valor={TRANSFERENCIA.cvu} />
          <Copiable
            label={t("total")}
            valor={`$ ${datos.total.toLocaleString("es-AR")}`}
          />
        </div>

        <Button asChild className="mt-4 w-full">
          <a href={envioComprobante(datos.referencia)}>
            {t("mandarComprobante")} {ETIQUETA_CONTACTO}
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-medium">{t("transferTitulo")}</h3>
        <span className="dato text-sm font-medium text-foreground">
          {Math.round(TRANSFERENCIA.descuento * 100)}% off
        </span>
      </div>

      <p className="mt-1 text-sm text-muted-foreground">
        {t("pagas")} $ {conDescuento.toLocaleString("es-AR")} {t("enVezDe")} ${" "}
        {total.toLocaleString("es-AR")}. {t("coordinamosEnvio")}
      </p>

      <Button
        variant="outline"
        className="mt-4 w-full"
        onClick={reservar}
        disabled={cargando}
      >
        {cargando ? t("reservando") : t("pagarPorTransferencia")}
      </Button>

      {error && (
        <p className="mt-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
