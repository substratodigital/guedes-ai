import { motion } from "framer-motion";
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
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto w-full">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-medium text-white/70 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white leading-none mb-4"
        >
          Luís Guedes
        </motion.h1>

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold gradient-text mb-6"
        >
          {t.hero.h2}
        </motion.h2>

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-sm sm:text-base text-white/50 mb-12 tracking-wide"
        >
          {t.hero.p}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <button
            onClick={() => scrollTo("contato")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm px-8 py-3.5 rounded-full transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02]"
          >
            {t.hero.cta1}
          </button>
          <button
            onClick={() => scrollTo("palestras")}
            className="text-white/80 hover:text-white font-medium text-sm px-8 py-3.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all"
          >
            {t.hero.cta2}
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex items-center gap-8 text-white/40 text-[11px] font-mono tracking-widest uppercase"
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
