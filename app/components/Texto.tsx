"use client";

import { useIdioma } from "@/lib/idioma";

/** Un texto del diccionario, para usar adentro de páginas de servidor. */
export default function Texto({ clave }: { clave: string }) {
  const { t } = useIdioma();
  return <>{t(clave)}</>;
}

/** Un par de textos ya escritos, cuando no vale la pena una clave. */
export function Bilingue({ es, en }: { es: string; en?: string }) {
  const { idioma } = useIdioma();
  return <>{idioma === "en" && en ? en : es}</>;
}

/** La descripción larga, partida en párrafos, en el idioma que corresponda. */
export function Descripcion({ es, en }: { es: string; en?: string }) {
  const { idioma } = useIdioma();
  const texto = idioma === "en" && en ? en : es;

  return (
    <>
      {texto
        .split("\n")
        .filter(Boolean)
        .map((parrafo, i) => (
          <p key={i} className="mb-4 max-w-[64ch] text-[17px] leading-[1.65] last:mb-0">
            {parrafo}
          </p>
        ))}
    </>
  );
}
