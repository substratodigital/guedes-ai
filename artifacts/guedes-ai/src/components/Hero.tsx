import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EffectScene } from "./EffectScene";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "hsl(240 6% 4%)" }}
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
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto w-full px-6 pt-24 sm:pt-0">
          
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-3 lg:mb-4"
        >
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-pixel text-white/80 border border-white/10 bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-pixel tracking-tight text-white leading-[1.05] mb-2 sm:mb-3"
          style={{ fontSize: "clamp(52px, 10vw, 120px)" }}
        >
          Luís Guedes
        </motion.h1>

        {/* Sub-tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-10 lg:mb-12 w-full max-w-2xl"
        >
          <p className="inline-block text-base sm:text-lg md:text-xl text-white/80 font-medium tracking-wide leading-snug">
            {t.hero.p}
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex items-center justify-center mb-16 lg:mb-20"
        >
          <button
            onClick={() => scrollTo("palestras")}
            className="group relative inline-flex h-12 sm:h-14 items-center justify-center gap-3 rounded-full bg-primary px-8 sm:px-10 text-sm sm:text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02] hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            {t.hero.cta2}
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-10 text-white/40 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase"
        >
          {t.hero.stats.map((s, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-white/30" />
              {s}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
