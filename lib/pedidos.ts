// Persistencia de pedidos en Supabase vía REST.
// Si las variables no están configuradas, el pedido se registra en el log
// del servidor y el checkout sigue funcionando igual.
//
// Tabla esperada (SQL en COMPRAS.md):
//   pedidos(id, referencia, estado, total, email, items jsonb, pago_id, creado_en)

export type Pedido = {
  referencia: string;
  estado: "pendiente" | "aprobado" | "rechazado";
  total: number;
  email?: string;
  items?: unknown;
  pago_id?: string;
};

function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  return url && key ? { url, key } : null;
}

export async function guardarPedido(pedido: Pedido) {
  const cfg = config();
  if (!cfg) {
    console.log("[pedido sin persistir]", pedido);
    return;
  }

  const res = await fetch(`${cfg.url}/rest/v1/pedidos`, {
    method: "POST",
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify(pedido),
  });

  if (!res.ok) {
    console.error("[error guardando pedido]", res.status, await res.text());
  }
}

export async function actualizarPedido(
  referencia: string,
  cambios: Partial<Pedido>
) {
  const cfg = config();
  if (!cfg) {
    console.log("[pedido sin persistir]", referencia, cambios);
    return;
  }

  const res = await fetch(
    `${cfg.url}/rest/v1/pedidos?referencia=eq.${encodeURIComponent(referencia)}`,
    {
      method: "PATCH",
      headers: {
        apikey: cfg.key,
        Authorization: `Bearer ${cfg.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cambios),
    }
  );

  if (!res.ok) {
    console.error("[error actualizando pedido]", res.status, await res.text());
  }
}

export function nuevaReferencia() {
  const fecha = new Date();
  const dia = fecha.toISOString().slice(2, 10).replace(/-/g, "");
  const azar = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `RAV-${dia}-${azar}`;
}

export async function leerPedido(referencia: string) {
  const cfg = config();
  if (!cfg) return null;

  const res = await fetch(
    `${cfg.url}/rest/v1/pedidos?referencia=eq.${encodeURIComponent(referencia)}&select=*`,
    {
      headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;
  const filas = (await res.json()) as (Pedido & { creado_en: string })[];
  return filas[0] ?? null;
}

export async function listarPedidos(limite = 100) {
  const cfg = config();
  if (!cfg) return [];

  const res = await fetch(
    `${cfg.url}/rest/v1/pedidos?select=*&order=creado_en.desc&limit=${limite}`,
    {
      headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
      cache: "no-store",
    }
  );

  if (!res.ok) return [];
  return (await res.json()) as (Pedido & { id: number; creado_en: string })[];
}
