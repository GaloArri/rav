# Cómo poner el store a cobrar

Todo el flujo ya está programado. Falta conectarlo con tus cuentas.

## 1. Mercado Pago

1. Entrá a [mercadopago.com.ar/developers](https://www.mercadopago.com.ar/developers) con tu cuenta.
2. Creá una aplicación (tipo: Checkout Pro).
3. En **Credenciales de producción** copiá el *Access Token* → va en `MP_ACCESS_TOKEN`.
4. En **Webhooks > Configurar notificaciones**:
   - URL: `https://rav.ar/api/webhooks/mercadopago`
   - Eventos: **Pagos**
   - Revelá la **clave secreta** → va en `MP_WEBHOOK_SECRET`

> Probá primero con las credenciales de *prueba* y las tarjetas de test que
> te da Mercado Pago. Recién después pasá a producción.

## 2. Variables en Vercel

Copiá `.env.example` a `.env.local` para desarrollo. Para producción,
cargalas en Vercel: **Settings > Environment Variables**. Después de
agregarlas hay que hacer un nuevo deploy para que tomen efecto.

## 3. Supabase (opcional pero recomendado)

Sin esto el checkout funciona, pero no te queda registro de los pedidos.
En el SQL Editor de tu proyecto:

```sql
create table pedidos (
  id          bigserial primary key,
  referencia  text unique not null,
  estado      text not null default 'pendiente',
  total       numeric not null default 0,
  email       text,
  items       jsonb,
  pago_id     text,
  creado_en   timestamptz not null default now()
);

-- Sólo el servidor escribe acá. Nada de acceso público.
alter table pedidos enable row level security;
```

La `SUPABASE_SERVICE_KEY` es la *service role key*. Es privada y saltea RLS:
nunca la expongas en el cliente.

## Cómo funciona

**Pago único.** El carrito manda los slugs al servidor. El servidor busca los
precios en `lib/productos.ts` — nunca confía en el precio que manda el navegador,
que es la parte que evita que alguien edite el HTML y pague dos pesos. Se crea la
preferencia, se guarda el pedido como `pendiente` y se redirige a Mercado Pago.

**Confirmación.** Mercado Pago avisa por webhook. Se valida la firma HMAC, se
consulta el pago real contra la API y ahí se actualiza el estado del pedido.
La confirmación nunca sale de la URL de retorno, que es falsificable.

## Transferencia bancaria

Segundo método de pago, sin pasarela ni comisión. El cliente elige transferencia
en el carrito, se reserva el pedido como `pendiente`, te llega el aviso por
Telegram y se le muestran alias, CBU y total con descuento. Confirmás vos a mano
cuando llega el comprobante.

Los datos están en `lib/tienda.ts`, en `TRANSFERENCIA`, y apuntan a la cuenta
de Lemon. El descuento es configurable ahí mismo.

Antes de despachar, verificá en la app que el dinero esté acreditado. El
comprobante que manda el cliente no alcanza: se falsifica fácil.

## Lo que falta

- Los precios en `lib/productos.ts` están marcados con `TODO`. Definilos.
- El número de WhatsApp en `lib/tienda.ts` está en cero.
- El envío del mail con el link de descarga: está marcado con un `TODO` en
  `app/api/webhooks/mercadopago/route.ts`. Necesita una cuenta de Resend o similar.
- Cálculo de costo de envío. Hoy se coordina a mano después de la compra.
