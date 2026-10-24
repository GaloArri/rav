# Probar los avisos de venta

El bot de Telegram ya está configurado en `.env.local`. Para probarlo:

1. Abrí el chat con **raver** en Telegram y tocá Iniciar (o mandale `/start`).
   Telegram no deja que un bot te escriba si nunca le hablaste.
2. Levantá el sitio: `npm install` y después `npm run dev`.
3. Entrá a `localhost:3000/store`, agregá algo al carrito.
4. En el carrito, elegí **Pagar por transferencia**.
5. El aviso te llega al celular en el momento.

Si no llega, revisá el paso 1: es la causa más común.

## Cuando publiques en Vercel

Las variables de `.env.local` no se suben a GitHub, así que hay que cargarlas
a mano en Vercel: **Settings → Environment Variables**. Copiá las mismas dos
de Telegram, y cambiá `NEXT_PUBLIC_SITIO` por la URL real del sitio.
