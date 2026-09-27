import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ValueProposition from "@/components/sections/ValueProposition";
import Partnerships from "@/components/sections/Partnerships";
import ProgramCatalog from "@/components/sections/ProgramCatalog";
import BolsaCreditosBanner from "@/components/sections/BolsaCreditosBanner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--color-udec-stone)]">
      <Navbar />
      <Hero />
      <ValueProposition />
      <Partnerships />
      <ProgramCatalog />
      <BolsaCreditosBanner />
    </main>
  );
}
