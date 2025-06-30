import Header from "../components/Header"
import Footer from "../components/Footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "¿Cómo puedo realizar un pedido?",
    answer:
      "Navega por nuestros productos, selecciona los artículos que deseas y haz clic en el botón 'Contactar sobre este producto'. Completa el formulario con tus datos y nos pondremos en contacto contigo pronto.",
  },
  {
    question: "¿Cuáles son los tiempos de envío?",
    answer:
      "Los pedidos nacionales suelen llegar en un plazo de 3 a 5 días hábiles. Los envíos internacionales pueden tardar entre 7 y 14 días hábiles.",
  },
  {
    question: "¿Realizan envíos internacionales?",
    answer: "Sí, realizamos envíos a la mayoría de los países del mundo. Los costos de envío y los tiempos de entrega varían según la ubicación.",
  },
  {
    question: "¿Cuál es su política de devoluciones?",
    answer:
      "Ofrecemos una política de devoluciones de 30 días para artículos sin uso y en su embalaje original. Contacta a nuestro equipo de servicio al cliente para iniciar una devolución.",
  },
  {
    question: "¿Son sostenibles sus productos?",
    answer:
      "Sí, estamos comprometidos con la sostenibilidad. Utilizamos materiales ecológicos y procesos de fabricación éticos.",
  },
  {
    question: "¿Qué sistemas de reproducción soportan sus productos?",
    answer:
      "Nuestros productos son compatibles con los sistemas de reproducción más comunes, incluidos sistemas de reproducción en vivo y de estudio. Si tienes alguna duda sobre la compatibilidad, no dudes en consultarnos.",
  },
  {
    question: "¿Cómo configuro los envíos de audio en un sistema de playback?",
    answer:
      "Para configurar los envíos de audio en un sistema de playback, asegúrate de conectar correctamente las salidas de tu sistema a las entradas de los dispositivos de audio. Consulta el manual de tu sistema para obtener instrucciones detalladas sobre cómo asignar los envíos.",
  },
  {
    question: "¿Cuáles son las mejores prácticas para gestionar el volumen en un sistema de playback?",
    answer:
      "Es recomendable utilizar una mezcla balanceada para evitar sobrecargar los canales de audio. Asegúrate de ajustar los volúmenes según las necesidades de la actuación o grabación y realiza pruebas de sonido antes del evento.",
  },
  {
    question: "¿Cómo puedo integrar efectos en un sistema de playback?",
    answer:
      "La integración de efectos en un sistema de playback depende del equipo que uses. Generalmente, puedes usar procesadores de efectos de hardware o software y conectarlos a las entradas de audio del sistema para aplicar efectos en tiempo real durante la reproducción.",
  },
  {
    question: "¿Puedo controlar el sistema de playback de manera remota?",
    answer:
      "Sí, muchos sistemas de playback modernos permiten el control remoto a través de aplicaciones móviles o software. Consulta las especificaciones de tu sistema para obtener más información sobre las opciones de control remoto disponibles.",
  },
];


export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight mb-4">Preguntas Frecuentes</h1>
              <p className="text-lg text-muted-foreground">
                Encuentra respuestas a preguntas comunes sobre nuestros productos y servicios.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

