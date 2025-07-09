import Header from "../components/Header"
import Footer from "../components/Footer"
import ContactForm from "./components/ContactForm"
import ContactInfo from "./components/ContactInfo"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-muted/30 ">
              <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">Contactanos</h1>
            <p className="text-base md:text-lg text-muted-foreground">
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

