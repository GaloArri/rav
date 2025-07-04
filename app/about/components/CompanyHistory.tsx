import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const hitos = [
  { year: 2010, event: "Fundación de Rav en un pequeño taller" },
  {
    year: 2015,
    event: "Lanzamiento de nuestra plataforma de comercio electrónico",
  },
  { year: 2018, event: "Expansión a mercados internacionales" },
  {
    year: 2020,
    event: "Presentación de nuestra línea de productos sostenibles",
  },
  { year: 2023, event: "Alcanzamos 1 millón de clientes satisfechos" },
];

export default function CompanyHistory() {
  return (
    <section className="py-16 bg-gradient-to-br from-muted/30 to-muted/60">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Nuestra Historia</h2>
        </div>
        <div className="max-w-3xl mx-auto relative">
          <div className="space-y-0 relative z-10">
            {hitos.map((hito, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-b-0 last:border-b rounded-none first:rounded-t-lg last:rounded-b-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="outline"
                      className="text-lg font-bold px-4 py-2 flex-shrink-0"
                    >
                      {hito.year}
                    </Badge>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {hito.event}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}