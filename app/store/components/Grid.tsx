"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PRODUCTOS,
  precioTexto,
  precioEquivalente,
  type Linea,
  type Producto,
} from "@/lib/productos";
import { cn } from "@/lib/utils";
import { useIdioma } from "@/lib/idioma";

type Filtro = Linea | "todos";

const FILTROS: { valor: Filtro; clave: string }[] = [
  { valor: "todos", clave: "todo" },
  { valor: "software", clave: "software2" },
  { valor: "stock", clave: "hardware" },
  { valor: "pedido", clave: "taller" },
];

/** El resumen en el idioma que corresponda. */
function useResumen() {
  const { idioma } = useIdioma();
  return (p: Producto) => (idioma === "en" && p.resumenEn ? p.resumenEn : p.resumen);
}

function Etiqueta({ p }: { p: Producto }) {
  const { t } = useIdioma();
  if (p.linea === "software")
    return (
      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-senal">
        <span className="led" aria-hidden="true" />
        {t("descargaInmediata")}
      </span>
    );
  if (p.linea === "stock")
    return (
      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <span className="led-apagado" aria-hidden="true" />
        {t("seArma")}
      </span>
    );
  return (
    <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
      <span className="led-apagado" aria-hidden="true" />
      {t("seCotiza")}
    </span>
  );
}

function Precio({ p, grande }: { p: Producto; grande?: boolean }) {
  return (
    <span className="block text-right">
      <span className={cn("dato block font-normal", grande ? "text-2xl" : "text-xl")}>
        {precioTexto(p)}
      </span>
      {precioEquivalente(p) && (
        <span className="dato block text-[11px] text-muted-foreground">
          {precioEquivalente(p)}
        </span>
      )}
    </span>
  );
}

/** La regla que abre cada bloque, como la serigrafía de un panel de 1U. */
function Regla({ titulo, dato }: { titulo: string; dato: string }) {
  return (
    <div className="regla-rack mt-14 first:mt-0">
      <span className="etiqueta">{titulo}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/60">
        {dato}
      </span>
    </div>
  );
}

/** Fila ancha: la captura del device entra completa y se lee. */
function FilaSoftware({ p }: { p: Producto }) {
  return (
    <Link
      href={`/store/${p.slug}`}
      className="group block overflow-hidden rounded-lg border bg-card transition-colors hover:border-muted-foreground/50"
    >
      <div className="bg-placa">
        <Image
          src={p.imagenes[0]}
          alt={p.nombre}
          width={1800}
          height={430}
          sizes="(max-width: 1024px) 100vw, 900px"
          className="h-auto w-full"
        />
      </div>

      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t p-4 md:px-6">
        <h3 className="text-base font-bold underline-offset-4 group-hover:underline">
          {p.nombre}
        </h3>
        <Etiqueta p={p} />
        <span className="ml-auto">
          <Precio p={p} />
        </span>
      </div>
    </Link>
  );
}

/** Pack: sin foto, lo que importa es qué trae y cuánto ahorrás. */
function FilaPack({ p }: { p: Producto }) {
  const sueltos = p.specs.find((s) => s.label === "Sueltos")?.valor;
  return (
    <Link
      href={`/store/${p.slug}`}
      className="group relative block rounded-lg border border-senal bg-card p-6 transition-colors md:p-8"
    >
      <h3 className="titulo-grande text-2xl md:text-3xl">{p.nombre}</h3>

      <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <span className="dato text-3xl">{precioTexto(p)}</span>
        {sueltos && (
          <span className="dato text-xs text-muted-foreground line-through">
            {sueltos.replace("US$ ", "")}
          </span>
        )}
        {precioEquivalente(p) && (
          <span className="dato ml-auto text-[11px] text-muted-foreground">
            {precioEquivalente(p)}
          </span>
        )}
      </div>
    </Link>
  );
}

/** Tarjeta cuadrada: para fotos de producto. */
function Tarjeta({ p }: { p: Producto }) {
  const resumen = useResumen();

  return (
    <Link
      href={`/store/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border bg-card transition-colors hover:border-muted-foreground/50"
    >
      <div className="relative aspect-square bg-white">
        <Image
          src={p.imagenes[0]}
          alt={p.nombre}
          fill
          sizes="(max-width: 640px) 50vw, 300px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-col gap-2 border-t p-3.5 md:p-4">
        <span className="dato text-xl leading-none">{precioTexto(p)}</span>
        <Etiqueta p={p} />
        <h3 className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug underline-offset-2 group-hover:underline">
          {p.nombre}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {resumen(p)}
        </p>
      </div>
    </Link>
  );
}

export default function Grid() {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const { t } = useIdioma();

  const items =
    filtro === "todos" ? PRODUCTOS : PRODUCTOS.filter((p) => p.linea === filtro);
  const packs = items.filter((p) => p.incluye);
  const software = items.filter((p) => p.linea === "software" && !p.incluye);
  const hardware = items.filter((p) => p.linea === "stock");
  const taller = items.filter((p) => p.linea === "pedido");

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 border-b pb-6">
        {FILTROS.map(({ valor, clave }) => (
          <button
            key={valor}
            onClick={() => setFiltro(valor)}
            aria-pressed={filtro === valor}
            className={cn(
              "rounded-lg border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors",
              filtro === valor
                ? "border-foreground bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t(clave)}
          </button>
        ))}
        <span className="dato ml-auto text-[11px] text-muted-foreground">
          {items.length} {t(items.length === 1 ? "producto" : "productos")}
        </span>
      </div>

      {packs.length > 0 && (
        <>
          <Regla titulo={t("packs")} dato={String(packs.length)} />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {packs.map((p) => (
              <FilaPack key={p.slug} p={p} />
            ))}
          </div>
        </>
      )}

      {software.length > 0 && (
        <>
          <Regla titulo={t("software")} dato={String(software.length)} />
          <div className="mt-6 flex flex-col gap-4">
            {software.map((p) => (
              <FilaSoftware key={p.slug} p={p} />
            ))}
          </div>
        </>
      )}

      {hardware.length > 0 && (
        <>
          <Regla titulo={t("hardware")} dato={String(hardware.length)} />
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
            {hardware.map((p) => (
              <Tarjeta key={p.slug} p={p} />
            ))}
          </div>
        </>
      )}

      {taller.length > 0 && (
        <>
          <Regla titulo={t("taller")} dato={String(taller.length)} />
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
            {taller.map((p) => (
              <Tarjeta key={p.slug} p={p} />
            ))}
          </div>
        </>
      )}

      {items.length === 0 && (
        <p className="py-20 text-center text-muted-foreground">
          {t("sinProductos")}
        </p>
      )}
    </>
  );
}
