import { cn } from "@/lib/utils"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import artistsData from "../data/artists.json"
import ArtistCarousel from "./components/ArtistCarousel"

export default function ArtistsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-muted/30 to-background">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <Badge variant="secondary" className="mb-4">
                Nuestros Colaboradores
              </Badge>
              <h1 className="text-3xl font-bold mb-3">Artistas Destacados</h1>
              <p className="text-muted-foreground text-sm">
                Descubre los talentosos artistas con los que hemos tenido el placer de trabajar
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid gap-8 md:gap-10">
                {artistsData.artists.map((artist, index) => (
                  <div
                    key={artist.id}
                    className={cn(
                      "group relative",
                      "grid grid-cols-1 lg:grid-cols-5 gap-6 items-center",
                      "p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50",
                      "hover:bg-card/80 hover:border-border transition-all duration-500",
                      "hover:shadow-lg hover:shadow-primary/5",
                      index % 2 === 1 && "lg:grid-flow-dense",
                    )}
                  >
                    {/* Imagen/Carrusel */}
                    <div className={cn("lg:col-span-2", index % 2 === 1 && "lg:col-start-4")}>
                      <ArtistCarousel images={artist.images} artistName={artist.name} />
                    </div>

                    {/* Contenido */}
                    <div className={cn("lg:col-span-3 space-y-4", index % 2 === 1 && "lg:col-start-1 lg:row-start-1")}>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <h2 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                            {artist.name}
                          </h2>
                          <Badge variant="outline" className="text-xs">
                            {artist.images.length} foto{artist.images.length !== 1 ? "s" : ""}
                          </Badge>
                        </div>
                        <Separator className="w-12 group-hover:w-16 transition-all duration-300" />
                        <p className="text-muted-foreground text-sm leading-relaxed">{artist.description}</p>
                      </div>

                      {/* Decorative element */}
                      <div className="flex items-center gap-2 pt-2">
                        <div className="w-2 h-2 rounded-full bg-primary/60" />
                        <div className="w-1 h-1 rounded-full bg-primary/40" />
                        <div className="w-1 h-1 rounded-full bg-primary/20" />
                      </div>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
    </div>
  )
}
