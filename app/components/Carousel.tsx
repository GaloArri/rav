"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import carouselData from "../data/carousel.json";

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();
  const { items } = carouselData;

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted
    ? theme === "system"
      ? systemTheme
      : theme
    : "dark";

  const next = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((current + 1) % items.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [current, isAnimating, items.length]);

  const prev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((current - 1 + items.length) % items.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [current, isAnimating, items.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 6000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="w-full relative">
      <div>
        <div className="relative py-8 md:py-12 rounded-lg overflow-hidden">
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out",
                current === index ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.alt}
                fill
                priority
                className="object-cover rounded-lg h-48 md:h-64 w-full"
              />
              <div
                className={cn(
                  "absolute inset-0 rounded-lg pointer-events-none",
                  currentTheme === "dark" ? "bg-black/40" : "bg-white/40"
                )}
              />
              <div
                className={cn(
                  "absolute inset-0 rounded-lg pointer-events-none",
                  currentTheme === "dark"
                    ? "bg-gradient-to-b from-black/60 via-transparent to-black/10"
                    : "bg-gradient-to-b from-white/70 via-transparent to-white/10"
                )}
              />
            </div>
          ))}

          <div className="relative z-20 flex items-center justify-center min-h-[192px] md:min-h-[256px] px-6 mt-28">
            <div className="max-w-3xl text-center">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 w-full transition-opacity duration-500 ease-in-out flex items-center justify-center",
                    current === index ? "opacity-100 z-10" : "opacity-0 z-0"
                  )}
                >
                  <div className="space-y-4 px-4">
                    <h2
                      className={cn(
                        "text-2xl md:text-4xl font-bold mb-3 tracking-tight drop-shadow-2xl",
                        currentTheme === "dark" ? "text-white" : "text-white"
                      )}
                    >
                      {item.title}
                    </h2>
                    <p
                      className={cn(
                        "text-base md:text-lg leading-relaxed max-w-2xl mx-auto drop-shadow-xl",
                        currentTheme === "dark"
                          ? "text-white/95"
                          : "text-white/95"
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
