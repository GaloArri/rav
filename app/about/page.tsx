import Header from "../components/Header"
import Footer from "../components/Footer"
import AboutUs from "./components/AboutUs"
import TeamSection from "./components/TeamSection"
import Sustainability from "./components/Sustainability"
import CompanyHistory from "./components/CompanyHistory"



export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <AboutUs />
        <CompanyHistory />
        <TeamSection />
        <Sustainability />
      </main>
      <Footer />
    </div>
  )
}

