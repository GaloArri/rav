# Revisión de interfaz — qué cambió en este fork

Revisión contra las **Web Interface Guidelines** de Vercel
(`vercel-labs/web-interface-guidelines`), medida después en un navegador real.

La consigna fue no tocar el diseño. **Las seis páginas principales salen
idénticas píxel por píxel** entre este fork y la versión original: mismo
layout, mismos colores, mismas tipografías, mismos tamaños. Lo que cambió es
lo que no se ve.

---

## Lo que se arregló

### Accesibilidad

`app/components/Header.tsx` — no había forma de saltear la navegación. Ahora
el primer Tab de cada página ofrece **"Saltar al contenido"**, invisible hasta
que recibe el foco. Los diez `<main>` del sitio llevan `id="contenido"`.

`app/globals.css` — faltaba `scroll-margin-top` en los títulos: un ancla
dejaba el encabezado tapado abajo de la barra fija de 68 px.

### Movimiento

Tres carruseles pasaban solos y no había manera de frenarlos. La WCAG pide un
control para cualquier cosa que se mueva sola más de cinco segundos al lado de
contenido que hay que leer.

    app/components/Carousel.tsx:24                 cada 6 s
    app/projects/components/ArtistCarousel.tsx:30  cada 4 s
    app/servicios/page.tsx:231                     cada 4 s

Los tres pasan ahora por `lib/movimiento.ts`, que los frena con el puntero
encima, con el foco adentro, con la pestaña en segundo plano, y no los arranca
nunca si el sistema pidió menos movimiento. Cuando nadie los está mirando
siguen pasando igual que antes.

`app/globals.css` — `prefers-reduced-motion` sólo lo respetaba el loop de
portada. Ahora lo respeta todo el sitio.

`transition: all` en seis lugares: el navegador tiene que vigilar cada
propiedad que pueda cambiar, y basta que una sea de layout para que el cuadro
salga caro. Reemplazado por la lista explícita.

    app/components/ThemeToggle.tsx:20,21          → transition-transform
    app/projects/components/ArtistCarousel.tsx:51 → transition-[opacity,transform]
    app/projects/page.tsx:84                      → transition-opacity
    app/servicios/page.tsx (varios)               → según el caso

### Áreas de toque

Los puntitos de los carruseles medían **6 px** en Servicios y 20 px de ancho
en la portada. El mínimo es 24 px, 44 en celular.

    app/servicios/page.tsx:130       6x6  → se dibuja igual, recibe el dedo en 24
    app/components/Carousel.tsx:89   20x44 → 44x44

Se resuelve con una clase (`.toque-24` / `.toque-44`) que agranda el área con
un pseudo-elemento. **El punto se sigue dibujando del mismo tamaño**; lo único
que crece es la zona que acepta el toque.

### Formularios

`app/contact/components/ContactForm.tsx:103,117` — los campos no tenían
`autocomplete`, así que el navegador no podía ofrecer los datos guardados, y
el de mail no tenía `inputMode` ni `spellCheck={false}` (el corrector subraya
las direcciones). Agregados, más `autocomplete="email"` y `spellCheck={false}`
en los otros dos campos de mail del sitio.

`app/contact/components/ContactForm.tsx:76` — el cartel de "mensaje enviado"
aparecía sin anunciarse. Ahora es `role="status"` con `aria-live="polite"`.

### Números

Quince lugares formateaban con `toLocaleString("es-AR")` fijo, así que en
inglés un precio salía `1.560.000` — que un angloparlante lee como mil quinientos
sesenta coma algo. `lib/formato.ts` lo resuelve con `Intl.NumberFormat` según
el idioma activo.

Los avisos internos (Telegram, mails a RAV, panel de pedidos) siguen en es-AR
a propósito: esos los leés vos, en Argentina.

El formateador vive en `lib/formato.ts` y no en `lib/idioma.tsx` por un motivo
que conviene no olvidar: `idioma.tsx` es `"use client"`, y `productos.ts` lo
importan las rutas de API y las páginas estáticas. Meterlo ahí arrastraba el
árbol del cliente al servidor.

### Estado en la URL

`app/store/components/Grid.tsx:174` — el filtro del store (Todo / Software /
Hardware / Taller) vivía en `useState`. No se podía compartir el link de una
categoría, el botón de atrás no volvía al filtro anterior y recargar te
devolvía a "Todo". Ahora va en la URL: `/store?ver=stock`.

### Tema y celular

`app/globals.css` — faltaban tres cosas que no se ven pero se notan:

- `color-scheme: dark` — sin esto los scrollbars y los campos nativos salen
  blancos arriba del negro.
- `touch-action: manipulation` — saca el retardo de 300 ms del doble-tap.
- `-webkit-tap-highlight-color` — el destello al tocar era el azul del
  sistema; ahora es del color de la página.

`overscroll-behavior: contain` en el visor de imágenes y en el cartel del
formulario: sin eso, al llegar al final del contenido el scroll se escapaba a
la página de atrás.

### Tipografía

`text-wrap: balance` en los títulos. No cambia el tamaño ni la fuente: reparte
el corte de línea para que no quede una palabra sola colgando.

---

## Lo que el inspector marca y dejé como está

El inspector de la skill de dirección de arte marca estas cosas. **Son tu
identidad, no errores**, y por eso no las toqué:

| Marca | Qué es en RAV |
| --- | --- |
| "12 etiquetas chicas en mayúsculas con tracking" | La clase `.etiqueta`. Es la serigrafía de los equipos: el sitio se ve como un rack porque las tiene. |
| "6 líneas finas" | `.regla-rack`. Lo mismo. |
| "1 gradiente" | La luz alta que le da de dónde reflejar al logo cromado, más el velo del loop. |
| "4 eyebrows 01 · 04" | La numeración del carrusel, que es un panel numerado a propósito. |
| "no hay h1 visible" | Hay `h1`, es `sr-only`: el título visible es el logo. Correcto para un lector de pantalla. |
| "sólo 2 elementos se mueven" | El sitio es sobrio a propósito. |

Dos que **sí** vale la pena que pienses, pero que cambian cómo se ve y por eso
no las toqué:

- **El splash de 700 ms** (`app/components/SplashScreen.tsx`). Tapa la página
  hasta un segundo en la primera visita y es lo que hace que el inspector diga
  que el título no se lee a los 1,2 s. Lo que gana en entrada lo paga en la
  métrica que Google mira. Sólo aparece una vez por sesión.
- **Texto de 10 px** en la tira de estado y el pie. El piso recomendado es 13.

Y una decisión de producto, no de diseño: en el carrito, **"Quitar" borra sin
preguntar y sin deshacer**. La guía pide confirmación o una ventana de undo
para cualquier acción destructiva. Agregarlo suma un control a la interfaz, así
que lo dejo a tu criterio.

---

## Cómo comparar

Este fork está armado para poder verlo al lado del original. Levantá los dos
en puertos distintos y abrilos en dos pestañas:

    npm run dev          # en la carpeta original, puerto 3000
    npm run dev -- -p 3001   # en esta, puerto 3001

Build verificado: compila limpio, 50 páginas, sin errores de consola, y el
barrido de traducciones sigue dando cero castellano suelto en la versión en
inglés.
