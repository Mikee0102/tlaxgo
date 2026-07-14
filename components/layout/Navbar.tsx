import Container from "../shared/Container";
import Logo from "../shared/Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <nav className="hidden gap-8 md:flex">
            <a href="/">Inicio</a>
            <a href="/about">Acerca</a>
            <a href="/contact">Contacto</a>
          </nav>

          <a
            href="/login"
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Iniciar sesión
          </a>
        </div>
      </Container>
    </header>
  );
}