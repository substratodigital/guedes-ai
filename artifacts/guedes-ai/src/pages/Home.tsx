import React from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Bio } from "@/components/Bio";
import { Palestras } from "@/components/Palestras";
import { Trajetoria } from "@/components/Trajetoria";
import { Clientes } from "@/components/Clientes";
import { Solucoes } from "@/components/Solucoes";
import { Depoimentos } from "@/components/Depoimentos";
import { Newsletter } from "@/components/Newsletter";
import { Contato } from "@/components/Contato";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Bio />
        <Palestras />
        <Trajetoria />
        <Clientes />
        <Solucoes />
        <Depoimentos />
        <Newsletter />
        <Contato />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}