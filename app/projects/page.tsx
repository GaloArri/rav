"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import artistsData from "../data/artists.json";
import ArtistCarousel from "./components/ArtistCarousel";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";

// Componente Modal para las imágenes
function ImageModal({
  isOpen,
  images,
  currentIndex,
  artistName,
  onClose,
}: {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  artistName: string;
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
            alt={`${artistName} - Imagen ${modalIndex + 1}`}
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

export default function ArtistsPage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0);
  const [modalArtistName, setModalArtistName] = useState("");

  const currentTheme = mounted
    ? theme === "system"
      ? systemTheme
      : theme
    : "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  const openImageModal = (images: string[], currentIndex: number, artistName: string) => {
    setModalImages(images);
    setModalCurrentIndex(currentIndex);
    setModalArtistName(artistName);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setModalImages([]);
    setModalCurrentIndex(0);
    setModalArtistName("");
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
            currentTheme === 'dark' 
              ? 'bg-black/50' 
              : 'bg-white/70'
          }`} 
        />
        
        {/* Contenido principal */}
        <div className="relative z-10">
          <section className="pt-32 pb-8">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <div className="inline-block">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Todos Nuestros Colaboradores
                  </h1>
                  <div className="h-1 w-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 rounded-full mb-4"></div>
                  <p className={`text-base md:text-lg max-w-md mx-auto ${
                    currentTheme === 'dark' 
                      ? 'text-white/90' 
                      : 'text-gray-800'
                  }`}>
                    Los artistas más importantes con los que hemos trabajado
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

          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  {artistsData.artists.map((artist, index) => (
                    <div
                      key={artist.id}
                      className="group relative overflow-hidden"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="relative">
                        <ArtistCarousel
                          images={artist.images}
                          artistName={artist.name}
                          onImageClick={(currentIndex: number) => openImageModal(artist.images, currentIndex, artist.name)}
                        />

                        <div 
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 rounded-2xl cursor-pointer"
                          onClick={() => openImageModal(artist.images, 0, artist.name)}
                        >
                                                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                            <p className="text-sm md:text-base text-white/90 leading-relaxed">
                              {artist.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 px-2">
                        <h3 className={`font-semibold text-xl md:text-2xl group-hover:text-primary transition-colors duration-300 ${
                          currentTheme === 'dark' 
                            ? 'text-white' 
                            : 'text-gray-900'
                        }`}>
                          {artist.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-px bg-gradient-to-r from-primary to-transparent flex-1"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />

      {/* Modal de imagen - Renderizado a nivel de página */}
      <ImageModal
        isOpen={isModalOpen}
        images={modalImages}
        currentIndex={modalCurrentIndex}
        artistName={modalArtistName}
        onClose={closeImageModal}
      />
    </div>
  );
}