"use client";

import Image from "next/image";
import { useIdioma } from "@/lib/idioma";

const FOTOS = [
  "/images/about/foto-21.webp",
  "/images/about/foto-23.webp",
  "/images/about/foto-34.webp",
];

export default function AboutUs() {
  const { t } = useIdioma();

  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat py-24"
      style={{ backgroundImage: "url('/images/about/rav.webp')" }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="space-y-8">
            <div className="flex min-h-[20rem] flex-col items-center justify-center space-y-6 text-center">
              <div className="flex flex-1 flex-col justify-center">
                <h1 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  {t("sobreNosotros")}
                </h1>
                <div className="max-w-3xl space-y-4 text-white/90">
                  {["about1", "about2", "about3", "about4"].map((clave) => (
                    <p key={clave} className="text-base leading-relaxed md:text-lg">
                      {t(clave)}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="my-12 flex items-center justify-center">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="mx-4 h-3 w-3 rounded-full bg-white" />
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>

            {/* El tema se resuelve con clases, nunca en JS (ver CLAUDE.md) */}
            <div className="mt-0 grid grid-cols-1 gap-6 rounded-xl border border-white/40 bg-white/25 p-8 backdrop-blur-sm md:grid-cols-3 dark:border-black/50 dark:bg-black/30">
              {FOTOS.map((src, i) => (
                <div key={src} className="flex w-full justify-center">
                  <Image
                    src={src}
                    alt={`${t("fotoTaller")} ${i + 1}`}
                    width={320}
                    height={200}
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="h-48 w-full rounded-lg object-cover shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
