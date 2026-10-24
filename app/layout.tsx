import type React from "react";
import type { Metadata, Viewport } from "next";
import { Chivo, Chivo_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import SplashScreen from "./components/SplashScreen";
import { CarritoProvider } from "@/lib/carrito";
import { IdiomaProvider } from "@/lib/idioma";

const chivo = Chivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chivo",
});

// El mono lleva los datos y las etiquetas, como la serigrafía de los equipos.
const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-chivo-mono",
});

const SITIO = "https://rav.ar";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: "RAV — Sistemas de playback y proceso vocal",
    template: "%s | RAV",
  },
  description:
    "Armado, programación y operación de sistemas de playback y proceso vocal en vivo. Alquiler de equipamiento, montaje de racks, diseño e impresión 3D.",
  keywords: [
    "playback en vivo",
    "proceso vocal",
    "autotune en vivo",
    "Ableton Live",
    "alquiler de equipos de audio",
    "racks a medida",
    "impresión 3D",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITIO,
    siteName: "RAV",
    title: "RAV — Sistemas de playback y proceso vocal",
    description:
      "Armado, programación y operación de sistemas de playback y proceso vocal en vivo.",
    images: [
      {
        url: "/images/carousel/img1.webp",
        width: 1200,
        height: 630,
        alt: "RAV — sistemas de playback y proceso vocal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RAV — Sistemas de playback y proceso vocal",
    description:
      "Armado, programación y operación de sistemas de playback y proceso vocal en vivo.",
    images: ["/images/carousel/img1.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className="!scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
          chivo.variable,
          chivoMono.variable,
          chivo.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <IdiomaProvider>
            <CarritoProvider>
              <SplashScreen />
              {children}
            </CarritoProvider>
          </IdiomaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
