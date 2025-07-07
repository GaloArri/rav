"use client";

import { useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, Package, Clock, Shield } from "lucide-react";
import { Wrench, CheckCircle } from "lucide-react";

const rentalEquipment = [
  {
    name: "Sistema de Sonido Completo",
    description: "Sistema profesional para eventos medianos y grandes",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "Micrófonos Profesionales",
    description: "Set de micrófonos de alta calidad",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "Consola Digital",
    description: "Mezcladora digital profesional",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "Monitores de Escenario",
    description: "Par de monitores profesionales",
    image: "/placeholder.svg?height=300&width=400",
  },
];

const repairServices = [
  {
    icon: Wrench,
    title: "Reparación Profesional",
    description:
      "Servicio técnico especializado para todo tipo de equipos de audio profesional.",
  },
  {
    icon: Clock,
    title: "Diagnóstico Rápido",
    description: "Evaluación detallada de su equipo en 24-48 horas.",
  },
  {
    icon: Shield,
    title: "Garantía de Servicio",
    description: "Todos nuestros trabajos cuentan con garantía de 3 meses.",
  },
  {
    icon: CheckCircle,
    title: "Repuestos Originales",
    description:
      "Utilizamos únicamente repuestos originales y de alta calidad.",
  },
];

const features = [
  {
    icon: Calendar,
    title: "Reserva Flexible",
    description: "Sistema de reservas adaptable a sus necesidades",
  },
  {
    icon: Package,
    title: "Equipo Completo",
    description: "Todo lo necesario para su evento",
  },
  {
    icon: Clock,
    title: "Soporte 24/7",
    description: "Asistencia técnica disponible en todo momento",
  },
  {
    icon: Shield,
    title: "Garantía Total",
    description: "Equipos asegurados y en perfecto estado",
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

export default function RentalsPage() {
  const addToRefs = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-32 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div
              className="max-w-4xl mx-auto text-center opacity-0 translate-y-8 transition-all duration-1000 ease-out animate-in"
              ref={addToRefs}
            >
              <h1 className="text-5xl md:text-6xl font-light mb-8 tracking-tight">
                Alquiler de Equipos
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Ofrecemos una amplia gama de equipos de audio profesional para
                todo tipo de eventos.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="text-center opacity-0 translate-y-8 transition-all duration-700 ease-out"
                    style={{ transitionDelay: `${index * 100}ms` }}
                    ref={addToRefs}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Primera fila del grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
                {/* Columna principal izquierda */}
                <div
                  className="lg:col-span-4 opacity-0 translate-y-8 transition-all duration-700 ease-out"
                  ref={addToRefs}
                >
                  <h3 className="text-2xl font-medium mb-6 text-foreground">
                    Sistemas de Sonido Profesional
                  </h3>
                  <p className="text-muted-foreground/80 leading-relaxed">
                    Contamos con sistemas de audio redundantes y portátiles
                    esenciales para cualquier evento. Déjanos conocer tus
                    necesidades y personalizaremos un sistema que se adapte
                    perfectamente a tu evento.
                  </p>
                </div>

                {/* Columnas derecha */}
                <div className="lg:col-span-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <div
                      className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
                      style={{ transitionDelay: "100ms" }}
                      ref={addToRefs}
                    >
                      <h3 className="text-2xl font-medium mb-6 text-foreground">
                        Configuración de Escenario
                      </h3>
                      <p className="text-muted-foreground/80 leading-relaxed">
                        Personaliza tu configuración de escenario con un diseño
                        que te permite configurar menos mientras rindes más.
                        Creamos estaciones de rendimiento únicas.
                      </p>
                    </div>

                    <div
                      className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
                      style={{ transitionDelay: "200ms" }}
                      ref={addToRefs}
                    >
                      <h3 className="text-2xl font-medium mb-6 text-foreground">
                        Sincronización Completa
                      </h3>
                      <p className="text-muted-foreground/80 leading-relaxed">
                        Hay muchas formas de sincronizar la música, video e
                        iluminación de un show. Encontraremos la mejor solución
                        que se adapte a tu presentación.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Espaciador visual */}
              <div className="h-16"></div>

              {/* Segunda fila del grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Columna principal izquierda */}
                <div
                  className="lg:col-span-4 opacity-0 translate-y-8 transition-all duration-700 ease-out"
                  ref={addToRefs}
                >
                  <h3 className="text-2xl font-medium mb-6 text-foreground">
                    Programación de Audio
                  </h3>
                  <p className="text-muted-foreground/80 leading-relaxed">
                    Cada artista tiene una forma única de crear música, pero hay
                    muchas necesidades diferentes para un show en vivo. Tu
                    sesión debe ser capaz de albergar múltiples canciones y
                    conectarse a múltiples controladores con flexibilidad total.
                  </p>
                </div>

                {/* Columnas derecha */}
                <div className="lg:col-span-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <div
                      className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
                      style={{ transitionDelay: "100ms" }}
                      ref={addToRefs}
                    >
                      <h3 className="text-2xl font-medium mb-6 text-foreground">
                        Desarrollo Personalizado
                      </h3>
                      <p className="text-muted-foreground/80 leading-relaxed">
                        Desarrollamos soluciones personalizadas para múltiples
                        propósitos de control de show. Revisa nuestros proyectos
                        para ver cómo se integran en nuestros sistemas.
                      </p>
                    </div>

                    <div
                      className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
                      style={{ transitionDelay: "200ms" }}
                      ref={addToRefs}
                    >
                      <h3 className="text-2xl font-medium mb-6 text-foreground">
                        Consultoría Técnica
                      </h3>
                      <p className="text-muted-foreground/80 leading-relaxed">
                        ¿Tienes una idea para optimizar tu setup? Nos gustaría
                        ayudar a hacer esas ideas realidad. Contáctanos para
                        comenzar el proceso de desarrollo de tu proyecto.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment Section */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-20 opacity-0 translate-y-8 transition-all duration-700 ease-out"
              ref={addToRefs}
            >
              <h2 className="text-3xl md:text-4xl font-light mb-4">
                Nuestros Equipos
              </h2>
              <div className="w-24 h-px bg-primary mx-auto"></div>
            </div>

            <div className="max-w-6xl mx-auto space-y-16">
              {rentalEquipment.map((equipment, index) => (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row items-center gap-12 opacity-0 translate-y-8 transition-all duration-700 ease-out"
                  ref={addToRefs}
                >
                  <div className="flex-1">
                    <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={equipment.image || "/placeholder.svg"}
                        alt={equipment.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl font-light mb-4">
                      {equipment.name}
                    </h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {equipment.description}
                    </p>
                    <Button size="lg" className="rounded-full px-8">
                      Consultar Disponibilidad
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Repair Services Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-20 opacity-0 translate-y-8 transition-all duration-700 ease-out"
              ref={addToRefs}
            >
              <h2 className="text-3xl md:text-4xl font-light mb-4">
                Servicio Técnico Especializado
              </h2>
              <div className="w-24 h-px bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Contamos con técnicos certificados y años de experiencia en la
                reparación de equipos de audio profesional.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-0">
                {repairServices.map((service, index) => (
                  <div
                    key={index}
                    className="group relative opacity-0 translate-x-8 transition-all duration-700 ease-out"
                    style={{ transitionDelay: `${index * 200}ms` }}
                    ref={addToRefs}
                  >
                    {/* Línea conectora */}
                    {index < repairServices.length - 1 && (
                      <div className="absolute left-8 top-16 w-px h-16 bg-gradient-to-b from-border to-transparent"></div>
                    )}

                    {/* Contenido del servicio */}
                    <div className="flex items-start gap-8 py-8 px-6 hover:bg-muted/20 transition-all duration-300 rounded-2xl">
                      {/* Número del servicio */}
                      <div className="flex-shrink-0 relative">
                        <div className="w-16 h-16 rounded-full border-2 border-border bg-background flex items-center justify-center group-hover:border-primary/40 transition-colors duration-300">
                          <span className="text-lg font-light text-muted-foreground group-hover:text-primary transition-colors duration-300">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>

                      {/* Contenido */}
                      <div className="flex-1 pt-2">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-light text-foreground group-hover:text-primary transition-colors duration-300">
                            {service.title}
                          </h3>
                          <div className="hidden md:block w-8 h-px bg-border group-hover:bg-primary/40 transition-colors duration-300 mt-3"></div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm max-w-2xl">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
