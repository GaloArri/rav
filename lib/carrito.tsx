"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { porSlug, precioPesos, type Producto } from "./productos";

const CLAVE = "rav-carrito";

export type ItemCarrito = { slug: string; cantidad: number };

type CarritoCtx = {
  items: ItemCarrito[];
  productos: { producto: Producto; cantidad: number }[];
  total: number;
  unidades: number;
  agregar: (slug: string, cantidad?: number) => void;
  quitar: (slug: string) => void;
  cambiarCantidad: (slug: string, cantidad: number) => void;
  vaciar: () => void;
  listo: boolean;
};

const Ctx = createContext<CarritoCtx | null>(null);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [listo, setListo] = useState(false);

  // Cargar de localStorage al montar
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE);
      if (guardado) setItems(JSON.parse(guardado));
    } catch {
      // storage bloqueado o JSON corrupto: arrancamos vacíos
    }
    setListo(true);
  }, []);

  // Persistir en cada cambio
  useEffect(() => {
    if (!listo) return;
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items));
    } catch {
      // sin storage el carrito vive sólo en memoria
    }
  }, [items, listo]);

  const agregar = (slug: string, cantidad = 1) =>
    setItems((prev) => {
      const existe = prev.find((i) => i.slug === slug);
      if (existe) {
        return prev.map((i) =>
          i.slug === slug ? { ...i, cantidad: i.cantidad + cantidad } : i
        );
      }
      return [...prev, { slug, cantidad }];
    });

  const quitar = (slug: string) =>
    setItems((prev) => prev.filter((i) => i.slug !== slug));

  const cambiarCantidad = (slug: string, cantidad: number) =>
    setItems((prev) =>
      cantidad <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, cantidad } : i))
    );

  const vaciar = () => setItems([]);

  const productos = useMemo(
    () =>
      items
        .map((i) => {
          const producto = porSlug(i.slug);
          return producto ? { producto, cantidad: i.cantidad } : null;
        })
        .filter((x): x is { producto: Producto; cantidad: number } => x !== null),
    [items]
  );

  const total = useMemo(
    () =>
      productos.reduce(
        (acc, { producto, cantidad }) => acc + (precioPesos(producto) ?? 0) * cantidad,
        0
      ),
    [productos]
  );

  const unidades = useMemo(
    () => items.reduce((acc, i) => acc + i.cantidad, 0),
    [items]
  );

  return (
    <Ctx.Provider
      value={{
        items,
        productos,
        total,
        unidades,
        agregar,
        quitar,
        cambiarCantidad,
        vaciar,
        listo,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCarrito() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return ctx;
}
