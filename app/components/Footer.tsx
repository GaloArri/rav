import Link from "next/link";

const footerLinks = [
  // { href: "/products", label: "Productos" },
  { href: "/about", label: "Nosotros" },
  { href: "/contact", label: "Contacto" },
  { href: "https://www.instagram.com/rav_seq", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="py-12">
      <div className="container mx-auto px-4">
        <nav className="flex flex-wrap justify-center gap-6 mb-8">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} RAV. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}