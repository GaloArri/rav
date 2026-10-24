// Avisos de compra: a vos por Telegram, al cliente por mail.
//
// Todo es opcional: si falta una variable de entorno, ese canal se saltea
// y el resto sigue funcionando. Un aviso que falla nunca debe romper un pago.

type DatosPedido = {
  referencia: string;
  total: number;
  email?: string;
  items: { title: string; quantity: number }[];
  pagoId?: string;
};

/** Fecha y hora en horario argentino, para los avisos. */
export function ahora() {
  return new Date().toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Telegram: el aviso instantáneo para vos ───────────────────────────

export async function avisarPorTelegram(texto: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chat,
        text: texto,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
  } catch (e) {
    console.error("[telegram]", e);
  }
}

export function avisoVenta(p: DatosPedido) {
  const lista = p.items
    .map((i) => `• ${i.quantity}× ${i.title}`)
    .join("\n");

  return [
    "🟢 <b>Venta confirmada</b>",
    ahora(),
    "",
    lista,
    "",
    `<b>Total: $ ${p.total.toLocaleString("es-AR")}</b>`,
    p.email ? `Cliente: ${p.email}` : null,
    `Pedido: <code>${p.referencia}</code>`,
    "Cobrado por Mercado Pago.",
  ]
    .filter(Boolean)
    .join("\n");
}

// ─── Mail al cliente (Resend) ──────────────────────────────────────────

export async function enviarMail(opts: {
  para: string;
  asunto: string;
  html: string;
}) {
  const key = process.env.RESEND_API_KEY;
  const desde = process.env.MAIL_DESDE ?? "RAV <hola@rav.ar>";
  if (!key) {
    console.log("[mail sin enviar]", opts.para, opts.asunto);
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: desde,
        to: [opts.para],
        subject: opts.asunto,
        html: opts.html,
      }),
    });
    if (!res.ok) console.error("[resend]", res.status, await res.text());
  } catch (e) {
    console.error("[resend]", e);
  }
}

export function mailCompra(p: DatosPedido, descargas: { nombre: string; url: string }[]) {
  const filas = p.items
    .map(
      (i) =>
        `<tr><td style="padding:6px 0">${i.quantity}× ${i.title}</td></tr>`
    )
    .join("");

  const bloqueDescargas = descargas.length
    ? `<h3 style="margin:24px 0 8px;font-size:15px">Tus descargas</h3>
       <p style="margin:0 0 12px;color:#666;font-size:13px">
         Los links vencen en 7 días. Si se te pasa, escribinos y te los renovamos.
       </p>
       ${descargas
         .map(
           (d) =>
             `<p style="margin:0 0 8px"><a href="${d.url}" style="color:#111">${d.nombre}</a></p>`
         )
         .join("")}`
    : `<p style="margin:24px 0 0;color:#666;font-size:14px">
         Te escribimos en las próximas horas para coordinar el envío.
       </p>`;

  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#111">
    <h1 style="font-size:20px;margin:0 0 4px">Gracias por tu compra</h1>
    <p style="margin:0 0 24px;color:#666;font-size:14px">Pedido ${p.referencia}</p>
    <table style="width:100%;border-top:1px solid #eee;border-bottom:1px solid #eee;font-size:14px">
      ${filas}
    </table>
    <p style="margin:16px 0 0;font-size:15px"><strong>Total: $ ${p.total.toLocaleString("es-AR")}</strong></p>
    ${bloqueDescargas}
    <p style="margin:32px 0 0;color:#666;font-size:13px">
      Cualquier duda respondé este mail o escribinos a soporte@rav.ar.<br>RAV
    </p>
  </div>`;
}

/** Copia del aviso de venta a tu propia casilla, si configuraste MAIL_ADMIN. */
export async function avisarPorMail(asunto: string, texto: string) {
  const destino = process.env.MAIL_ADMIN;
  if (!destino) return;

  await enviarMail({
    para: destino,
    asunto,
    html: `<pre style="font-family:ui-monospace,monospace;font-size:14px;white-space:pre-wrap">${texto}</pre>`,
  });
}
