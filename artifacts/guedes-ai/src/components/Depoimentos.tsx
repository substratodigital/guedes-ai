import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const depoimentos = [
  {
    quote: "A oportunidade das conversas semanais com o prof. Guedes ao longo desses três meses mostrou novos caminhos para a minha atuação na empresa e me ajudou a evitar obstáculos na chegada a essa nova função.",
    author: "VP Jurídico",
    company: "Empresa Alimentícia"
  },
  {
    quote: "A decisão de aceitar uma posição executiva fora do país foi a mais difícil da minha carreira e a mentoria me ajudou muito a pesar todos os fatores e enfim tomar uma decisão sólida.",
    author: "Diretor Marketing B2B",
    company: "Indústria Química"
  },
  {
    quote: "Palestrante que consegue equilibrar profundidade técnica com energia humana. Uma das melhores experiências de desenvolvimento que já tivemos.",
    author: "Gerente de RH",
    company: "Empresa de Tecnologia"
  }
];

export function Depoimentos() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % depoimentos.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-foreground mb-2">
            O Que Dizem
          </h2>
        </div>

        <div className="terminal-card bg-[#050714] border border-[#2D35FF]/30 rounded-sm overflow-hidden relative">
          {/* Terminal Header */}
          <div className="bg-[#0A0E27] border-b border-[#2D35FF]/30 px-4 py-2 flex items-center">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-[#00C896]/80"></div>
            </div>
            <div className="font-mono text-xs text-muted-foreground flex items-center">
              bash <span className="mx-2 text-[#00C896]">~</span> ./read_testimonials.sh <span className="inline-block w-2 h-4 bg-primary ml-1 animate-blink"></span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-8 md:p-12 relative min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl italic text-foreground leading-relaxed mb-8">
                  "{depoimentos[currentIndex].quote}"
                </p>
                <div className="font-mono text-primary">
                  <span className="text-[#00C896]">&gt;</span> {depoimentos[currentIndex].author}
                  <span className="text-muted-foreground text-sm ml-2">[{depoimentos[currentIndex].company}]</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {depoimentos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-none transition-all duration-300 ${
                currentIndex === idx 
                  ? "bg-primary w-6 shadow-[0_0_8px_rgba(45,53,255,0.8)]" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
              data-testid={`btn-testimonial-dot-${idx}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}