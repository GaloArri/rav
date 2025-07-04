import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import productsData from "../../data/products.json";
import ContactForm from "./components/ContactForm";
import ProductGallery from "./components/ProductGallery";

export default async function ProductPage({ params }: { params: { id: string } }) {
  // Esperamos a que los parámetros estén disponibles
  const resolvedParams = await params;
  
  // Convertimos el id de string a número para buscar el producto
  const productId = Number.parseInt(resolvedParams.id, 10);
  
  // Buscar el producto por su ID
  const product = productsData.products.find((p) => p.id === productId);
  
  // Si no existe el producto, mostramos una página 404
  if (!product) {
    notFound();
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            <ProductGallery images={product.images} />
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                <p className="text-2xl font-semibold text-primary mb-4">${product.price.toFixed(2)}</p>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
              <Separator />
              <ContactForm product={product} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}