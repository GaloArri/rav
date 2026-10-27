import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Grid from "./components/Grid";
import NavSegmentos from "./components/NavSegmentos";
import Taller from "./components/Taller";
import ArmaSistema from "./components/ArmaSistema";
import Movimiento from "./components/Movimiento";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Software de Max for Live para el playback en vivo, equipos de escenario y trabajos de taller a pedido.",
  openGraph: {
    title: "Store | RAV",
    description:
      "Software de Max for Live para el playback en vivo, equipos de escenario y trabajos de taller a pedido.",
  },
};

export default function StorePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="contenido" className="flex-grow">
        <NavSegmentos />
        <Grid />
        <Taller />
        <ArmaSistema />
      </main>
      <Footer />
      <Movimiento />
    </div>
  );
}
