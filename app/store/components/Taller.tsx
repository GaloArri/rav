"use client";

import Link from "next/link";
import Image from "next/image";
import { porSlug, type Producto } from "@/lib/productos";
import { SEGMENTOS } from "@/lib/segmentos";
import { consultaProducto } from "@/lib/tienda";
import { useIdioma } from "@/lib/idioma";
import Seccion from "./Seccion";
import { Inclinable } from "./Efectos";
import { TX } from "./textos";

const PEDIDO = SEGMENTOS[2];

/** Lo que se hace a pedido: tres trabajos lado a lado. */
export default function Taller() {
  const { idioma } = useIdioma();
  const trabajos = PEDIDO.familias[0].slugs
    .map((s) => porSlug(s))
    .filter((p): p is Producto => Boolean(p));

  return (
    <Seccion
      id="pedido"
      tono="alterno"
      led="apagado"
      titulo={PEDIDO.encabezado[idioma]}
      datos={`${trabajos.length} ${TX.trabajos[idioma]} · ${PEDIDO.entrega[idioma]}`}
      bajada={PEDIDO.bajada[idioma]}
    >
      <div className="grid gap-14 md:grid-cols-3 md:gap-8">
        {trabajos.map((p, i) => (
          <article
            key={p.slug}
            aria-labelledby={`t-${p.slug}`}
            data-entra
            style={{ ["--i" as string]: i }}
            className="flex flex-col"
          >
            <Inclinable className="rounded-lg" grados={4}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={p.imagenes[0]}
                alt={p.nombre}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="foto-viva object-cover"
              />
            </div>
            </Inclinable>
            <h3 id={`t-${p.slug}`} className="mt-5 text-[20px] font-bold tracking-[-0.01em]">
              {p.nombre}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              {idioma === "en" && p.resumenEn ? p.resumenEn : p.resumen}
            </p>
            <dl className="mt-4 flex flex-col gap-2">
              {p.specs.slice(0, 3).map((s) => (
                <div key={s.label} className="text-[15px] leading-snug">
                  <dt className="inline font-bold">
                    {idioma === "en" && s.labelEn ? s.labelEn : s.label}:{" "}
                  </dt>
                  <dd className="inline">{idioma === "en" && s.valorEn ? s.valorEn : s.valor}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto flex flex-wrap items-center gap-5 pt-6">
              <a href={consultaProducto(p.nombre)} className="boton-rav">
                {TX.pedirCotizacion[idioma]}
              </a>
              <Link
                href={`/store/${p.slug}`}
                className="text-[15px] underline decoration-muted-foreground/50 underline-offset-4 transition-colors hover:decoration-foreground"
              >
                {TX.verFichaPedido[idioma]}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Seccion>
  );
}
