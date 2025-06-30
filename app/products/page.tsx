import Header from "../components/Header";
import Footer from "../components/Footer";
import { Suspense } from "react";
import ProductList from "./components/ProductList";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductProvider } from "./components/ProductContext"; // Asegúrate de importar el contexto

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Nuestros Productos</h1>

          </div>
          <Separator className="mb-12" />
          <div className="max-w-7xl mx-auto">
            <ProductProvider>
              <Suspense fallback={<ProductSkeleton />}>
                <ProductList />
              </Suspense>
            </ProductProvider>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[3/4] rounded-xl" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
}
