import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AsciiBackground } from "@/components/AsciiBackground";
import { AsciiPortrait } from "@/components/AsciiPortrait";

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
    <section id="hero" className="relative min-h-[100dvh] w-full flex flex-col lg:flex-row pt-20 overflow-hidden">
      <AsciiBackground />

      {/* Left — text content */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-14 lg:px-20 py-16 w-full lg:w-[54%] shrink-0">

        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={staggerVariants}
          className="mb-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-border bg-foreground/[0.04] text-[11px] font-medium tracking-wide text-foreground/70">
            ● Pós-Doutor em IA pela FEA/USP
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={staggerVariants}
          className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tight mb-4 gradient-text"
          style={{ lineHeight: 1.05 }}
        >
          Lu<span className="font-pixel">í</span>s <span className="font-pixel">G</span>ue<span className="font-pixel">d</span>es
        </motion.h1>

        <motion.h2
          custom={2}
          initial="hidden"
          animate="visible"
          variants={staggerVariants}
          className="text-xl md:text-3xl font-medium tracking-tight mb-6 gradient-text-accent"
        >
          IA e Inovação para o Futuro
        </motion.h2>

        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={staggerVariants}
          className="text-base md:text-lg text-foreground/50 leading-relaxed mb-10 max-w-md"
        >
          Professor-Doutor · Palestrante Internacional · Consultor Estratégico
        </motion.p>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={staggerVariants}
          className="flex flex-col sm:flex-row items-start gap-4 mb-12"
        >
          <a
            href="#contato"
            onClick={scrollToContact}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm px-8 py-3.5 rounded-full transition-all"
            data-testid="button-hero-agendar"
          >
            Agendar Palestra
          </a>
          <a
            href="#palestras"
            onClick={scrollToPalestras}
            className="border border-border text-foreground/70 hover:border-foreground/30 hover:text-foreground hover:bg-foreground/[0.04] text-sm px-8 py-3.5 rounded-full transition-all"
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
          className="flex flex-wrap items-center gap-6 md:gap-10 text-xs md:text-sm text-foreground/40 font-mono"
        >
          <span>● 100+ Palestras</span>
          <span>● 30+ Anos</span>
          <span>● 5 países</span>
        </motion.div>
      </div>

      {/* Right — ASCII portrait (desktop only) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.2 }}
        className="relative z-10 hidden lg:block flex-1 self-stretch min-h-[600px]"
      >
        <AsciiPortrait />
      </motion.div>

      {/* Mobile portrait — below text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-10 lg:hidden w-full h-[55vw] max-h-[420px]"
      >
        <AsciiPortrait />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-8 text-foreground/30 animate-bounce z-10"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
