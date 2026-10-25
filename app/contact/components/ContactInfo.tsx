"use client";

import { Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useIdioma } from "@/lib/idioma";

/** Mail y un solo teléfono. El dato no se traduce; el rótulo sí. */
const DATOS = [
  { icon: Mail, clave: "mail", detalle: "informacion@rav.ar" },
  { icon: Phone, clave: "telefono", detalle: "+54 9 280 486-3492" },
];

export default function ContactInfo() {
  const { t } = useIdioma();

  return (
    <div className="space-y-6">
      {DATOS.map(({ icon: Icono, clave, detalle }) => (
        <Card key={clave} className="transition-shadow duration-300 hover:shadow-md">
          <CardContent className="flex items-start space-x-4 p-6">
            <Icono className="mt-1 h-6 w-6 text-primary" />
            <div>
              <h3 className="mb-2 font-semibold">{t(clave)}</h3>
              <p className="text-muted-foreground">{detalle}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
