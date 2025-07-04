import { Badge } from "@/components/ui/badge"

const allArtists = [
  // Artistas destacados (ya mostrados arriba)
  { name: "Duki", featured: true },
  { name: "Bizarrap", featured: true },
  { name: "Trueno", featured: true },
  { name: "Nicki Nicole", featured: true },
  { name: "Maria Becerra", featured: true },


  // Artistas adicionales
   { name: "Tiago PZK", featured: false },
    { "name": "KHEA", "featured": false },
    { "name": "YSY A", "featured": false },
    { "name": "Lit Killah", "featured": false },
    { "name": "FMK", "featured": false },
    { "name": "L-Gante", "featured": false },
    { "name": "Neo Pistea", "featured": false },
    { "name": "Bhavi", "featured": false },
    { "name": "Rusherking", "featured": false },
    { "name": "Ecko", "featured": false },
    { "name": "Dillom", "featured": false },
    { "name": "Paco Amoroso", "featured": false },
    { "name": "Ca7riel", "featured": false },
    { "name": "Zaramay", "featured": false }
  ]

export default function AllArtistsList() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Lista de artistas en columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allArtists.map((artist, index) => (
          <div
            key={index}
            className={`group relative p-4 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              artist.featured
                ? "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/40 hover:border-primary/60 hover:shadow-primary/20"
                : "bg-gradient-to-br from-card/50 to-card/30 border-border/40 hover:border-border/60 backdrop-blur-sm"
            }`}
          >
            {/* Indicador visual para destacados */}
            {artist.featured && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            )}

            <div className="space-y-2">
              <h4
                className={`font-semibold text-sm leading-tight ${
                  artist.featured ? "text-primary" : "text-foreground"
                } group-hover:text-primary transition-colors duration-300`}
              >
                {artist.name}
              </h4>
              <div className="flex items-center justify-between">
                {artist.featured && <span className="text-xs text-primary/70 font-medium">Destacado</span>}
              </div>
            </div>

            {/* Línea decorativa inferior */}
            <div
              className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 ${
                artist.featured ? "bg-primary" : "bg-border"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}
