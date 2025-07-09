import Header from "../components/Header";
import Footer from "../components/Footer";
import artistsData from "../data/artists.json";
import ArtistCarousel from "./components/ArtistCarousel";

export default function ArtistsPage() {
  return (
    <section
      className="py-20 relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/project_artists/duko1.jpg')",
      }}
    >
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gradient-to-br from-muted/20 via-background to-muted/30">
          <section className="pt-32 pb-8">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <div className="inline-block">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Todos Nuestros Colaboradores
                  </h1>
                  <div className="h-1 w-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 rounded-full mb-4"></div>
                  <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto">
                    Los artistas más importantes con los que hemos trabajado
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                <div className="mx-4 w-3 h-3 bg-primary rounded-full"></div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              </div>
            </div>
          </section>

          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  {artistsData.artists.map((artist, index) => (
                    <div
                      key={artist.id}
                      className="group relative overflow-hidden"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="relative">
                        <ArtistCarousel
                          images={artist.images}
                          artistName={artist.name}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl">
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <p className="text-sm md:text-base text-white/90 leading-relaxed">
                              {artist.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 px-2">
                        <h3 className="font-semibold text-xl md:text-2xl group-hover:text-primary transition-colors duration-300">
                          {artist.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-px bg-gradient-to-r from-primary to-transparent flex-1"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </section>
  );
}
