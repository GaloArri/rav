import Header from "./components/Header";
import Carousel from "./components/Carousel";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <LandingPage />
        <Carousel />
      </main>
      <Footer />
    </div>
  );
}
