import React from "react";

const clients = [
  "Bunge", "CCR", "FIESP", "Firjan SENAI", "Itaú Social", "LHH", "Mahle", 
  "MedMax", "Swisscam Brasil", "Google", "CONARH ABRH Brasil", "IT Forum", 
  "IAMOT Montreal", "Pacto Global", "Prefeitura de São Paulo", "FUNASA", 
  "SERPRO", "Porto de Santos", "SPUrbanismo", "ALESP", "Nile University", 
  "PIT São José dos Campos"
];

export function Clientes() {
  return (
    <section className="py-20 bg-background overflow-hidden border-t border-b border-border">
      <div className="container mx-auto px-6 mb-10">
        <h2 className="font-mono text-xl md:text-2xl text-center text-muted-foreground">
          Mais de <span className="text-primary font-bold">100+</span> Organizações no Brasil e no Exterior
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden w-full bg-background/50 py-4">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-marquee whitespace-nowrap">
          {[...clients, ...clients].map((client, index) => (
            <div 
              key={index}
              className="mx-4 flex items-center justify-center bg-card border border-border px-6 py-3 rounded-full hover:border-primary hover:shadow-[0_0_15px_rgba(45,53,255,0.2)] transition-all cursor-default"
            >
              <span className="font-sans font-medium text-muted-foreground hover:text-foreground transition-colors">{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}