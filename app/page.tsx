import Header from "./components/Header";
import Carousel from "./components/Carousel";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className=" w-full"></div>
      <Header />
      <main className="flex-grow">
      <Carousel />
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}