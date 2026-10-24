// Cliente mínimo de Mercado Pago vía REST. Sin SDK: menos dependencias
// y menos superficie que se rompa cuando cambian de versión.
//
// Variables de entorno necesarias (ver .env.example):
//   MP_ACCESS_TOKEN     — token privado, NUNCA con prefijo NEXT_PUBLIC_
//   MP_WEBHOOK_SECRET   — clave secreta del webhook
//   NEXT_PUBLIC_SITIO   — URL pública del sitio, para los back_urls

const API = "https://api.mercadopago.com";

function token() {
  const t = process.env.MP_ACCESS_TOKEN;
  if (!t) throw new Error("Falta MP_ACCESS_TOKEN en las variables de entorno");
  return t;
}

export function sitio() {
  return process.env.NEXT_PUBLIC_SITIO ?? "http://localhost:3000";
}

async function mp<T>(ruta: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${ruta}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  const cuerpo = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      `Mercado Pago ${res.status}: ${JSON.stringify(cuerpo).slice(0, 300)}`
    );
  }
  return cuerpo as T;
}

// ─── Pago único (Checkout Pro) ─────────────────────────────────────────

export type ItemPreferencia = {
  id: string;
  title: string;
  description?: string;
  quantity: number;
  unit_price: number;
  currency_id: "ARS";
  picture_url?: string;
};

export async function crearPreferencia(opts: {
  items: ItemPreferencia[];
  referencia: string;
  email?: string;
}) {
  return mp<{ id: string; init_point: string; sandbox_init_point: string }>(
    "/checkout/preferences",
    {
      method: "POST",
      body: JSON.stringify({
        items: opts.items,
        external_reference: opts.referencia,
        payer: opts.email ? { email: opts.email } : undefined,
        statement_descriptor: "RAV",
        back_urls: {
          success: `${sitio()}/gracias?estado=aprobado`,
          pending: `${sitio()}/gracias?estado=pendiente`,
          failure: `${sitio()}/gracias?estado=rechazado`,
        },
        auto_return: "approved",
        notification_url: `${sitio()}/api/webhooks/mercadopago`,
      }),
    }
  );
}

// ─── Consultas para el webhook ─────────────────────────────────────────

export type PagoMP = {
  id: number;
  status: string;
  status_detail: string;
  external_reference: string | null;
  transaction_amount: number;
  payer?: { email?: string };
};

export const obtenerPago = (id: string) => mp<PagoMP>(`/v1/payments/${id}`);
