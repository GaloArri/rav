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
        
        {/* Separador estético */}
        <div className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              <div className="mx-4 w-3 h-3 bg-primary rounded-full"></div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            </div>
          </div>
        </div>
        
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}