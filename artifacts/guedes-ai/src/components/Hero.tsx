import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GradientMesh } from "./GradientMesh";

export default function Hero() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPalestras = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("palestras")?.scrollIntoView({ behavior: "smooth" });
  };

  const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] w-full flex items-center justify-center pt-24 pb-12 px-6">
      <GradientMesh />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto w-full">
        
        <motion.div 
          custom={0}
          initial="hidden"
          animate="visible"
          variants={staggerVariants}
          className="mb-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-medium tracking-wide text-white/80">
            ● Pós-Doutor em IA pela FEA/USP
          </span>
        </motion.div>

        <motion.h1 
          custom={1}
          initial="hidden"
          animate="visible"
          variants={staggerVariants}
          className="text-6xl md:text-8xl lg:text-[8rem] font-bold tracking-tight mb-4 gradient-text"
          style={{ lineHeight: 1.1 }}
        >
          Luís Guedes
        </motion.h1>

        <motion.h2 
          custom={2}
          initial="hidden"
          animate="visible"
          variants={staggerVariants}
          className="text-2xl md:text-4xl font-medium tracking-tight mb-6 gradient-text-accent"
        >
          IA e Inovação para o Futuro
        </motion.h2>

        <motion.p 
          custom={3}
          initial="hidden"
          animate="visible"
          variants={staggerVariants}
          className="text-lg md:text-xl text-white/50 leading-relaxed mb-10 max-w-2xl"
        >
          Professor-Doutor · Palestrante Internacional · Consultor Estratégico
        </motion.p>

        <motion.div 
          custom={4}
          initial="hidden"
          animate="visible"
          variants={staggerVariants}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto"
        >
          <a 
            href="#contato"
            onClick={scrollToContact}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-8 py-3.5 rounded-full transition-all hover:shadow-[inset_0_2px_10px_rgba(255,255,255,0.2)]"
            data-testid="button-hero-agendar"
          >
            Agendar Palestra
          </a>
          <a 
            href="#palestras"
            onClick={scrollToPalestras}
            className="w-full sm:w-auto border border-white/10 text-white/80 hover:border-white/20 hover:bg-white/5 text-sm px-8 py-3.5 rounded-full transition-all"
            data-testid="button-hero-palestras"
          >
            Ver Palestras
          </a>
        </motion.div>

        <motion.div 
          custom={5}
          initial="hidden"
          animate="visible"
          variants={staggerVariants}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs md:text-sm text-white/40"
        >
          <span>● 100+ Palestras</span>
          <span>● 30+ Anos</span>
          <span>● 5 países</span>
        </motion.div>

      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
