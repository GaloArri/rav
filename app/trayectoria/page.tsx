import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Shows() {
  const showImages = [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=500&width=800",
    "/placeholder.svg?height=700&width=800",
    "/placeholder.svg?height=550&width=800",
    "/placeholder.svg?height=650&width=800",
    "/placeholder.svg?height=600&width=800",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-light text-center mb-12">Shows</h1>
          <h1 className="text-3xl font-bold mb-4">Nuestros Artistas</h1>
          <p className="text-muted-foreground">
            Descubre los talentosos artistas con los que hemos tenido el placer
            de trabajar
          </p>
          <div className="space-y-8">
            {showImages.map((image, index) => (
              <div key={index} className="w-full">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Show ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}