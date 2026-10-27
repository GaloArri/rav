import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  PRODUCTOS,
  porSlug,
  precioEquivalente,
  precioPesos,
  expandir,
  type Producto,
} from "@/lib/productos";
import { familiaDe, segmentoDe } from "@/lib/segmentos";
import { consultaProducto, SOPORTE_MAIL } from "@/lib/tienda";
import BotonAgregar from "../components/BotonAgregar";
import BotonComprarYa from "../components/BotonComprarYa";
import Movimiento from "../components/Movimiento";
import Texto, {
  Bilingue,
  Descripcion,
  Precio,
  PrecioEquivalente,
} from "../../components/Texto";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return PRODUCTOS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = porSlug(params.slug);
  if (!p) return { title: "Producto no encontrado" };
  return {
    title: p.nombre,
    description: p.resumen,
    openGraph: {
      title: `${p.nombre} | RAV`,
      description: p.resumen,
      images: p.fotoPendiente ? undefined : [{ url: p.imagenes[0] }],
    },
  };
}

/** Sin foto todavía: el nombre y los datos principales, sobre la placa. */
function PlacaSinFoto({ p }: { p: Producto }) {
  return (
    <div className="flex aspect-[4/3] flex-col justify-between rounded-lg bg-card p-8 md:p-12">
      <p className="max-w-[12ch] text-[28px] font-black uppercase leading-[0.95] tracking-[-0.03em] md:text-[36px]">
        {p.nombre.replace(/^RAV /, "")}
      </p>
      <dl className="flex flex-col gap-2.5">
        {p.specs.slice(0, 3).map((s) => (
          <div key={s.label} className="text-[17px] leading-snug">
            <dt className="inline text-muted-foreground">
              <Bilingue es={s.label} en={s.labelEn} />:{" "}
            </dt>
            <dd className="inline">
              <Bilingue es={s.valor} en={s.valorEn} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function ProductoPage({ params }: Props) {
  const p = porSlug(params.slug);
  if (!p) return notFound();

  const segmento = segmentoDe(p.linea);
  const ubicacion = familiaDe(p.slug);
  const esSoftware = p.linea === "software";
  const hermanos = (ubicacion?.familia.slugs ?? [])
    .filter((s) => s !== p.slug)
    .map((s) => porSlug(s))
    .filter((x): x is Producto => Boolean(x));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="contenido" className="flex-grow">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          {/* Miga de pan */}
          <nav aria-label="Miga de pan" className="py-6 text-[13px] text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/store" className="transition-colors hover:text-foreground">
                  Store
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/store#${segmento.id}`}
                  className="transition-colors hover:text-foreground"
                >
                  <Bilingue es={segmento.titulo.es} en={segmento.titulo.en} />
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">
                {p.nombre}
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap gap-10 pb-28 lg:gap-16">
            {/* Imágenes */}
            <div className="flex min-w-0 flex-[999_1_480px] flex-col gap-3">
              {p.fotoPendiente ? (
                <PlacaSinFoto p={p} />
              ) : (
                p.imagenes.map((src, i) =>
                  esSoftware ? (
                    <div
                      key={src}
                      data-entra
                      style={{ ["--i" as string]: Math.min(i, 3) }}
                      className="overflow-hidden rounded-lg placa-store p-3 md:p-5"
                    >
                      <Image
                        src={src}
                        alt={i === 0 ? p.nombre : ""}
                        width={1800}
                        height={600}
                        sizes="(max-width: 1024px) 100vw, 760px"
                        className="h-auto w-full"
                        priority={i === 0}
                      />
                    </div>
                  ) : (
                    <div
                      key={src}
                      className={
                        p.linea === "stock"
                          ? "relative aspect-square overflow-hidden rounded-lg bg-white"
                          : "relative aspect-[4/5] overflow-hidden rounded-lg bg-card"
                      }
                    >
                      <Image
                        src={src}
                        alt={i === 0 ? p.nombre : ""}
                        fill
                        sizes="(max-width: 1024px) 100vw, 760px"
                        className={p.linea === "stock" ? "object-contain p-6" : "object-cover"}
                        priority={i === 0}
                      />
                    </div>
                  )
                )
              )}
            </div>

            {/* Compra */}
            <div className="min-w-0 flex-[1_1_340px]">
              <div className="lg:sticky lg:top-[96px]">
                <p className="text-[13px] text-muted-foreground">
                  <Bilingue es={segmento.entrega.es} en={segmento.entrega.en} />
                  {ubicacion && (
                    <>
                      {" · "}
                      <Bilingue es={ubicacion.familia.titulo.es} en={ubicacion.familia.titulo.en} />
                    </>
                  )}
                </p>

                <h1 className="titulo-grande mt-3 text-[32px] md:text-[40px]">{p.nombre}</h1>
                <p className="mt-5 text-[17px] leading-relaxed">
                  <Bilingue es={p.resumen} en={p.resumenEn} />
                </p>

                <div className="mt-8 rounded-lg bg-card p-6">
                  <p className="text-[32px] font-bold leading-none tabular-nums">
                    <Precio p={p} />
                  </p>
                  {precioEquivalente(p) && (
                    <p className="mt-2 text-[13px] text-muted-foreground tabular-nums">
                      <PrecioEquivalente p={p} /> · <Texto clave="seCobraEnPesos" />
                    </p>
                  )}

                  <div className="mt-6 space-y-2">
                    {esSoftware ? (
                      <>
                        <BotonComprarYa slug={p.slug} precioARS={precioPesos(p) ?? 0} />
                        {p.docs && (
                          <Link
                            href={p.docs}
                            className="block pt-3 text-center text-[17px] underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground"
                          >
                            <Texto clave="verDocumentacion" />
                          </Link>
                        )}
                      </>
                    ) : p.linea === "stock" && precioPesos(p) ? (
                      <BotonAgregar slug={p.slug} nombre={p.nombre} />
                    ) : (
                      <a href={consultaProducto(p.nombre)} className="boton-rav w-full">
                        <Texto clave="pedirCotizacion" />
                      </a>
                    )}
                  </div>

                  <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
                    <Texto
                      clave={
                        esSoftware ? "trasPagarSoftware" : p.linea === "stock" ? "envios" : "antesDeArrancar"
                      }
                    />
                    {esSoftware ? ` ${SOPORTE_MAIL}` : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Qué trae, sólo en los packs */}
          {p.incluye && (
            <section aria-labelledby="t-trae" className="pb-28">
              <h2 id="t-trae" data-entra className="text-2xl font-bold tracking-[-0.02em]">
                <Texto clave="queTrae" />
              </h2>
              <ul className="mt-6 grid gap-x-10 md:grid-cols-2">
                {expandir([p.slug]).map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/store/${d.slug}`}
                      className="fila-viva flex min-h-[64px] items-start justify-between gap-6 rounded-lg px-3 py-3 hover:bg-card"
                    >
                      <span>
                        <span className="block text-[17px] font-bold">{d.nombre}</span>
                        <span className="mt-0.5 block text-[17px] leading-snug text-muted-foreground">
                          <Bilingue es={d.resumen} en={d.resumenEn} />
                        </span>
                      </span>
                      <span className="shrink-0 text-[17px] tabular-nums">
                        <Precio p={d} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Qué es + detalle */}
          <div className="flex flex-wrap gap-14 pb-28 lg:gap-20">
            <section aria-labelledby="t-que-es" className="min-w-0 flex-[999_1_440px]">
              <h2 id="t-que-es" data-entra className="mb-6 text-2xl font-bold tracking-[-0.02em]">
                <Texto clave="queEs" />
              </h2>
              <Descripcion es={p.descripcion} en={p.descripcionEn} />
            </section>

            <section aria-labelledby="t-detalle" className="min-w-0 flex-[1_1_320px]">
              <h2 id="t-detalle" data-entra className="mb-6 text-2xl font-bold tracking-[-0.02em]">
                <Texto clave="detalle" />
              </h2>
              {/* Una tabla de verdad: acá las líneas ordenan la lectura */}
              <dl className="border-t">
                {p.specs.map((s) => (
                  <div key={s.label} className="flex justify-between gap-6 border-b py-3 text-[15px]">
                    <dt className="text-muted-foreground">
                      <Bilingue es={s.label} en={s.labelEn} />
                    </dt>
                    <dd className="text-right">
                      <Bilingue es={s.valor} en={s.valorEn} />
                    </dd>
                  </div>
                ))}
                {p.version && (
                  <div className="flex justify-between gap-6 border-b py-3 text-[15px]">
                    <dt className="text-muted-foreground">
                      <Texto clave="version" />
                    </dt>
                    <dd className="text-right tabular-nums">{p.version}</dd>
                  </div>
                )}
              </dl>

              {p.requisitos && (
                <>
                  <h2 className="mb-4 mt-12 text-2xl font-bold tracking-[-0.02em]">
                    <Texto clave="requisitos" />
                  </h2>
                  <ul className="list-disc space-y-2 pl-5 text-[17px] leading-relaxed marker:text-muted-foreground">
                    {p.requisitos.map((r, i) => (
                      <li key={r}>
                        <Bilingue es={r} en={p.requisitosEn?.[i]} />
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          </div>

          {/* Lo demás de la misma familia */}
          {ubicacion && hermanos.length > 0 && (
            <section aria-labelledby="t-familia" className="pb-28">
              <h2 id="t-familia" data-entra className="text-2xl font-bold tracking-[-0.02em]">
                <Bilingue es={ubicacion.familia.titulo.es} en={ubicacion.familia.titulo.en} />
              </h2>
              <ul className="mt-6 grid gap-x-10 md:grid-cols-2">
                {hermanos.map((h) => (
                  <li key={h.slug}>
                    <Link
                      href={`/store/${h.slug}`}
                      className="fila-viva flex min-h-[64px] items-start justify-between gap-6 rounded-lg px-3 py-3 hover:bg-card"
                    >
                      <span>
                        <span className="block text-[17px] font-bold">{h.nombre}</span>
                        <span className="mt-0.5 block text-[17px] leading-snug text-muted-foreground">
                          <Bilingue es={h.resumen} en={h.resumenEn} />
                        </span>
                      </span>
                      <span className="shrink-0 text-[17px] tabular-nums">
                        <Precio p={h} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/store#${segmento.id}`}
                className="mt-8 inline-block text-[17px] underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground"
              >
                <Bilingue es="Ver toda la sección" en="See the whole section" /> →
              </Link>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <Movimiento />
    </div>
  );
}
