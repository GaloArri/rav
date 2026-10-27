// Formato de números e idioma, sin React: lo importan tanto el servidor
// (rutas de API, páginas estáticas) como el cliente. Si esto viviera en
// lib/idioma.tsx, que es "use client", arrastraría el árbol del cliente a
// cualquier módulo de servidor que lo toque.

export type Idioma = "es" | "en";

/** Los separadores de miles cambian: 1.560.000 en castellano, 1,560,000 en inglés. */
const LOCALE: Record<Idioma, string> = { es: "es-AR", en: "en-US" };

export function numero(n: number, idioma: Idioma = "es") {
  return new Intl.NumberFormat(LOCALE[idioma]).format(n);
}
