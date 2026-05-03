import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EffectScene } from "@/components/EffectScene";

export default function Hero() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPalestras = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("palestras")?.scrollIntoView({ behavior: "smooth" });
  };

  const stagger = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
    })
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden"
    >
      {/* ASCII shader background */}
      <EffectScene cellSize={7} colorPalette={0} mouseGlow={true} />

      {/* Dark gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none z-[1]" />

      {/* Bottom fade — blends hero into the next section with no hard edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%)",
        }}
      />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto w-full">

        <motion.div
          custom={0} initial="hidden" animate="visible" variants={stagger}
          className="mb-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-[11px] font-medium tracking-wide text-white/70 backdrop-blur-sm">
            ● Pós-Doutor em IA pela FEA/USP
          </span>
        </motion.div>

        <motion.h1
          custom={1} initial="hidden" animate="visible" variants={stagger}
          className="whitespace-nowrap font-bold tracking-tight mb-4 gradient-text"
          style={{ lineHeight: 1.05, fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
        >
          Lu<span className="font-pixel">í</span>s <span className="font-pixel">G</span>ue<span className="font-pixel">d</span>es
        </motion.h1>

        <motion.h2
          custom={2} initial="hidden" animate="visible" variants={stagger}
          className="text-2xl md:text-4xl font-medium tracking-tight mb-6 gradient-text-accent"
        >
          IA e Inovação para o Futuro
        </motion.h2>

        <motion.p
          custom={3} initial="hidden" animate="visible" variants={stagger}
          className="text-lg md:text-xl text-white/50 leading-relaxed mb-10 max-w-2xl"
        >
          Professor-Doutor · Palestrante Internacional · Consultor Estratégico
        </motion.p>

        <motion.div
          custom={4} initial="hidden" animate="visible" variants={stagger}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto"
        >
          <a
            href="#contato"
            onClick={scrollToContact}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm px-8 py-3.5 rounded-full transition-all"
            data-testid="button-hero-agendar"
          >
            Agendar Palestra
          </a>
          <a
            href="#palestras"
            onClick={scrollToPalestras}
            className="w-full sm:w-auto border border-white/20 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/5 text-sm px-8 py-3.5 rounded-full transition-all backdrop-blur-sm"
            data-testid="button-hero-palestras"
          >
            Ver Palestras
          </a>
        </motion.div>

        <motion.div
          custom={5} initial="hidden" animate="visible" variants={stagger}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs md:text-sm text-white/40 font-mono"
        >
          <span>● 100+ Palestras</span>
          <span>● 30+ Anos</span>
          <span>● 5 países</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce z-10"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
