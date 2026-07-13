import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-bold text-blue-600"
        >
          Smart Guide
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/">Inicio</Link>

          <Link href="/about">Nosotros</Link>

          <Link href="/contact">Contacto</Link>

          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Iniciar sesión
          </Link>
        </div>
      </nav>
    </header>
  );
}