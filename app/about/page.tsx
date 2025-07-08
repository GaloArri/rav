import Header from "../components/Header"
import Footer from "../components/Footer"
import AboutUs from "./components/AboutUs"
// import TeamSection from "./components/TeamSection"
// import CompanyInfo from "./components/CompanyInfo"
// import WorkshopGallery from "./components/WorkshopGallery"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <AboutUs />
      </main>
      <Footer />
    </div>
  )
}

