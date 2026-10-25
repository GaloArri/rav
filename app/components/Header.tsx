"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import BotonCarrito from "./BotonCarrito";
import BotonIdioma from "./BotonIdioma";
import { useIdioma } from "@/lib/idioma";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", clave: "inicio" },
  { href: "/servicios", clave: "servicios" },
  { href: "/store", clave: "store" },
  { href: "/projects", clave: "proyectos" },
];

/**
 * Barra de 1U: logo cromado, navegación en mono y el LED de estado.
 * Reemplaza al banner con foto de fondo, que era lo que más pesaba
 * y lo que hacía ver viejo al sitio.
 */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [compacto, setCompacto] = useState(false);
  const pathname = usePathname();
  const { t } = useIdioma();

  useEffect(() => {
    const alScrollear = () => setCompacto(window.scrollY > 24);
    alScrollear();
    window.addEventListener("scroll", alScrollear, { passive: true });
    return () => window.removeEventListener("scroll", alScrollear);
  }, []);

  return (
    <>
      {/* Reserva la altura de la barra fija */}
      <div className="h-[68px]" aria-hidden="true" />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b bg-background/92 backdrop-blur-md transition-shadow",
          compacto && "shadow-[0_1px_0_0_hsl(var(--border))]"
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-screen-xl items-center gap-6 px-4 md:px-8">
          <Link href="/" className="flex shrink-0 items-center" aria-label="RAV, ir al inicio">
            <Image
              src="/assets/rav-3d.webp"
              alt="RAV"
              width={900}
              height={475}
              sizes="120px"
              className="h-6 w-auto md:h-7 dark:brightness-100 brightness-0"
              priority
            />
          </Link>

          <nav className="ml-2 hidden items-center gap-7 md:flex">
            {LINKS.map(({ href, clave }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-foreground",
                  pathname === href ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {t(clave)}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3 md:gap-5">
            <span className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground lg:flex">
              <span className="led" aria-hidden="true" />
              {t("enLinea")}
            </span>

            <BotonIdioma />
            <BotonCarrito />
            <ThemeToggle />

            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label={t("abrirMenu")}>
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="border-border bg-background">
                  <SheetHeader>
                    <SheetTitle className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {t("menu")}
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="mt-10 flex flex-col">
                    {LINKS.map(({ href, clave }) => (
                      <Link
                        key={href}
                        href={href}
                        aria-current={pathname === href ? "page" : undefined}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "border-b py-4 text-2xl font-black uppercase tracking-[-0.02em] transition-colors",
                          pathname === href ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {t(clave)}
                      </Link>
                    ))}
                  </nav>
                  <p className="mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    <span className="led" aria-hidden="true" />
                    {t("enLinea")}
                  </p>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
