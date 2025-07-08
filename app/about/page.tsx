import Header from "../components/Header"
import Footer from "../components/Footer"
import AboutUs from "./components/AboutUs"
import TeamSection from "./components/TeamSection"
import CompanyInfo from "./components/CompanyInfo"
import WorkshopGallery from "./components/WorkshopGallery"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <AboutUs />
        
        {/* Divisor estético */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <div className="mx-4 w-3 h-3 bg-primary rounded-full"></div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        </div>
        
        <TeamSection />
        
        {/* Divisor estético */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <div className="mx-4 w-3 h-3 bg-primary rounded-full"></div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        </div>
        
        <CompanyInfo />
        
        {/* Divisor estético */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <div className="mx-4 w-3 h-3 bg-primary rounded-full"></div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        </div>
        
        <WorkshopGallery />
      </main>
      <Footer />
    </div>
  )
}

