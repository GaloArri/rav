import { NextResponse, type NextRequest } from "next/server";

// Protege /admin con usuario y contraseña (HTTP Basic).
// Credenciales en ADMIN_USER y ADMIN_PASS.
export function middleware(request: NextRequest) {
  const usuario = process.env.ADMIN_USER;
  const clave = process.env.ADMIN_PASS;

  // Sin credenciales configuradas, el panel queda cerrado.
  if (!usuario || !clave) {
    return new NextResponse("Panel no configurado", { status: 503 });
  }

  const cabecera = request.headers.get("authorization");

  if (cabecera?.startsWith("Basic ")) {
    const [u, c] = atob(cabecera.slice(6)).split(":");
    if (u === usuario && c === clave) return NextResponse.next();
  }

  return new NextResponse("Acceso restringido", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="RAV"' },
  });
}

export const config = { matcher: "/admin/:path*" };
