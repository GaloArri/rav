"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  porSlug,
  precioTexto,
  precioEquivalente,
  type Producto,
} from "@/lib/productos";
import { SEGMENTOS, type Bilingue, type Familia } from "@/lib/segmentos";
import { numero } from "@/lib/formato";
import { useIdioma } from "@/lib/idioma";
import { cn } from "@/lib/utils";
import Seccion from "./Seccion";
import { Inclinable, Tornillos } from "./Efectos";
import { TX } from "./textos";

/**
 * La primera pantalla, el software y el hardware. Cada segmento es un bloque
 * con su fondo (ver Seccion.tsx); adentro, a la izquierda se lee y a la
 * derecha queda la placa con la pantalla del device elegido o el equipo.
 */

const SOFTWARE = SEGMENTOS[0];
const HARDWARE = SEGMENTOS[1];

const productosDe = (f: Familia) =>
  f.slugs.map((s) => porSlug(s)).filter((p): p is Producto => Boolean(p));

const todos = (seg: (typeof SEGMENTOS)[number]) => seg.familias.flatMap(productosDe);

function useTx() {
  const { idioma } = useIdioma();
  return (b: Bilingue) => b[idioma];
}

function resumenDe(p: Producto, idioma: "es" | "en") {
  return idioma === "en" && p.resumenEn ? p.resumenEn : p.resumen;
}

/** Cantidad y forma de entrega, para el encabezado y el índice. */
function datosDe(seg: (typeof SEGMENTOS)[number], idioma: "es" | "en") {
  const ps = todos(seg);
  const cantidad = ps.filter((p) => !p.incluye).length;
  const unidad = seg.id === "software" ? TX.devices : seg.id === "hardware" ? TX.equipos : TX.trabajos;
  let desde: string | null = null;
  if (seg.id === "software") {
    desde = `US$ ${Math.min(...ps.map((p) => p.precioUSD ?? Infinity))}`;
  } else if (seg.id === "hardware") {
    desde = `$ ${numero(Math.min(...ps.map((p) => p.precioARS ?? Infinity)), idioma)}`;
  }
  return { cantidad: `${cantidad} ${unidad[idioma]}`, desde, entrega: seg.entrega[idioma] };
}

/* ─── Primera pantalla ─────────────────────────────────────────────── */

function Portada() {
  const { idioma } = useIdioma();
  const tx = useTx();

  return (
    <div className="portada-store relative overflow-hidden">
      {/* El loop del logo cromado, el mismo de la portada del sitio: atrás,
          desenfocado y sólo en oscuro (ver globals.css) */}
      <div className="loop-portada" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/rav-portada.webp"
          tabIndex={-1}
        >
          <source src="/video/rav-portada.webm" type="video/webm" />
          <source src="/video/rav-portada.mp4" type="video/mp4" />
        </video>
        <span className="loop-velo" />
      </div>
    <div className="relative mx-auto max-w-screen-xl px-4 pb-20 pt-12 md:px-8 md:pb-28 md:pt-16">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <div>
          <h1
            data-entra
            className="max-w-[14ch] text-[36px] font-black uppercase leading-[0.95] tracking-[-0.03em] md:text-[48px]"
          >
            {tx(TX.titulo)}
          </h1>
          <p
            data-entra
            style={{ ["--i" as string]: 1 }}
            className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-muted-foreground"
          >
            {tx(TX.bajada)}
          </p>

          {/* Índice: los tres segmentos, con lo que hay que saber de cada uno */}
          <nav aria-label={tx(TX.navegacionStore)} className="mt-10 flex flex-col gap-2">
            {SEGMENTOS.map((seg, i) => {
              const d = datosDe(seg, idioma);
              return (
                <div key={seg.id} data-entra style={{ ["--i" as string]: i + 2 }}>
                  <a
                    href={`#${seg.id}`}
                    className="fila-viva group flex items-center gap-5 rounded-lg banda-alterna px-5 py-4"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[20px] font-bold tracking-[-0.01em]">
                        {seg.titulo[idioma]}
                      </span>
                      <span className="mt-0.5 block text-[15px] text-muted-foreground">
                        {d.cantidad}
                        {d.desde ? ` · ${tx(TX.desde)} ${d.desde}` : ""} · {d.entrega}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[20px] text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground"
                    >
                      →
                    </span>
                  </a>
                </div>
              );
            })}
          </nav>
        </div>

        <figure data-entra style={{ ["--i" as string]: 2 }} className="self-start">
          <Inclinable className="rounded-lg" grados={4}>
          <div className="placa-store relative overflow-hidden rounded-lg p-6 md:p-10">
            <Tornillos />
            <Image
              src="/images/products/rav-timer-web.webp"
              alt={tx(TX.placaInicio)}
              width={1800}
              height={1060}
              sizes="(max-width: 1024px) 100vw, 640px"
              className="h-auto w-full"
              priority
            />
          </div>
          </Inclinable>
          <figcaption className="mt-3 text-[13px] text-muted-foreground">
            {tx(TX.placaInicio)}
          </figcaption>
        </figure>
      </div>
    </div>
    </div>
  );
}

/* ─── Software ─────────────────────────────────────────────────────── */

function FilaDevice({
  p,
  activo,
  onElegir,
}: {
  p: Producto;
  activo: boolean;
  onElegir: () => void;
}) {
  const { idioma } = useIdioma();
  const ahorro = p.incluye ? p.specs.find((s) => s.label === "Ahorro")?.valor : undefined;

  return (
    <li>
      <button
        type="button"
        onClick={onElegir}
        aria-pressed={activo}
        className={cn(
          "fila-viva flex min-h-[48px] w-full items-baseline justify-between gap-6 rounded-lg px-4 py-3 text-left transition-colors",
          activo ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        <span className="text-[17px] font-bold">
          {p.incluye ? (idioma === "en" ? "All five, bundled" : "Los cinco juntos") : p.nombre}
          {ahorro && (
            <span className="ml-2 text-[13px] font-normal text-muted-foreground">
              {idioma === "en" ? "save" : "ahorrás"} {ahorro}
            </span>
          )}
        </span>
        <span className="shrink-0 text-[17px] tabular-nums">{precioTexto(p, idioma)}</span>
      </button>
    </li>
  );
}

/** Lo que se ve del device elegido: en desktop va en la placa fija. */
function PlacaDevice({ p }: { p: Producto }) {
  const { idioma } = useIdioma();
  const tx = useTx();

  return (
    <div>
      <Inclinable className="rounded-lg" grados={3}>
      <div className="placa-store relative overflow-hidden rounded-lg p-6 md:p-8">
        <Tornillos />
        <div key={p.slug} className="enciende flex flex-col gap-3">
        {p.imagenes.slice(0, 2).map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? p.nombre : ""}
            width={1800}
            height={600}
            sizes="(max-width: 1024px) 100vw, 640px"
            className="h-auto max-h-[34svh] w-full object-contain"
          />
        ))}
        </div>
      </div>
      </Inclinable>

      <div className="mt-6" aria-live="polite">
        <h3 className="text-[20px] font-bold tracking-[-0.01em]">{p.nombre}</h3>
        <p className="mt-1 max-w-[52ch] text-[17px] leading-relaxed text-muted-foreground">
          {resumenDe(p, idioma)}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
          <p className="tabular-nums">
            <span className="text-[28px] font-bold leading-none">{precioTexto(p, idioma)}</span>
            {precioEquivalente(p, idioma) && (
              <span className="ml-3 text-[13px] text-muted-foreground">
                {precioEquivalente(p, idioma)}
              </span>
            )}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href={`/store/${p.slug}`} className="boton-rav">
              {tx(TX.verFicha)}
            </Link>
            {p.docs && (
              <Link
                href={p.docs}
                className="text-[15px] underline decoration-muted-foreground/50 underline-offset-4 transition-colors hover:decoration-foreground"
              >
                {tx(TX.documentacion)}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SeccionSoftware() {
  const { idioma } = useIdioma();
  const tx = useTx();
  const [elegido, setElegido] = useState<Producto>(porSlug("rav-timer")!);
  const d = datosDe(SOFTWARE, idioma);

  return (
    <Seccion
      id="software"
      tono="alterno"
      led="late"
      titulo={tx(SOFTWARE.encabezado)}
      datos={`${d.cantidad} · ${d.entrega}`}
      bajada={tx(SOFTWARE.bajada)}
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <div className="flex flex-col gap-14">
          {SOFTWARE.familias.map((f) => (
            <div key={f.id}>
              <h3 data-entra className="text-[20px] font-bold tracking-[-0.01em]">
                {tx(f.titulo)}
              </h3>
              {f.texto && (
                <p
                  data-entra
                  style={{ ["--i" as string]: 1 }}
                  className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground"
                >
                  {tx(f.texto)}
                </p>
              )}
              <ul data-entra style={{ ["--i" as string]: 2 }} className="mt-4 flex flex-col gap-1 sm:-mx-4">
                {productosDe(f).map((p) => (
                  <FilaDevice
                    key={p.slug}
                    p={p}
                    activo={p.slug === elegido.slug}
                    onElegir={() => setElegido(p)}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <div className="lg:sticky lg:top-[148px]">
            <PlacaDevice p={elegido} />
          </div>
        </div>
      </div>
    </Seccion>
  );
}

/* ─── Hardware ─────────────────────────────────────────────────────── */

/** Sin foto todavía: el nombre y dos datos sobre la placa, en vez de un cuadro vacío. */
function VistaSinFoto({ p }: { p: Producto }) {
  const { idioma } = useIdioma();
  const datos = p.specs
    .filter((s) => s.label !== "Armado")
    .slice(0, 2)
    .map((s) => (idioma === "en" && s.valorEn ? s.valorEn : s.valor));
  return (
    <span className="placa-store absolute inset-0 flex flex-col justify-between p-5 text-[hsl(42_14%_93%)]">
      <Tornillos />
      <span className="text-[13px] text-[hsl(42_14%_93%/0.6)]">
        {idioma === "en" ? "Photo coming soon" : "Foto en preparación"}
      </span>
      <span>
        <span className="block text-[18px] font-black uppercase leading-[0.95] tracking-[-0.02em]">
          {p.nombre.replace(/^RAV /, "")}
        </span>
        <span className="mt-2 block text-[13px] leading-snug text-[hsl(42_14%_93%/0.7)]">
          {datos.join(" · ")}
        </span>
      </span>
    </span>
  );
}

function TarjetaEquipo({ p, familia }: { p: Producto; familia: string }) {
  const { idioma } = useIdioma();
  return (
    <li>
      <Link href={`/store/${p.slug}`} className="group block">
        <Inclinable className="rounded-lg">
        <span className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-white">
          {p.fotoPendiente ? (
            <VistaSinFoto p={p} />
          ) : (
            <Image
              src={p.imagenes[0]}
              alt={p.nombre}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
              className="foto-viva object-contain p-3"
            />
          )}
        </span>
        </Inclinable>
        <span className="mt-3 block text-[13px] text-muted-foreground">{familia}</span>
        <span className="mt-0.5 flex flex-wrap items-baseline justify-between gap-x-3">
          <span className="text-[15px] font-bold leading-snug underline-offset-4 group-hover:underline">
            {p.nombre.replace(/^RAV /, "")}
          </span>
          <span className="shrink-0 text-[15px] tabular-nums">{precioTexto(p, idioma)}</span>
        </span>
        <span className="mt-1 line-clamp-1 text-[13px] text-muted-foreground">
          {resumenDe(p, idioma)}
        </span>
      </Link>
    </li>
  );
}

function SeccionHardware() {
  const { idioma, t } = useIdioma();
  const tx = useTx();
  const d = datosDe(HARDWARE, idioma);
  // Los ocho de una vez: la familia va en cada tarjeta, no como título aparte
  const equipos = HARDWARE.familias.flatMap((f) =>
    productosDe(f).map((p) => ({ p, familia: tx(f.titulo) }))
  );

  return (
    <Seccion
      id="hardware"
      led="fijo"
      titulo={tx(HARDWARE.encabezado)}
      datos={`${d.cantidad} · ${d.entrega}`}
      bajada={tx(HARDWARE.bajada)}
      compacta
    >
      <ul
        data-entra
        className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4"
      >
        {equipos.map(({ p, familia }) => (
          <TarjetaEquipo key={p.slug} p={p} familia={familia} />
        ))}
      </ul>
      <p className="mt-10 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">
        {t("envios")}
      </p>
    </Seccion>
  );
}

/* ─── El conjunto ──────────────────────────────────────────────────── */

const VER: Record<string, string> = {
  software: "software",
  stock: "hardware",
  pedido: "pedido",
};

/** Los links viejos con ?ver=stock siguen funcionando: llevan a su sección. */
function SaltoVer() {
  const params = useSearchParams();
  useEffect(() => {
    const ver = params.get("ver");
    const id = ver ? VER[ver] : undefined;
    if (id) document.getElementById(id)?.scrollIntoView();
  }, [params]);
  return null;
}

export default function Grid() {
  return (
    <>
      {/* useSearchParams pide un Suspense; aislado acá para que el resto se
          renderice en el servidor y no dependa del JS */}
      <Suspense>
        <SaltoVer />
      </Suspense>
      <Portada />
      <SeccionSoftware />
      <SeccionHardware />
    </>
  );
}
