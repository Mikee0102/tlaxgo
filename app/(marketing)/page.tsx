import Container from "@/components/shared/Container";

export default function Home() {
  return (
    <Container>
      <section className="flex min-h-[80vh] flex-col items-center justify-center text-center">
        <h1 className="mb-6 text-5xl font-bold">
          Smart Guide
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-gray-600">
          Descubre lugares turísticos, crea itinerarios y explora tu próximo destino desde una sola aplicación.
        </p>

        <button className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
          Comenzar
        </button>
      </section>
    </Container>
  );
}