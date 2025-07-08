"use client";

import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Mic, Settings, Wrench, Music, Layers, Box } from "lucide-react";
import Image from "next/image";
import serviciosData from "../data/servicios.json";

const services = [
  {
    id: "alquiler",
    title: "Alquiler de Equipamientos",
    description:
      "Equipos profesionales para procesamiento vocal y de secuencia",
    icon: Mic,
    sectionId: "alquiler-section",
  },
  {
    id: "equipos",
    title: "Nuestros Equipos",
    description: "Catálogo completo de equipamiento disponible",
    icon: Settings,
    sectionId: "equipos-section",
  },
  {
    id: "reparacion",
    title: "Reparación de Equipos",
    description: "Servicio técnico especializado y garantizado",
    icon: Wrench,
    sectionId: "reparacion-section",
  },
  {
    id: "programacion",
    title: "Programación de Sesiones",
    description: "Configuración y programación personalizada",
    icon: Music,
    sectionId: "programacion-section",
  },
  {
    id: "montaje",
    title: "Montaje de Equipamientos",
    description: "Instalación y configuración profesional",
    icon: Layers,
    sectionId: "montaje-section",
  },
  {
    id: "diseno",
    title: "Diseño e Impresión 3D",
    description: "Soluciones de diseño y fabricación tridimensional",
    icon: Box,
    sectionId: "diseno-section",
  },
];

function useScrollAnimation() {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return addToRefs;
}

function ImageCarousel({
  images,
  itemName,
}: {
  images: string[];
  itemName: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-64 rounded-2xl overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 h-full relative">
            <Image
              src={image || "/placeholder.svg?height=400&width=600"}
              alt={`${itemName} - Imagen ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SectionGrid({
  data,
  addToRefs,
}: {
  data: any[];
  addToRefs: (el: HTMLElement | null) => void;
}) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {data.map((item, index) => (
          <div
            key={item.id}
            className="group relative overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out"
            style={{
              animationDelay: `${index * 0.1}s`,
              transitionDelay: `${index * 100}ms`,
            }}
            ref={addToRefs}
          >
            {/* Imagen con overlay */}
            <div className="relative">
              <ImageCarousel images={item.images} itemName={item.name} />
              {/* Overlay con información */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-sm text-white/90 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
            {/* Información visible siempre */}
            <div className="pt-4 px-2">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                {item.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-px bg-gradient-to-r from-primary to-transparent flex-1"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesCarousel({
  addToRefs,
}: {
  addToRefs: (el: HTMLElement | null) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  return (
    <div
      className="max-w-6xl mx-auto opacity-0 translate-y-8 transition-all duration-700 ease-out"
      ref={addToRefs}
    >
      <div className="relative">
        {/* Carrusel principal */}
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {services.map((service, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="bg-background border border-border/50 rounded-2xl p-12 mx-4 hover:border-primary/20 transition-all duration-300">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8">
                      <service.icon className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-3xl font-light mb-6 text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground/80 leading-relaxed text-lg max-w-md mx-auto">
                      {service.description}
                    </p>
                    <div className="mt-8">
                      <Button
                        size="lg"
                        className="rounded-full px-8"
                        onClick={() => scrollToSection(service.sectionId)}
                      >
                        Ver Más
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botones de navegación */}
        <button
          onClick={() => {
            prevSlide();
            setIsAutoPlaying(false);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all duration-300 flex items-center justify-center group"
        >
          <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>

        <button
          onClick={() => {
            nextSlide();
            setIsAutoPlaying(false);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all duration-300 flex items-center justify-center group"
        >
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-8 gap-2">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function RentalsPage() {
  const addToRefs = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-32 pb-16 bg-gradient-to-b from-background to-muted/20">
          <div className="text-center mb-8">
            <div className="inline-block">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Nuestros Servicios
              </h2>
              <div className="h-1 w-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 rounded-full mb-4"></div>
              <p className="text-muted-foreground max-w-md mx-auto">
                Servicios profesionales especializados en equipamiento de audio
                para todas tus necesidades.
              </p>
            </div>
          </div>
        </section>

        {/* Services Carousel */}
        <section className="pt-4 pb-16">
          <div className="container mx-auto px-4">
            <ServicesCarousel addToRefs={addToRefs} />
          </div>
        </section>

        {/* Alquiler de Equipamientos Section */}
        <section
          id="alquiler-section"
          className="py-24 bg-muted/20 scroll-mt-20"
        >
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
              ref={addToRefs}
            >
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Alquiler de Equipamientos
              </h2>
              <div className="w-24 h-px bg-primary mx-auto"></div>
            </div>
            <SectionGrid data={serviciosData.alquiler} addToRefs={addToRefs} />
          </div>
        </section>

        {/* Nuestros Equipos Section */}
        <section id="equipos-section" className="py-24 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
              ref={addToRefs}
            >
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Nuestros Equipos
              </h2>
              <div className="w-24 h-px bg-primary mx-auto"></div>
            </div>
            <SectionGrid data={serviciosData.equipos} addToRefs={addToRefs} />
          </div>
        </section>

        {/* Reparación de Equipos Section */}
        <section
          id="reparacion-section"
          className="py-24 bg-muted/20 scroll-mt-20"
        >
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
              ref={addToRefs}
            >
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Reparación de Equipos
              </h2>
              <div className="w-24 h-px bg-primary mx-auto"></div>
            </div>
            <SectionGrid
              data={serviciosData.reparacion}
              addToRefs={addToRefs}
            />
          </div>
        </section>

        {/* Programación de Sesiones Section */}
        <section id="programacion-section" className="py-24 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
              ref={addToRefs}
            >
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Programación de Sesiones
              </h2>
              <div className="w-24 h-px bg-primary mx-auto"></div>
            </div>
            <SectionGrid
              data={serviciosData.programacion}
              addToRefs={addToRefs}
            />
          </div>
        </section>

        {/* Montaje de Equipamientos Section */}
        <section
          id="montaje-section"
          className="py-24 bg-muted/20 scroll-mt-20"
        >
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
              ref={addToRefs}
            >
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Montaje de Equipamientos
              </h2>
              <div className="w-24 h-px bg-primary mx-auto"></div>
            </div>
            <SectionGrid data={serviciosData.montaje} addToRefs={addToRefs} />
          </div>
        </section>

        {/* Diseño e Impresión 3D Section */}
        <section id="diseno-section" className="py-24 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
              ref={addToRefs}
            >
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Diseño e Impresión 3D
              </h2>
              <div className="w-24 h-px bg-primary mx-auto"></div>
            </div>
            <SectionGrid data={serviciosData.diseno} addToRefs={addToRefs} />
          </div>
        </section>
      </main>
      <Footer />

      <style jsx global>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}
