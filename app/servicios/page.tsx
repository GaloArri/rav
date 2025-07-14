"use client";

import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import serviciosData from "../data/servicios.json";
import { useTheme } from "next-themes";

const services = [
  {
    id: "alquiler",
    title: "Alquiler de Equipamientos",
    sectionId: "alquiler-section",
  },
  {
    id: "equipos",
    title: "Nuestros Equipos",
    sectionId: "equipos-section",
  },
  {
    id: "reparacion",
    title: "Reparación de Equipos",
    sectionId: "reparacion-section",
  },
  {
    id: "programacion",
    title: "Programación de Sesiones",
    sectionId: "programacion-section",
  },
  {
    id: "montaje",
    title: "Montaje de Equipamientos",
    sectionId: "montaje-section",
  },
  {
    id: "diseno",
    title: "Diseño e Impresión 3D",
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

// Nuevo componente Modal para las imágenes
function ImageModal({
  isOpen,
  images,
  currentIndex,
  onClose,
}: {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
}) {
  const [modalIndex, setModalIndex] = useState(currentIndex);

  // Actualizar el índice del modal cuando cambie currentIndex
  useEffect(() => {
    setModalIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "ArrowLeft") {
        goToPrevious();
      }
      if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const goToNext = () => {
    setModalIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setModalIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen || !images[modalIndex]) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Fondo opaco - clickeable para cerrar */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Contenido del modal */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] bg-transparent rounded-lg flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute -top-12 -right-12 z-10 w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-black/90 transition-all duration-300 flex items-center justify-center"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Botones de navegación - Solo si hay más de una imagen */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-black/90 transition-all duration-300 flex items-center justify-center z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-black/90 transition-all duration-300 flex items-center justify-center z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Imagen */}
        <div className="relative max-w-full max-h-full">
          <Image
            src={images[modalIndex]}
            alt={` Imagen ${modalIndex + 1}`}
            width={1200}
            height={800}
            className="object-contain max-w-full max-h-full rounded-lg"
            quality={100}
          />
        </div>

        {/* Indicadores de posición - Solo si hay más de una imagen */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setModalIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === modalIndex
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ImageCarousel({
  images,
  itemName,
  onImageClick,
}: {
  images: string[];
  itemName: string;
  onImageClick: (imageUrl: string) => void;
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
              className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => onImageClick(image)}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
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
  onImageClick,
}: {
  data: any[];
  addToRefs: (el: HTMLElement | null) => void;
  onImageClick: (imageUrl: string) => void;
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
              <ImageCarousel
                images={item.images}
                itemName={item.name}
                onImageClick={onImageClick}
              />
              {/* Overlay con información - clickeable para abrir imagen */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 rounded-2xl cursor-pointer"
                onClick={() => onImageClick(item.images[0])}
              >
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-sm text-white/90 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
            {/* Información visible siempre */}
            <div className="pt-4 px-2">
              <h3 className="font-semibold text-xl md:text-2xl group-hover:text-primary transition-colors duration-300">
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
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
      setIsAutoPlaying(false);
    }
    if (isRightSwipe) {
      prevSlide();
      setIsAutoPlaying(false);
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
        <div
          className="overflow-hidden rounded-2xl select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {services.map((service, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="bg-background border border-border/50 rounded-2xl p-12 mx-4 hover:border-primary/20 transition-all duration-300">
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-light mb-6 text-foreground">
                      {service.title}
                    </h3>
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

        {/* Botones de navegación - Solo visible en pantallas medianas y más grandes */}
        <button
          onClick={() => {
            prevSlide();
            setIsAutoPlaying(false);
          }}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all duration-300 items-center justify-center group"
        >
          <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>

        <button
          onClick={() => {
            nextSlide();
            setIsAutoPlaying(false);
          }}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all duration-300 items-center justify-center group"
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
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [modalAltText, setModalAltText] = useState("");

  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0);
  const currentTheme = mounted
    ? theme === "system"
      ? systemTheme
      : theme
    : "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  const openImageModal = (imageUrl: string) => {
    setModalImageUrl(imageUrl);
    setModalAltText("Imagen ampliada");
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setModalImageUrl("");
    setModalAltText("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className="flex-grow relative bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('/images/project_artists/duko1.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay semitransparente para mejor legibilidad */}
        <div
          className={`absolute inset-0 ${
            currentTheme === "dark" ? "bg-black/50" : "bg-white/70"
          }`}
        />
        <section className="py-32 pb-16 relative">
          {/* Content */}
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-block">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Nuestros Servicios
                </h1>
                <p
                  className={`text-base md:text-lg max-w-md mx-auto ${
                    currentTheme === "dark"
                      ? "text-muted-foreground"
                      : "text-gray-800"
                  }`}
                >
                  Servicios profesionales especializados en equipamiento de
                  audio para todas tus necesidades.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              <div className="mx-4 w-3 h-3 bg-primary rounded-full"></div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Services Carousel */}
        {/**
        <section className="pt-4 pb-8">
          <div className="container mx-auto px-4">
            <ServicesCarousel addToRefs={addToRefs} />
          </div>
        </section>
        */}

        {/* Nuestros Equipos Section */}
        <section
          id="equipos-section"
          className={`pt-8 pb-24 scroll-mt-20 ${
            currentTheme === "dark" ? "bg-black/20" : "bg-white/50"
          }`}
        >
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
              ref={addToRefs}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Nuestros Equipos
              </h2>
              <div className="w-24 h-px bg-primary mx-auto mb-4"></div>
              <p
                className={`text-base md:text-lg leading-relaxed max-w-md mx-auto ${
                  currentTheme === "dark"
                    ? "text-muted-foreground/80"
                    : "text-gray-700"
                }`}
              >
                Catálogo completo de equipamiento disponible
              </p>
            </div>
            <SectionGrid
              data={serviciosData.equipos}
              addToRefs={addToRefs}
              onImageClick={openImageModal}
            />
          </div>
        </section>

        {/* Alquiler de Equipamientos Section */}
        <section id="alquiler-section" className="py-24 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
              ref={addToRefs}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Alquiler de Equipamientos
              </h2>
              <div className="w-24 h-px bg-primary mx-auto mb-4"></div>
              <p
                className={`text-base md:text-lg leading-relaxed max-w-md mx-auto ${
                  currentTheme === "dark"
                    ? "text-muted-foreground/80"
                    : "text-gray-700"
                }`}
              >
                Equipos profesionales para procesamiento vocal y de secuencia
              </p>
            </div>
            <SectionGrid
              data={serviciosData.alquiler}
              addToRefs={addToRefs}
              onImageClick={openImageModal}
            />
          </div>
        </section>

        {/* Reparación de Equipos Section */}
        <section
          id="reparacion-section"
          className={`py-24 scroll-mt-20 ${
            currentTheme === "dark" ? "bg-black/20" : "bg-white/50"
          }`}
        >
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
              ref={addToRefs}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Reparación de Equipos
              </h2>
              <div className="w-24 h-px bg-primary mx-auto mb-4"></div>
              <p
                className={`text-base md:text-lg leading-relaxed max-w-md mx-auto ${
                  currentTheme === "dark"
                    ? "text-muted-foreground/80"
                    : "text-gray-700"
                }`}
              >
                Servicio técnico especializado y garantizado
              </p>
            </div>
            <SectionGrid
              data={serviciosData.reparacion}
              addToRefs={addToRefs}
              onImageClick={openImageModal}
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
              <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Programación de Sesiones
              </h2>
              <div className="w-24 h-px bg-primary mx-auto mb-4"></div>
              <p
                className={`text-base md:text-lg leading-relaxed max-w-md mx-auto ${
                  currentTheme === "dark"
                    ? "text-muted-foreground/80"
                    : "text-gray-700"
                }`}
              >
                Configuración y programación personalizada
              </p>
            </div>
            <SectionGrid
              data={serviciosData.programacion}
              addToRefs={addToRefs}
              onImageClick={openImageModal}
            />
          </div>
        </section>

        {/* Montaje de Equipamientos Section */}
        <section
          id="montaje-section"
          className={`py-24 scroll-mt-20 ${
            currentTheme === "dark" ? "bg-black/20" : "bg-white/50"
          }`}
        >
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
              ref={addToRefs}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Montaje de Equipamientos
              </h2>
              <div className="w-24 h-px bg-primary mx-auto mb-4"></div>
              <p
                className={`text-base md:text-lg leading-relaxed max-w-md mx-auto ${
                  currentTheme === "dark"
                    ? "text-muted-foreground/80"
                    : "text-gray-700"
                }`}
              >
                Instalación y configuración profesional
              </p>
            </div>
            <SectionGrid
              data={serviciosData.montaje}
              addToRefs={addToRefs}
              onImageClick={openImageModal}
            />
          </div>
        </section>

        {/* Diseño e Impresión 3D Section */}
        <section id="diseno-section" className="py-24 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
              ref={addToRefs}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Diseño e Impresión 3D
              </h2>
              <div className="w-24 h-px bg-primary mx-auto mb-4"></div>
              <p
                className={`text-base md:text-lg leading-relaxed max-w-md mx-auto ${
                  currentTheme === "dark"
                    ? "text-muted-foreground/80"
                    : "text-gray-700"
                }`}
              >
                Soluciones de diseño y fabricación tridimensional
              </p>
            </div>
            <SectionGrid
              data={serviciosData.diseno}
              addToRefs={addToRefs}
              onImageClick={openImageModal}
            />
          </div>
        </section>
      </main>
      <Footer />

      {/* Modal de imagen - Renderizado a nivel de página */}
      <ImageModal
        isOpen={isModalOpen}
        images={modalImages}
        currentIndex={modalCurrentIndex}
        onClose={closeImageModal}
      />

      <style jsx global>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}
