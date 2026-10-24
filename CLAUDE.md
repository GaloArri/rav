# RAV — contexto del proyecto

Este archivo lo lee Claude Code automáticamente al abrir el repo.
Mantenelo actualizado cuando cambien las decisiones de fondo.

## Qué es

Sitio de RAV, empresa de proveeduría de sistemas de playback y proceso
vocal (autotune) para shows en vivo. Next.js 14 (App Router), TypeScript,
Tailwind y shadcn/ui. Deploy en Vercel.

El sitio ya existía con las secciones Inicio, Servicios, Proyectos y
Nosotros. Lo que se sumó es el **store**.

## El store

Tres líneas de producto, divididas por cómo se entrega cada cosa:

- **software** — diez devices de Max for Live. Descarga inmediata.
  El **RAV Timer** es la base del sistema: lee el Set y levanta una página web
  en la red local, puerto 8097. Los módulos no tienen interfaz propia: con sólo
  estar cargados en el Set habilitan partes de esa misma página.
  **RAV Remote** habilita PLAY/PAUSE y el salto de tema; **RAV Tune**, la
  pantalla de Auto-Tune; **RAV Bridge**, los valores reales del Auto-Tune;
  **RAV Full Setlist**, la lista real de temas. Los controles los ve sólo quien
  entra con el rol PLAYBACK. **RAV LTC**, **RAV CDJ**, **RAV QC Preset**,
  **RAV SPD Kit** y **RAV Bypass** son independientes del Timer.
  Textos tomados del documento "Plug-ins RAV para Ableton Live" (21-10-2026).
- **stock** — hardware y accesorios. Precio en ARS, envío 48/72 h, se paga online.
- **pedido** — trabajos de taller (cables a medida, piezas 3D, racks).
  No se paga online: se cotiza por mail.

### Archivos clave

    lib/productos.ts      catálogo de productos (fuente de verdad)
    lib/carrito.tsx       contexto del carrito, persiste en localStorage
    lib/mercadopago.ts    cliente REST de MP (sin SDK, a propósito)
    lib/pedidos.ts        persistencia en Supabase vía REST
    lib/notificaciones.ts avisos: Telegram para el dueño, mail para el cliente
    lib/descargas.ts      links de descarga firmados con HMAC, vencen a 7 días
    lib/tienda.ts         mail de soporte, CVU y descuento por transferencia

    app/store/            listado (grilla) + ficha por slug
    app/carrito/          carrito y disparo del checkout
    app/gracias/          retorno desde MP (NO confirma nada)
    app/admin/pedidos/    panel de pedidos, protegido por middleware
    app/api/checkout/     crea la preferencia de pago
    app/api/webhooks/     confirma pagos (única fuente de verdad del estado)
    app/api/descarga/     valida el link firmado y redirige al archivo

### Reglas que no se rompen

1. **Los precios salen del servidor, nunca del cliente.** El carrito manda
   slugs; `app/api/checkout` busca los precios en `lib/productos.ts`.
2. **El estado de un pedido sólo lo cambia el webhook**, con firma validada
   y consultando el pago contra la API de MP. La página `/gracias` es
   cosmética: la URL la puede escribir cualquiera.
3. **El webhook siempre responde 200**, incluso ante un error interno. Si
   devuelve error, Mercado Pago reintenta en loop.
4. **Un aviso que falla no rompe un pago.** Telegram y Resend se tragan sus
   errores.
5. `MP_ACCESS_TOKEN` y `SUPABASE_SERVICE_KEY` son privadas. Nunca con
   prefijo `NEXT_PUBLIC_`.

## Documentación de los devices

`lib/docs.ts` tiene, para cada uno de los diez: para qué sirve, dónde va en
el Set, los pasos de uso y las dudas frecuentes. La instalación y tres dudas
que son iguales para todos están aparte, en `INSTALACION` y `DUDAS_COMUNES`,
para no repetirlas device por device. `app/soporte/[producto]` las arma.
Todo sale del documento de octubre y de las capturas: no agregar
comportamiento que no esté ahí.

## Idioma y tema

- **Castellano e inglés.** `lib/idioma.tsx` tiene el diccionario y el contexto;
  el chip ES/EN está en el header, igual al de los devices. Se guarda en
  localStorage y se puede forzar con `?idioma=en`, que sirve para compartir
  el sitio en inglés con un link. Las páginas de servidor usan `<Texto
  clave="..." />` o `<Bilingue es="..." en="..." />` de `app/components/Texto.tsx`.
  Los productos tienen `resumenEn`; las descripciones largas todavía están
  sólo en castellano.
- **Claro y oscuro con clases, nunca con JavaScript.** Nada de
  `currentTheme === "dark" ? "A" : "B"`: va `"B dark:A"`. Si el tema se
  decide en JS, una copia estática del sitio queda con un solo tema y la
  página depende de que hidrate para verse bien.
- **Nada arranca invisible.** No usar `opacity-0` esperando que un
  IntersectionObserver lo revele: si el JS no corre, la sección se ve
  vacía. Pasó en Servicios y se sacó.

## Convenciones

- Tipografía: **Chivo** (Google Fonts, de Omnibus-Type, argentina), cargada con
  `next/font/google` en `app/layout.tsx` y expuesta como `--font-chivo` en Tailwind.
- Todo el texto de cara al usuario en **castellano rioplatense** (vos, no tú).
- Nombres de variables y funciones en castellano, sin acentos.
- Imágenes: siempre `next/image` **con `sizes`**. Sin `sizes` Next sirve la
  versión más grande del set y en celular baja imágenes de 2000 px.
- `priority` sólo en la primera imagen visible de cada página. Ponérselo a
  todo equivale a no ponérselo a nada.
- El layout raíz es **server component**. No agregarle `"use client"`:
  eso arrastra todo el árbol al cliente.
- Todas las imágenes de `/public` son WebP, máximo 2000 px de ancho. El
  script está en `scripts/optimize-images.py`.

## Estado y pendientes

Hecho: optimización de imágenes (153 MB → 15 MB), metadata y Open Graph,
layout como server component, splash acortado a 700 ms, store con grilla,
carrito, checkout, webhook, avisos y panel de pedidos.

Pendiente, por orden de urgencia:

**Para publicar**
- [ ] Conectar GitHub a Claude, o correr `SUBIR-A-LA-WEB.command`. La carpeta
      no tiene `.git`, así que nada de esto está en línea todavía. El commit
      ya está armado y verificado (compila: 52 páginas).

**Para poder cobrar**
- [ ] `MP_ACCESS_TOKEN` y `MP_WEBHOOK_SECRET`: sin esto el botón de comprar
      no hace nada
- [ ] `SUPABASE_URL` y `SUPABASE_SERVICE_KEY`: sin esto no se guarda el pedido
- [ ] `RESEND_API_KEY` y `MAIL_ADMIN`: el aviso por Telegram ya anda, el mail
      al cliente no
- [ ] `ADMIN_USER` y `ADMIN_PASS`: hoy `/admin` devuelve 503
- [ ] Crear las casillas hola@rav.ar y soporte@rav.ar (sugerido: Cloudflare
      Email Routing)
- [ ] Llenar el campo `descarga` de los diez devices: hoy alguien podría
      pagar y no recibir el archivo
- [ ] Definir el esquema de licencia (existe el RAV Activador, falta decidir
      cómo se emite el serial)
- [ ] Confirmar qué dólar usar; `DOLAR` en `lib/tienda.ts` está fijo en 1560
- [ ] Cálculo del costo de envío (hoy se coordina a mano)

**Contenido**
- [ ] Fotos de siete equipos de hardware (el Talkback.LTC Reader ya tiene)
- [ ] Qué es el MIDI Controller SHULY.01 y qué es el GuitarSupportCase
- [ ] Números de versión reales de los diez devices
- [ ] Entrega real del hardware: hoy dice "se arma en el taller", sin plazo
- [ ] El catálogo de equipamiento de la página Servicios
- [ ] Fotos de la sección Nosotros
- [ ] Decidir si entran al store: AB Monitor, Connection Monitor, File Check,
      Ficha Técnica y KPA

## Puesta en marcha

Ver `COMPRAS.md` para conectar Mercado Pago, Supabase, Telegram y Resend.
Las variables están listadas en `.env.example`.

## Decisiones descartadas

- **Abono mensual / planes de suscripción.** Estuvo implementado (página
  `/planes` + preapproval de Mercado Pago) y se sacó entero en octubre 2026:
  no encaja con cómo se vende. No reintroducir sin que Juan lo pida.

## Fotos de producto

El hardware va sobre fondo blanco, cuadrado, 1200x1200. La foto del
Talkback.LTC Reader se armó recortando el equipo a mano con un polígono
(el fondo era una plancha de corte gris oscuro y los modelos de recorte
automático se la llevaban puesta), corrigiendo brillo y contraste y
apoyándolo sobre una sombra elíptica difusa.
