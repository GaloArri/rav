import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "@/components/ui/button";
import { PRODUCTOS, porSlug } from "@/lib/productos";
import { INSTALACION, DUDAS_COMUNES, porDoc } from "@/lib/docs";
import { SOPORTE_MAIL } from "@/lib/tienda";

type Props = { params: { producto: string } };

export function generateStaticParams() {
  return PRODUCTOS.filter((p) => p.linea === "software" && !p.incluye).map((p) => ({
    producto: p.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = porSlug(params.producto);
  if (!p) return { title: "Documentación" };
  return {
    title: `${p.nombre} · Documentación`,
    description: `Cómo instalar y usar el ${p.nombre}.`,
  };
}

export default function DocPage({ params }: Props) {
  const p = porSlug(params.producto);
  if (!p || p.linea !== "software") return notFound();

  const doc = porDoc(p.slug);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <div className="mx-auto max-w-screen-xl px-4 pb-20 md:px-8">

          <p className="flex flex-wrap items-center gap-2 py-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <Link href="/store" className="transition-colors hover:text-foreground">
              Store
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <Link href={`/store/${p.slug}`} className="transition-colors hover:text-foreground">
              {p.nombre}
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-foreground">Documentación</span>
          </p>

          {/* Encabezado */}
          <div className="flex flex-wrap items-end gap-8 border-b pb-10">
            <div className="min-w-0 flex-[1_1_380px]">
              <p className="etiqueta mb-3">Documentación</p>
              <h1 className="titulo-grande text-[36px] md:text-[48px]">{p.nombre}</h1>
              {doc && (
                <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
                  {doc.para}
                </p>
              )}
            </div>
            <div className="min-w-0 flex-[1_1_300px] overflow-hidden rounded-lg border bg-placa">
              <Image
                src={p.imagenes[0]}
                alt={p.nombre}
                width={1800}
                height={430}
                sizes="(max-width: 1024px) 100vw, 480px"
                className="h-auto w-full"
                priority
              />
            </div>
          </div>

          {!doc ? (
            <p className="py-16 text-muted-foreground">
              La documentación de este device todavía no está escrita. Escribinos a{" "}
              {SOPORTE_MAIL} y te ayudamos.
            </p>
          ) : (
            <div className="flex flex-wrap gap-12 py-12 lg:gap-16">

              {/* Columna principal */}
              <div className="min-w-0 flex-[999_1_480px]">

                <Bloque titulo="Instalación">
                  <ol className="space-y-6">
                    {INSTALACION.map((paso, i) => (
                      <li key={paso.titulo} className="flex gap-5">
                        <span className="dato shrink-0 pt-0.5 text-sm text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-[15px] font-bold">{paso.titulo}</h3>
                          <p className="mt-1 max-w-[62ch] text-[15px] leading-relaxed text-muted-foreground">
                            {paso.texto}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </Bloque>

                <Bloque titulo="Cómo se usa">
                  <ol className="space-y-6">
                    {doc.uso.map((paso, i) => (
                      <li key={paso.titulo} className="flex gap-5">
                        <span className="dato shrink-0 pt-0.5 text-sm text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-[15px] font-bold">{paso.titulo}</h3>
                          <p className="mt-1 max-w-[62ch] text-[15px] leading-relaxed text-muted-foreground">
                            {paso.texto}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </Bloque>

                <Bloque titulo="Cuando algo no anda">
                  <dl className="border-t">
                    {[...doc.dudas, ...DUDAS_COMUNES].map((d) => (
                      <div key={d.pregunta} className="border-b py-5">
                        <dt className="text-[15px] font-bold">{d.pregunta}</dt>
                        <dd className="mt-1.5 max-w-[62ch] text-[15px] leading-relaxed text-muted-foreground">
                          {d.respuesta}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Bloque>
              </div>

              {/* Costado */}
              <aside className="min-w-0 flex-[1_1_280px]">
                <div className="rounded-lg border bg-card p-6">
                  <p className="etiqueta mb-4">Dónde va</p>
                  <p className="text-sm leading-relaxed">{doc.dondeVa}</p>

                  {doc.enCarpeta && (
                    <p className="mt-4 flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <span className="led-alerta mt-[7px]" aria-hidden="true" />
                      <span>
                        Viene en carpeta. Los archivos que están al lado del .amxd
                        tienen que quedar siempre con él.
                      </span>
                    </p>
                  )}

                  {p.requisitos && (
                    <>
                      <p className="etiqueta mb-3 mt-7">Requisitos</p>
                      <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                        {p.requisitos.map((r) => (
                          <li key={r} className="flex gap-2.5">
                            <span className="led-apagado mt-[7px]" aria-hidden="true" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div className="mt-7 border-t pt-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      ¿No lo resolvés? Escribinos y lo vemos.
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="mt-4 w-full font-mono text-[12px] uppercase tracking-[0.14em]"
                    >
                      <a href={`mailto:${SOPORTE_MAIL}?subject=${encodeURIComponent(p.nombre)}`}>
                        {SOPORTE_MAIL}
                      </a>
                    </Button>
                  </div>
                </div>

                <Button
                  asChild
                  variant="ghost"
                  className="mt-3 w-full font-mono text-[12px] uppercase tracking-[0.14em]"
                >
                  <Link href={`/store/${p.slug}`}>Volver al producto</Link>
                </Button>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mb-14 last:mb-0">
      <div className="regla-rack mb-7">
        <span className="etiqueta">{titulo}</span>
      </div>
      {children}
    </section>
  );
}
