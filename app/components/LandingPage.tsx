"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Play,
  Volume2,
  Headphones,
  Award,
  Users,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const images = [
  {
    src: "/placeholder.svg?height=300&width=400",
    alt: "Estudio de grabación profesional con equipos Rav",
  },
  {
    src: "/placeholder.svg?height=300&width=400",
    alt: "Proceso de fabricación sostenible",
  },
  {
    src: "/placeholder.svg?height=300&width=400",
    alt: "Equipo de ingenieros trabajando en nuevos productos",
  },
];

export default function LandingPage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (theme === "system" ? systemTheme : theme) : "dark";

  if (!mounted) {
    return null; // Evita el flash de contenido incorrecto
  }

  return (
    <div>
      <main>
        <section className="relative w-full py-8 md:py-16 lg:py-20 xl:py-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/duko.jpg"
              alt="Background"
              fill
              className="object-cover"
              priority
            />
            {/* solo para chekear que esta todo bien y es la ultima version xd */}
            <div className={cn(
              "absolute inset-0",
              currentTheme === "dark" 
                ? "bg-black/60" 
                : "bg-white/70"
            )} />
          </div>
          
          <div className="container relative z-10 px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4 text-center">
              <div className="space-y-3 w-full max-w-4xl">
                <div className="flex justify-center items-center">
                  <Image
                    src="/assets/logo.svg"
                    alt="Logo de Rav"
                    width={220}
                    height={110}
                    className={cn(
                      "w-auto h-16 transition-opacity",
                      currentTheme === "dark" 
                        ? "invert brightness-0" 
                        : "invert-0"
                    )}
                  />
                </div>
                <p className={cn(
                  "mx-auto max-w-[700px] md:text-xl text-center leading-relaxed",
                  currentTheme === "dark" 
                    ? "text-gray-200" 
                    : "text-gray-800"
                )}>
                  Soluciones informáticas en reproducción de audio que combinan
                  tecnología avanzada con un enfoque sostenible. Calidad
                  profesional que perdura en el tiempo.
                </p>
              </div>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className={cn(
                    "h-12 px-8 font-semibold transition-all duration-300 hover:scale-105",
                    currentTheme === "dark"
                      ? "bg-white text-black hover:bg-gray-200 border-2 border-white"
                      : "bg-black text-white hover:bg-gray-800 border-2 border-black"
                  )}
                  asChild
                >
                  <Link href="/about">Más sobre nosotros</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}