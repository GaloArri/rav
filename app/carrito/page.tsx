"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCarrito } from "@/lib/carrito";
import { precioPesos } from "@/lib/productos";
import Transferencia from "../components/Transferencia";

export default function CarritoPage() {
  const { productos, total, cambiarCantidad, quitar, vaciar, listo } = useCarrito();
  const [email, setEmail] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pagar() {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: productos.map(({ producto, cantidad }) => ({
            slug: producto.slug,
            cantidad,
          })),
          email: email || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al iniciar el pago");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error inesperado");
      setCargando(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-2xl mx-auto px-4 py-10 md:py-14">
          <h1 className="text-3xl font-semibold tracking-tight">Carrito</h1>

          {!listo ? (
            <p className="mt-8 text-muted-foreground">Cargando…</p>
          ) : productos.length === 0 ? (
            <div className="mt-8">
              <p className="text-muted-foreground">Todavía no agregaste nada.</p>
              <Button asChild className="mt-4">
                <Link href="/store">Ver el store</Link>
              </Button>
            </div>
          ) : (
            <>
              <ul className="mt-8 divide-y border-t border-b">
                {productos.map(({ producto, cantidad }) => (
                  <li key={producto.slug} className="flex gap-4 py-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-muted">
                      <Image
                        src={producto.imagenes[0]}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-grow min-w-0">
                      <Link
                        href={`/store/${producto.slug}`}
                        className="font-medium hover:underline underline-offset-4"
                      >
                        {producto.nombre}
                      </Link>
                      <p className="text-sm text-muted-foreground tabular-nums">
                        $ {(precioPesos(producto) ?? 0).toLocaleString("es-AR")} c/u
                      </p>

                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() =>
                              cambiarCantidad(producto.slug, cantidad - 1)
                            }
                            className="px-3 py-1 hover:bg-muted"
                            aria-label={`Quitar una unidad de ${producto.nombre}`}
                          >
                            −
                          </button>
                          <span className="px-3 tabular-nums text-sm">{cantidad}</span>
                          <button
                            onClick={() =>
                              cambiarCantidad(producto.slug, cantidad + 1)
                            }
                            className="px-3 py-1 hover:bg-muted"
                            aria-label={`Agregar una unidad de ${producto.nombre}`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => quitar(producto.slug)}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>

                    <p className="shrink-0 tabular-nums">
                      $ {((precioPesos(producto) ?? 0) * cantidad).toLocaleString("es-AR")}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex justify-between text-lg">
                <span>Total</span>
                <span className="tabular-nums font-medium">
                  $ {total.toLocaleString("es-AR")}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                El costo de envío se calcula en el paso siguiente. Retiro en el taller
                sin cargo.
              </p>

              <div className="mt-8 space-y-3">
                <label htmlFor="email" className="block text-sm font-medium">
                  ¿A qué dirección te escribimos?
                </label>
                <p id="ayuda-email-carrito" className="text-xs text-muted-foreground">
                  Ahí te llega el comprobante y, si comprás software, el link de
                  descarga.
                </p>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  aria-describedby="ayuda-email-carrito"
                  placeholder="nombre@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button className="w-full" onClick={pagar} disabled={cargando}>
                  {cargando ? "Redirigiendo a Mercado Pago…" : "Pagar con Mercado Pago"}
                </Button>

                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <p className="text-xs text-muted-foreground">
                  Tarjeta de crédito, débito, dinero en cuenta o efectivo.
                </p>

                <div className="flex items-center gap-3 py-2">
                  <span className="h-px flex-grow bg-border" />
                  <span className="text-xs text-muted-foreground">o</span>
                  <span className="h-px flex-grow bg-border" />
                </div>

                <Transferencia
                  items={productos.map(({ producto, cantidad }) => ({
                    slug: producto.slug,
                    cantidad,
                  }))}
                  total={total}
                  email={email}
                  onReservado={vaciar}
                />
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
