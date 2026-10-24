"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useIdioma } from "@/lib/idioma";

/**
 * El bloque de marca: el logo cromado como objeto, una frase corta y la
 * tira de estado con los LEDs, que es lo que explica de qué se trata la
 * empresa antes de que nadie lea nada.
 */
export default function LandingPage() {
  const { t } = useIdioma();

  return (
    <section className="border-b" aria-labelledby="marca">
      <div className="relative overflow-hidden">
        {/* El rack armándose, atrás de todo. Va desenfocado a propósito:
            se tiene que leer como movimiento, no como un video. Sólo en
            oscuro, que es donde el render sobre negro pega con el fondo. */}
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
          {/* Lo apaga contra el negro para que el logo y el texto respiren */}
          <span className="loop-velo" />
        </div>

        {/* Luz alta, para que el cromo tenga de dónde reflejar */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-100"
          style={{
            background:
              "radial-gradient(760px 340px at 50% 0%, hsl(220 8% 45% / 0.22), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-screen-xl px-4 py-20 text-center md:px-8 md:py-28">
          <p className="etiqueta mb-10 !tracking-[0.26em]">
            {t("rubro")}
          </p>

          <Image
            src="/assets/rav-3d.webp"
            alt="RAV"
            width={900}
            height={475}
            sizes="(max-width: 768px) 60vw, 300px"
            className="objeto-3d mx-auto h-auto w-[180px] md:w-[280px] dark:brightness-100 brightness-0"
          />

          <h1 id="marca" className="sr-only">
            RAV
          </h1>

          <p className="mx-auto mt-10 max-w-[52ch] text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("bajadaMarca")}
          </p>

          <div className="mt-9 flex justify-center">
            <Button
              asChild
              size="lg"
              className="h-12 px-7 font-mono text-[12px] uppercase tracking-[0.14em]"
            >
              <Link href="/about">{t("masSobreNosotros")}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Tira de estado, como la de los devices */}
      <div className="border-t bg-card">
        <dl className="mx-auto grid max-w-screen-xl grid-cols-2 px-4 md:grid-cols-4 md:px-8">
          <Estado etiqueta={t("playback")} valor="A/B" />
          <Estado etiqueta={t("sincro")} valor="00:21:36" />
          <Estado etiqueta={t("autotune")} valor="C · Mayor" />
          <Estado etiqueta={t("resta")} valor="00:50:45" alerta />
        </dl>
      </div>
    </section>
  );
}

function Estado({
  etiqueta,
  valor,
  alerta,
}: {
  etiqueta: string;
  valor: string;
  alerta?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-3 border-b py-4 pr-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:py-5 [&:nth-child(2)]:border-l md:[&:nth-child(2)]:border-l-0 [&:nth-last-child(-n+2)]:border-b-0">
      <span
        className={alerta ? "led-alerta" : "led"}
        style={{ transform: "translateY(-2px)" }}
        aria-hidden="true"
      />
      <dt className="etiqueta !text-[10px]">{etiqueta}</dt>
      <dd className="dato ml-auto text-sm">{valor}</dd>
    </div>
  );
}
