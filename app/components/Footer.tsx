import Link from "next/link";
import Image from "next/image";
import { VENTAS_MAIL } from "@/lib/tienda";
import Texto from "./Texto";

const LINKS = [
  { href: "/about", clave: "nosotros" },
  { href: "/contact", clave: "contacto" },
  { href: "https://www.instagram.com/rav_seq", clave: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center gap-x-6 gap-y-4 px-4 py-9 md:px-8">
        <Image
          src="/assets/rav-3d.webp"
          alt="RAV"
          width={900}
          height={475}
          sizes="80px"
          className="h-[18px] w-auto opacity-80 dark:brightness-100 brightness-0"
        />
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Buenos Aires, Argentina
        </span>

        <nav className="ml-auto flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={`mailto:${VENTAS_MAIL}`}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            {VENTAS_MAIL}
          </a>
          {LINKS.map(({ href, clave }) => (
            <Link
              key={href}
              href={href}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Texto clave={clave} />
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t">
        <p className="mx-auto max-w-screen-xl px-4 py-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground md:px-8">
          © {new Date().getFullYear()} RAV
        </p>
      </div>
    </footer>
  );
}
