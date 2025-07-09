import Link from "next/link";

const footerLinks = [

  { href: "/about", label: "Nosotros" },
  { href: "/contact", label: "Contacto" },
  { href: "https://www.instagram.com/rav_seq", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="py-12">
      <div className="container mx-auto px-4">
        <nav className="flex flex-wrap justify-center items-center gap-4 mb-8">
          {footerLinks.map((link, index) => (
            <div key={link.href} className="flex items-center">
              <Link
                href={link.href}
                className="text-sm md:text-base hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
              {index < footerLinks.length - 1 && (
                <span className="ml-4 text-muted-foreground/50">|</span>
              )}
            </div>
          ))}
        </nav>
        <div className="text-center text-sm md:text-base">
          <p>
            &copy; {new Date().getFullYear()} RAV. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}