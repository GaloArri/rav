import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Cada segmento del store es un bloque propio, de lado a lado, con su fondo
 * y el mismo encabezado: título a la izquierda, datos a la derecha, bajada
 * abajo. Los fondos se alternan para que se vea dónde termina uno y empieza
 * el siguiente.
 */
export type Tono = "base" | "alterno" | "hueso";

export default function Seccion({
  id,
  tono = "base",
  titulo,
  datos,
  led,
  bajada,
  children,
  className,
  compacta,
}: {
  id: string;
  tono?: Tono;
  titulo: ReactNode;
  datos?: ReactNode;
  /** Un LED antes de los datos: late si se entrega ya, fijo si hay stock, apagado si se cotiza */
  led?: "late" | "fijo" | "apagado";
  bajada?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Menos aire arriba y abajo, para que el bloque entre en una pantalla */
  compacta?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`t-${id}`}
      className={cn(
        tono === "alterno" && "banda-alterna",
        tono === "hueso" && "bg-senal text-background",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-screen-xl px-4 md:px-8",
          compacta ? "py-16 md:py-20" : "py-20 md:py-28"
        )}
      >
        <header className={compacta ? "mb-8 md:mb-10" : "mb-12 md:mb-16"}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h2
              id={`t-${id}`}
              data-entra
              className="text-[28px] font-black uppercase leading-none tracking-[-0.025em] md:text-[32px]"
            >
              {titulo}
            </h2>
            {datos && (
              <p
                className={cn(
                  "flex items-center gap-2.5 text-[15px] tabular-nums",
                  tono === "hueso" ? "text-background/70" : "text-muted-foreground"
                )}
              >
                {led && (
                  <span aria-hidden="true" className={led === "late" ? "led led-late" : led === "fijo" ? "led" : "led-apagado"} />
                )}
                {datos}
              </p>
            )}
          </div>
          {bajada && (
            <p
              data-entra
              style={{ ["--i" as string]: 1 }}
              className={cn(
                "mt-4 max-w-[60ch] text-[17px] leading-relaxed",
                tono === "hueso" ? "text-background/80" : "text-muted-foreground"
              )}
            >
              {bajada}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
