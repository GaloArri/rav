"use client"

import { Badge } from "@/components/ui/badge"

const allArtists = [
  // Artistas destacados (ya mostrados arriba)
  { name: "Banda Sinfónica", genre: "Clásica", featured: true },
  { name: "Los Rockeros", genre: "Rock", featured: true },
  { name: "DJ Max", genre: "Electrónica", featured: true },
  { name: "Jazz Quartet", genre: "Jazz", featured: true },
  { name: "Grupo Folklórico", genre: "Folklórica", featured: true },
  { name: "Pop Band", genre: "Pop", featured: true },

  // Artistas adicionales
  { name: "María González", genre: "Solista", featured: false },
  { name: "Trío Acústico", genre: "Acústica", featured: false },
  { name: "Los Cumbieros", genre: "Cumbia", featured: false },
  { name: "Banda de Metal", genre: "Metal", featured: false },
  { name: "Coro Gospel", genre: "Gospel", featured: false },
  { name: "DJ Luna", genre: "House", featured: false },
  { name: "Orquesta Tango", genre: "Tango", featured: false },
  { name: "Grupo Reggae", genre: "Reggae", featured: false },
  { name: "Los Blueseros", genre: "Blues", featured: false },
  { name: "Banda Country", genre: "Country", featured: false },
  { name: "Ensamble Clásico", genre: "Clásica", featured: false },
  { name: "DJ Techno", genre: "Techno", featured: false },
  { name: "Grupo Salsa", genre: "Salsa", featured: false },
  { name: "Los Funkeros", genre: "Funk", featured: false },
  { name: "Coro Infantil", genre: "Infantil", featured: false },
  { name: "Banda Indie", genre: "Indie", featured: false },
  { name: "Trío Bolero", genre: "Bolero", featured: false },
  { name: "Los Raperos", genre: "Hip Hop", featured: false },
  { name: "Grupo Bossa Nova", genre: "Bossa Nova", featured: false },
  { name: "DJ Ambient", genre: "Ambient", featured: false },
  { name: "Banda Punk", genre: "Punk", featured: false },
  { name: "Orquesta Sinfónica", genre: "Sinfónica", featured: false },
  { name: "Los Trovadores", genre: "Trova", featured: false },
  { name: "Grupo Experimental", genre: "Experimental", featured: false },
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
                <Badge
                  variant={artist.featured ? "default" : "secondary"}
                  className={`text-xs px-2 py-1 ${
                    artist.featured ? "bg-primary/20 text-primary border-primary/30" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {artist.genre}
                </Badge>
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

      {/* Contador total con mejor diseño */}
      <div className="text-center mt-12">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-muted/50 to-muted/30 rounded-full border border-border/50">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <p className="text-sm text-muted-foreground">
            Total de colaboraciones: <span className="font-bold text-primary text-base">{allArtists.length}</span>{" "}
            artistas
          </p>
          <div className="w-2 h-2 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
