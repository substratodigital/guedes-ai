import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Clientes from "@/components/Clientes";
import Bio from "@/components/Bio";
import Palestras from "@/components/Palestras";
import Trajetoria from "@/components/Trajetoria";
import Publicacoes from "@/components/Publicacoes";
import Solucoes from "@/components/Solucoes";
import Depoimentos from "@/components/Depoimentos";
import Newsletter from "@/components/Newsletter";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { GradientMesh } from "@/components/GradientMesh";

export default function Home() {
  return (
    <div className="relative w-full flex flex-col items-center overflow-hidden">
      <GradientMesh />
      <Nav />
      <div className="w-full flex flex-col items-center relative z-10">
        <Hero />
        <Clientes />
        <Bio />
        <Palestras />
        <Trajetoria />
        <Publicacoes />
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
