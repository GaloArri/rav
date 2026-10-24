import { listarPedidos } from "@/lib/pedidos";

export const dynamic = "force-dynamic";

const COLOR: Record<string, string> = {
  aprobado: "text-emerald-500",
  pendiente: "text-amber-500",
  rechazado: "text-destructive",
};

export default async function PedidosPage() {
  const pedidos = await listarPedidos();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold">Pedidos</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {pedidos.length} registrados. Se actualiza solo cuando Mercado Pago confirma.
      </p>

      {pedidos.length === 0 ? (
        <p className="mt-10 text-muted-foreground">
          Todavía no hay pedidos, o falta configurar Supabase.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground border-b">
              <tr>
                <th className="py-2 pr-4 font-medium">Fecha</th>
                <th className="py-2 pr-4 font-medium">Referencia</th>
                <th className="py-2 pr-4 font-medium">Cliente</th>
                <th className="py-2 pr-4 font-medium">Estado</th>
                <th className="py-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 pr-4 whitespace-nowrap text-muted-foreground">
                    {new Date(p.creado_en).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs">{p.referencia}</td>
                  <td className="py-3 pr-4">{p.email ?? "—"}</td>
                  <td className={`py-3 pr-4 ${COLOR[p.estado] ?? ""}`}>
                    {p.estado.replace("_", " ")}
                  </td>
                  <td className="py-3 text-right tabular-nums">
                    $ {Number(p.total).toLocaleString("es-AR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
