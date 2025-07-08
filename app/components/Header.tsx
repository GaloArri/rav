"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function Header() {
  const { theme, systemTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    setMounted(true)
    if (!theme) {
      setTheme("dark")
    }
  }, [theme, setTheme])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)

      if (!isHome) {
        setVisible(currentScrollY < lastScrollY || currentScrollY < 50)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, isHome])

  const currentTheme = mounted ? (theme === "system" ? systemTheme : theme) : "dark"

  return (
    <>
      {/* Spacer div with color depending on theme */}
      <div
        className={cn(
          "w-full transition-all duration-300",
          isScrolled ? "h-12 md:h-16" : "h-24 md:h-32", 
          currentTheme === "dark" ? "bg-[#222222]" : "bg-[#f7f7f7]",
        )}
        aria-hidden="true"
      />

      <header
        className={cn(
          "fixed w-full top-0 z-50 transition-all duration-300",
          currentTheme === "dark" ? "text-white" : "text-black",
        )}
      >
        {/* Top row with background image */}
        <div
          className={cn(
            "relative w-full transition-all duration-300",
            isScrolled ? "h-12 md:h-16" : "h-24 md:h-32", 
          )}
        >
          <Image src="/images/head.jpg" alt="Header background" fill className="object-cover" priority />
          <div className={cn("absolute inset-0", currentTheme === "dark" ? "bg-[#1a1a1a]/80" : "bg-[#f7f7f7]/80")} />
          <div className="relative h-full flex items-center justify-center">
            <Link href="/" className="flex items-center justify-center w-full">
              {mounted && (
                <Image
                  src="/assets/logorav1.png"
                  alt="Logo RAV"
                  width={1700}
                  height={680}
                  className={cn(
                    "object-contain transition-all duration-300 hover:opacity-80",
                    isScrolled ? "h-28 md:h-32" : "h-44 md:h-52", // Logo muy grande cuando está scrolleado
                    currentTheme === "dark" ? "invert-0" : "invert",
                  )}
                  priority
                />
              )}
            </Link>
          </div>
        </div>

        {/* Bottom row with navigation */}
        <div
          className={cn(
            "w-full border-b backdrop-blur-md",
            currentTheme === "dark" ? "border-[#333333] bg-[#1a1a1a]/95" : "border-[#cccccc] bg-[#f7f7f7]/95",
          )}
        >
          <div className="h-16 flex items-center justify-between">
            <div className="w-full max-w-screen-xl mx-auto px-4 flex items-center justify-center">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-12">
                <Link
                  href="/"
                  className={cn(
                    "text-sm font-medium hover:text-primary transition-colors",
                    pathname === "/" && "font-bold text-lg"
                  )}
                >
                  Inicio
                </Link>
                <Link
                  href="/servicios"
                  className={cn(
                    "text-sm font-medium hover:text-primary transition-colors",
                    pathname === "/servicios" && "font-bold text-lg"
                  )}
                >
                  Servicios
                </Link>
                <Link
                  href="/projects"
                  className={cn(
                    "text-sm font-medium hover:text-primary transition-colors",
                    pathname === "/projects" && "font-bold text-lg"
                  )}
                >
                  Proyectos
                </Link>
                <Link
                  href="/about"
                  className={cn(
                    "text-sm font-medium hover:text-primary transition-colors",
                    pathname === "/about" && "font-bold text-lg"
                  )}
                >
                  Nosotros
                </Link>
              </nav>

              {/* Mobile Menu Button - Positioned absolutely */}
              <div className="md:hidden absolute right-4">
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only"> </span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="right"
                      className={`${
                        currentTheme === "dark"
                          ? "bg-[#1a1a1a]/90"
                          : "bg-[#f7f7f7]/90"
                      } border-[#333333]`}
                    >
                      <SheetHeader>
                        <SheetTitle> </SheetTitle>
                      </SheetHeader>
                      <nav className="flex flex-col space-y-6 mt-8">
                        <Link
                          href="/"
                          className={cn(
                            "text-lg font-medium hover:text-primary transition-colors",
                            pathname === "/" && "font-bold text-xl"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          Inicio
                        </Link>
                        <Link
                          href="/servicios"
                          className={cn(
                            "text-lg font-medium hover:text-primary transition-colors",
                            pathname === "/servicios" && "font-bold text-xl"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          Servicios
                        </Link>
                        <Link
                          href="/projects"
                          className={cn(
                            "text-lg font-medium hover:text-primary transition-colors",
                            pathname === "/projects" && "font-bold text-xl"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          Proyectos
                        </Link>
                        <Link
                          href="/about"
                          className={cn(
                            "text-lg font-medium hover:text-primary transition-colors",
                            pathname === "/about" && "font-bold text-xl"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          Nosotros
                        </Link>
                      </nav>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* Desktop Theme Toggle - Positioned absolutely */}
              <div className="hidden md:block absolute right-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
