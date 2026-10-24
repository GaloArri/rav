import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Grid from "./components/Grid";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Devices de Max for Live, hardware de audio y trabajos de taller a pedido.",
  openGraph: {
    title: "Store | RAV",
    description:
      "Devices de Max for Live, hardware de audio y trabajos de taller a pedido.",
  },
};

export default function StorePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <div className="mx-auto max-w-screen-xl px-4 pb-20 md:px-8">
          <div className="py-12 md:py-16">
            <h1 className="titulo-grande text-[44px] md:text-[64px]">Store</h1>
          </div>
          <Grid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
