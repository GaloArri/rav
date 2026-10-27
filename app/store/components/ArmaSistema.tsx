"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { porSlug, precioPesos, type Producto } from "@/lib/productos";
import { SEGMENTOS } from "@/lib/segmentos";
import { numero } from "@/lib/formato";
import { useCarrito } from "@/lib/carrito";
import { useIdioma } from "@/lib/idioma";
import { cn } from "@/lib/utils";
import Seccion from "./Seccion";
import { Contador, Inclinable } from "./Efectos";
import { TX } from "./textos";

/**
 * Lo vivo del store: marcás los devices que usás y la cuenta dice si te
 * conviene comprarlos sueltos, con el Show Control Bundle o con el Bundle
 * Completo. Los precios salen del catálogo; el cobro, como siempre, lo
 * calcula el servidor a partir de los slugs.
 */

const FAMILIAS = SEGMENTOS[0].familias.map((f) => ({
  ...f,
  productos: f.slugs
    .map((s) => porSlug(s))
    .filter((p): p is Producto => Boolean(p) && !p!.incluye),
}));

const PACK_SHOW = porSlug("pack-playback")!;
const PACK_TODO = porSlug("pack-completo")!;
const usd = (p: Producto) => p.precioUSD ?? 0;

type Opcion = { id: string; nombre: string; slugs: string[]; total: number };

function opciones(sel: string[], idioma: "es" | "en"): Opcion[] {
  const sueltos = sel.map((s) => porSlug(s)!);
  const suma = sueltos.reduce((n, p) => n + usd(p), 0);
  const fuera = sueltos.filter((p) => !PACK_SHOW.incluye!.includes(p.slug));
  const usaShow = sel.some((s) => PACK_SHOW.incluye!.includes(s));

  const lista: Opcion[] = [
    { id: "sueltos", nombre: TX.sueltosNombre[idioma], slugs: sel, total: suma },
  ];
  if (usaShow && fuera.length < sel.length) {
    lista.push({
      id: "show",
      nombre:
        fuera.length > 0
          ? `${PACK_SHOW.nombre} + ${fuera.length} ${idioma === "en" ? "more" : "más"}`
          : PACK_SHOW.nombre,
      slugs: [PACK_SHOW.slug, ...fuera.map((p) => p.slug)],
      total: usd(PACK_SHOW) + fuera.reduce((n, p) => n + usd(p), 0),
    });
  }
  lista.push({ id: "todo", nombre: PACK_TODO.nombre, slugs: [PACK_TODO.slug], total: usd(PACK_TODO) });
  return lista;
}

export default function ArmaSistema() {
  const { idioma } = useIdioma();
  const { agregar } = useCarrito();
  const [sel, setSel] = useState<string[]>(["rav-timer", "rav-remote", "rav-tune", "rav-bridge"]);
  const [agregado, setAgregado] = useState(false);

  const lista = useMemo(() => opciones(sel, idioma), [sel, idioma]);
  // La más barata; a igual precio gana la que trae más.
  const mejor = sel.length
    ? lista.reduce((a, b) => (b.total <= a.total ? b : a))
    : null;
  const ahorro = mejor ? lista[0].total - mejor.total : 0;
  const pesos = mejor
    ? mejor.slugs.reduce((n, s) => n + (precioPesos(porSlug(s)!) ?? 0), 0)
    : 0;

  const alternar = (slug: string) => {
    setAgregado(false);
    setSel((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  };

  return (
    <Seccion
      id="arma"
      titulo={TX.armaTuSistema[idioma]}
      bajada={TX.armaBajada[idioma]}
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        {/* Los dos bundles, con lo que traen y cuánto ahorran */}
        <div className="flex flex-col gap-4">
          {[PACK_SHOW, PACK_TODO].map((pk, i) => {
            const sueltos = pk.specs.find((x) => x.label === "Sueltos")?.valor;
            const ahorro = pk.specs.find((x) => x.label === "Ahorro")?.valor;
            return (
              <div key={pk.slug} data-entra style={{ ["--i" as string]: i }}>
                <Inclinable className="rounded-lg" grados={3}>
                <Link
                  href={`/store/${pk.slug}`}
                  className="block rounded-lg banda-alterna p-6"
                >
                  <span className="flex items-baseline justify-between gap-6">
                    <span className="text-[20px] font-bold tracking-[-0.01em]">{pk.nombre}</span>
                    <span className="shrink-0 text-[20px] font-bold tabular-nums">US$ {usd(pk)}</span>
                  </span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-muted-foreground">
                    {idioma === "en" && pk.resumenEn ? pk.resumenEn : pk.resumen}
                  </span>
                  {sueltos && ahorro && (
                    <span className="mt-3 block text-[15px] tabular-nums">
                      {TX.sueltosNombre[idioma]} {sueltos} · {TX.ahorras[idioma]} {ahorro}
                    </span>
                  )}
                </Link>
                </Inclinable>
              </div>
            );
          })}
        </div>

        <div>
          <div
            data-ui
            data-entra
            style={{ ["--i" as string]: 2 }}
            className="w-full rounded-lg banda-alterna p-6 md:p-8"
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-[20px] font-bold tracking-[-0.01em]">{TX.tuSistema[idioma]}</h3>
              <span className="tabular-nums text-[13px] text-muted-foreground">
                {sel.length} {TX.elegidos[idioma]}
              </span>
            </div>

            {FAMILIAS.map((f) => (
              <fieldset key={f.id} className="mt-6">
                <legend className="text-[13px] text-muted-foreground">{f.titulo[idioma]}</legend>
                <ul className="mt-2 grid gap-x-4 sm:grid-cols-2">
                  {f.productos.map((p) => {
                    const marcado = sel.includes(p.slug);
                    return (
                      <li key={p.slug}>
                        <label
                          className={cn(
                            "flex min-h-[44px] cursor-pointer items-center gap-3 rounded-md px-2 text-[17px] transition-colors hover:bg-background",
                            marcado ? "text-foreground" : "text-muted-foreground"
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={marcado}
                            onChange={() => alternar(p.slug)}
                            className="h-[18px] w-[18px] shrink-0 accent-[hsl(var(--foreground))]"
                          />
                          <span className="flex-1">{p.nombre.replace("RAV ", "")}</span>
                          <span className="tabular-nums text-[13px]">US$ {usd(p)}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>
            ))}

            <div className="mt-7 rounded-md bg-background p-4" aria-live="polite">
              {sel.length === 0 ? (
                <p className="text-[17px] text-muted-foreground">{TX.nadaElegido[idioma]}</p>
              ) : (
                <ul className="flex flex-col gap-1.5">
                  {lista.map((o) => {
                    const esMejor = mejor?.id === o.id;
                    return (
                      <li
                        key={o.id}
                        className={cn(
                          "flex items-baseline justify-between gap-4 text-[17px]",
                          esMejor ? "font-bold text-foreground" : "text-muted-foreground"
                        )}
                      >
                        <span>
                          {o.nombre}
                          {esMejor && (
                            <span className="ml-2 text-[13px] font-normal">· {TX.conviene[idioma]}</span>
                          )}
                        </span>
                        <span className="shrink-0 tabular-nums">US$ {o.total}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {mejor && (
              <p className="mt-5 tabular-nums">
                <span className="text-[28px] font-bold leading-none">
                  US$ <Contador valor={mejor.total} />
                </span>
                <span className="ml-3 text-[13px] text-muted-foreground">
                  ≈ $ {numero(pesos, idioma)}
                  {ahorro > 0 && ` · ${TX.ahorras[idioma]} US$ ${ahorro}`}
                </span>
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-5">
              <button
                type="button"
                disabled={!mejor}
                onClick={() => {
                  if (!mejor) return;
                  mejor.slugs.forEach((s) => agregar(s));
                  setAgregado(true);
                }}
                className="boton-rav w-full disabled:pointer-events-none disabled:opacity-40 sm:w-auto"
              >
                {agregado ? TX.agregadoAlCarrito[idioma] : TX.agregarAlCarrito[idioma]}
              </button>
              {agregado && (
                <Link
                  href="/carrito"
                  className="text-[17px] underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground"
                >
                  {TX.irAlCarrito[idioma]}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Seccion>
  );
}
