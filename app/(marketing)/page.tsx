// 1. Importa todos tus componentes de la landing desde su carpeta real
import Hero from "../../components/marketing/Hero";
import Features from "../../components/marketing/Features";
import Lugares from "../../components/marketing/Lugares";
import Rutas from "../../components/marketing/Rutas";
import FavoritosCTA from "../../components/marketing/FavoritosCTA";

export default function MarketingPage() {
  return (
    <div className="flex flex-col gap-10">
      {/* 2. Colócalos en el orden en que quieras que se muestren */}
      <Hero />
      <Features />
      <Lugares />
      <Rutas />
      <FavoritosCTA />
    </div>
  );
}