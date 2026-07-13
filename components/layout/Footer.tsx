export default function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Smart Guide.
        Todos los derechos reservados.
      </div>
    </footer>
  );
}