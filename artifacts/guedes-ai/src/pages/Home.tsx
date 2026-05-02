import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Bio from "@/components/Bio";
import Palestras from "@/components/Palestras";
import Trajetoria from "@/components/Trajetoria";
import Publicacoes from "@/components/Publicacoes";
import Clientes from "@/components/Clientes";
import Solucoes from "@/components/Solucoes";
import Depoimentos from "@/components/Depoimentos";
import Newsletter from "@/components/Newsletter";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="relative w-full flex flex-col items-center overflow-hidden">
      <Nav />
      <div className="w-full flex flex-col items-center">
        <Hero />
        <Stats />
        <Bio />
        <Palestras />
        <Trajetoria />
        <Publicacoes />
        <Clientes />
        <Solucoes />
        <Depoimentos />
        <Newsletter />
        <Contato />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
