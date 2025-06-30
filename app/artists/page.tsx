import Header from "../components/Header"
import Footer from "../components/Footer"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import artistsData from "../data/artists.json"

export default function ArtistsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-muted/30">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h1 className="text-3xl font-bold mb-4">Nuestros Artistas</h1>
              <p className="text-muted-foreground">
                Descubre los talentosos artistas con los que hemos tenido el placer de trabajar
              </p>
            </div>

            <div className="space-y-16">
              {artistsData.artists.map((artist, index) => (
                <div
                  key={artist.id}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8 items-center`}
                >
                  <div className="w-full lg:w-2/5">
                    <div className="relative aspect-[3/2] overflow-hidden group rounded-lg">
                      <Image
                        src={artist.image || "/placeholder.jpg"}
                        alt={artist.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-3/5 space-y-4">
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold tracking-tight">{artist.name}</h2>
                      <Separator className="w-8" />
                      <p className="text-muted-foreground">{artist.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

