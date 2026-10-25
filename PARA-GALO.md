# rav.ar — cambios para subir

Esta carpeta es el proyecto completo, listo para reemplazar el contenido del
repo `GaloArri/rav`. No incluye `node_modules`, `.next` ni `.env.local`.

El repo está en `43af587` ("arreglos en fotos", julio 2025) y no tiene ramas
nuevas. **Antes de sobrescribir, confirmá que no haya commits posteriores.**
Si aparece algo nuevo, avisá antes de pisarlo.

## Cómo subirlo

```bash
git clone https://github.com/GaloArri/rav.git rav-repo
cd rav-repo
git checkout -b estetica-nueva

# borrar lo viejo salvo .git, y copiar esta carpeta adentro
find . -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R /ruta/a/esta/carpeta/. .

npm install
npx next build          # tiene que pasar antes de pushear
git add -A
git commit -m "nueva identidad visual, catálogo completo del store, docs por device y ES/EN"
git push -u origin estetica-nueva
```

Vercel va a generar una preview de la rama. Una vez revisada, merge a `main`
y se publica en rav.ar.

## Qué cambió

**Identidad visual.** Todo el sistema está en `app/globals.css`: tokens HSL,
negro real (`0 0% 2%`) en oscuro, acento hueso, radios de 2 px y las clases
`.etiqueta`, `.regla-rack`, `.dato`, `.led`, `.titulo-grande`, `.objeto-3d`.
Tipografía **Chivo + Chivo Mono** por `next/font/google` en `app/layout.tsx`.

Dos reglas que conviene no romper al tocar el look:

- **El tema se resuelve con clases CSS, nunca en JS.** Nada de
  `tema === "dark" ? "a" : "b"`; va `"b dark:a"`. Antes se hacía en JS y el
  modo claro quedaba roto.
- **Nada arranca invisible.** No usar `opacity-0` esperando un
  IntersectionObserver: si el JS no corre, la sección queda en blanco.

Reescritos: `Header.tsx` (barra de 68 px, reemplaza el banner con foto),
`LandingPage.tsx` (ahora client component, va antes del carrusel),
`Carousel.tsx`, `Footer.tsx`.

**Loop de portada.** `public/video/rav-portada.{mp4,webm,webp}`, 1440×810,
detrás del logo, desenfocado y al 32 % de opacidad. Sólo en modo oscuro. El
`.webp` es el póster y también el cuadro fijo para
`prefers-reduced-motion`.

**Catálogo del store.** `lib/productos.ts` tiene los 25 productos con
descripciones largas, specs, precios y los dos packs. Software en USD,
hardware en ARS; la conversión sale de la constante `DOLAR` (hoy en 1560) con
`precioPesos()`. Las capturas reales de las interfaces están en
`public/images/products/`.

**Documentación por device.** Nuevo: `lib/docs.ts` (instalación, uso y dudas
comunes de los 10 devices) y `app/soporte/[producto]/page.tsx` que lo
renderiza.

**Castellano / inglés.** Nuevo: `lib/idioma.tsx` (contexto + diccionario +
localStorage, override por `?idioma=en`), `app/components/Texto.tsx` y
`app/components/BotonIdioma.tsx`. Las páginas que son server component
traducen a través de esos componentes chicos.

## Cambios de esta tanda (25-10)

- **Castellano / inglés completo.** Antes el chip ES/EN sólo daba vuelta la
  interfaz; ahora también la documentación de los diez devices, las specs y
  los requisitos de cada producto, y los textos de Servicios y Proyectos.
  La convención del sufijo `En` está explicada en `CLAUDE.md`.
- **Se arregló el visor de imágenes de Servicios.** Al clickear una foto se
  abría sin la lista de imágenes: no se veía nada y la página quedaba trabada
  porque el `overflow: hidden` del body ya estaba puesto. Las dos copias del
  visor (Servicios y Proyectos) se unificaron en
  `app/components/VisorImagenes.tsx`.
- Se sacó **Nosotros** del header y **Soporte** del footer.
- En Contacto quedó **un solo teléfono**.
- Menores: ids duplicados en `servicios.json` (daban keys repetidas en React),
  la fila de guiones que se veía como descripción de 13 artistas, un
  `console.log` por paso en el formulario de contacto, una decisión de tema en
  JS en Nosotros (iba con clases `dark:`), y el verde del descuento por
  transferencia, que no va con la identidad nueva.

## Pendiente antes de poder vender

Las variables del store no están en el repo. Hacen falta en Vercel:
`MP_ACCESS_TOKEN`, `MP_WEBHOOK_SECRET`, `SUPABASE_URL`,
`SUPABASE_SERVICE_KEY`, `RESEND_API_KEY`, `MAIL_ADMIN`, `ADMIN_USER`,
`ADMIN_PASS`. Están listadas en `.env.example`.

Además falta llenar el campo `descarga` de los 10 devices en
`lib/productos.ts`: hoy está vacío, así que una compra se cobra y el cliente
no recibe el archivo.

El resto de los pendientes está en `CLAUDE.md`.
