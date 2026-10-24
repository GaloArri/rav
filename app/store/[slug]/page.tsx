import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "@/components/ui/button";
import {
  PRODUCTOS,
  porSlug,
  precioTexto,
  precioEquivalente,
  precioPesos,
  LINEAS,
  expandir,
} from "@/lib/productos";
import { consultaProducto, SOPORTE_MAIL } from "@/lib/tienda";
import BotonAgregar from "../components/BotonAgregar";
import BotonComprarYa from "../components/BotonComprarYa";
import Texto, { Bilingue, Descripcion } from "../../components/Texto";

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
      images: [{ url: p.imagenes[0] }],
    },
  };
}

export default function ProductoPage({ params }: Props) {
  const p = porSlug(params.slug);
  if (!p) return notFound();

  const linea = LINEAS[p.linea];
  const esSoftware = p.linea === "software";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <div className="mx-auto max-w-screen-xl px-4 pb-20 md:px-8">

          {/* Miga de pan, en mono */}
          <p className="flex flex-wrap items-center gap-2 py-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <Link href="/store" className="transition-colors hover:text-foreground">
              Store
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <span>{linea.titulo}</span>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-foreground">{p.nombre}</span>
          </p>

          <div className="flex flex-wrap gap-10 border-b pb-14 lg:gap-14">

            {/* Imágenes */}
            <div className="flex min-w-0 flex-[999_1_480px] flex-col gap-3">
              {p.imagenes.map((src, i) =>
                esSoftware ? (
                  <div key={src} className="overflow-hidden rounded-lg border bg-placa">
                    <Image
                      src={src}
                      alt={i === 0 ? p.nombre : ""}
                      width={1800}
                      height={430}
                      sizes="(max-width: 1024px) 100vw, 760px"
                      className="h-auto w-full"
                      priority={i === 0}
                    />
                  </div>
                ) : (
                  <div
                    key={src}
                    className="relative aspect-square overflow-hidden rounded-lg border bg-white"
                  >
                    <Image
                      src={src}
                      alt={i === 0 ? p.nombre : ""}
                      fill
                      sizes="(max-width: 1024px) 100vw, 760px"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                )
              )}
            </div>

            {/* Compra */}
            <div className="min-w-0 flex-[1_1_320px]">
              <p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-senal">
                <span className={esSoftware ? "led" : "led-apagado"} aria-hidden="true" />
                <span className={esSoftware ? "" : "text-muted-foreground"}>
                  <Texto clave={esSoftware ? "descargaInmediata" : p.linea === "stock" ? "seArma" : "seCotiza"} />
                </span>
              </p>

              <h1 className="titulo-grande text-[36px] md:text-[44px]">{p.nombre}</h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                <Bilingue es={p.resumen} en={p.resumenEn} />
              </p>

              <div className="mt-7 rounded-lg border bg-card p-6">
                <p className="dato text-[38px] leading-none">{precioTexto(p)}</p>
                {precioEquivalente(p) && (
                  <p className="dato mt-2 text-xs text-muted-foreground">
                    {precioEquivalente(p)} · <Texto clave="seCobraEnPesos" />
                  </p>
                )}

                <div className="mt-6 space-y-2">
                  {esSoftware ? (
                    <>
                      <BotonComprarYa slug={p.slug} precioARS={precioPesos(p) ?? 0} />
                      {p.docs && (
                        <Button asChild variant="outline" className="w-full font-mono text-[12px] uppercase tracking-[0.14em]">
                          <Link href={p.docs}><Texto clave="verDocumentacion" /></Link>
                        </Button>
                      )}
                    </>
                  ) : p.linea === "stock" && precioPesos(p) ? (
                    <BotonAgregar slug={p.slug} nombre={p.nombre} />
                  ) : (
                    <Button asChild className="w-full font-mono text-[12px] uppercase tracking-[0.14em]">
                      <a href={consultaProducto(p.nombre)}><Texto clave="pedirCotizacion" /></a>
                    </Button>
                  )}
                </div>

                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
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

          {/* Qué trae, sólo en los packs */}
          {p.incluye && (
            <section className="border-b py-12">
              <p className="etiqueta mb-5"><Texto clave="queTrae" /></p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {expandir([p.slug]).map((d) => (
                  <Link
                    key={d.slug}
                    href={`/store/${d.slug}`}
                    className="rounded-lg border p-4 transition-colors hover:border-muted-foreground/50"
                  >
                    <h3 className="text-[15px] font-bold">{d.nombre}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      <Bilingue es={d.resumen} en={d.resumenEn} />
                    </p>
                    <span className="dato mt-3 block text-sm">{precioTexto(d)}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Qué es + detalle */}
          <div className="flex flex-wrap gap-12 py-12 lg:gap-16">
            <div className="min-w-0 flex-[999_1_440px]">
              <p className="etiqueta mb-5"><Texto clave="queEs" /></p>
              <Descripcion es={p.descripcion} en={p.descripcionEn} />
            </div>

            <div className="min-w-0 flex-[1_1_300px]">
              <p className="etiqueta mb-5"><Texto clave="detalle" /></p>
              <dl className="border-t">
                {p.specs.map((s) => (
                  <div key={s.label} className="flex justify-between gap-5 border-b py-2.5 text-[13px]">
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd className="text-right">{s.valor}</dd>
                  </div>
                ))}
                {p.version && (
                  <div className="flex justify-between gap-5 border-b py-2.5 text-[13px]">
                    <dt className="text-muted-foreground"><Texto clave="version" /></dt>
                    <dd className="dato text-right">{p.version}</dd>
                  </div>
                )}
              </dl>

              {p.requisitos && (
                <>
                  <p className="etiqueta mb-4 mt-9"><Texto clave="requisitos" /></p>
                  <ul className="space-y-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    {p.requisitos.map((r) => (
                      <li key={r} className="flex gap-2.5">
                        <span className="led-apagado mt-[7px]" aria-hidden="true" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
