import React from "react";
import { motion } from "framer-motion";
import { ParticleCanvas } from "./ParticleCanvas";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const scrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("palestras")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background pt-20">
      <ParticleCanvas />
      
      {/* Aurora Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full aurora-blob z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[teal]/20 rounded-full aurora-blob z-0" style={{ animationDelay: '-5s' }} />
      
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines z-10" />

      <div className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 text-center lg:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-mono font-bold tracking-tighter text-foreground glitch-text mb-4"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 1.1 }}
            data-text="GUEDES.AI"
          >
            GUEDES.AI
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">
              IA e Inovação para o Futuro
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Professor-Doutor · Palestrante Internacional · Consultor Estratégico
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a 
                href="#contato"
                onClick={scrollToContact}
                className="bg-primary text-primary-foreground px-8 py-4 font-bold text-lg clipped-corner hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(45,53,255,0.4)] w-full sm:w-auto text-center"
                data-testid="button-hero-agendar"
              >
                Agende uma Palestra
              </a>
              <a 
                href="#palestras"
                onClick={scrollToWork}
                className="bg-transparent border border-border text-foreground px-8 py-4 font-bold text-lg clipped-corner hover:bg-card transition-colors w-full sm:w-auto text-center"
                data-testid="button-hero-conheca"
              >
                Conheça o trabalho
              </a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="flex-1 flex justify-center lg:justify-end relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-110" />
            <div className="absolute inset-0 bg-[#00C896]/10 blur-[80px] rounded-full scale-125 translate-x-10 translate-y-10" />
            <img 
              src="/hero-portrait.png" 
              alt="Luís Guedes" 
              className="relative z-10 w-[300px] h-[400px] md:w-[450px] md:h-[600px] object-cover object-center clipped-corner shadow-2xl border border-white/10"
              style={{
                boxShadow: "0 0 40px rgba(45,53,255,0.2), inset 0 0 20px rgba(0,200,150,0.2)"
              }}
              data-testid="img-hero-portrait"
            />
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <ArrowDown className="w-8 h-8 animate-bounce" />
      </motion.div>
    </section>
  );
}