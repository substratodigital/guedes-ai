import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Bio() {
  const { t } = useLanguage();

  return (
    <section id="trajetoria" className="w-full py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-pixel mb-6">
            {t.bio.label}
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 gradient-text leading-tight">
            {t.bio.h2}
          </h2>

          <div className="space-y-6 text-foreground/60 text-lg leading-relaxed max-w-3xl mb-12">
            <p>{t.bio.p}</p>
          </div>

          <blockquote className="border-l-2 border-primary pl-6 py-1 mb-12 max-w-3xl">
            <p className="font-serif italic text-2xl md:text-3xl text-foreground/80 leading-snug">
              "{t.bio.quote}"
            </p>
          </blockquote>

          <div className="flex flex-wrap gap-3">
            {t.bio.pills.map((pill, i) => (
              <span
                key={i}
                className="text-[11px] font-medium text-foreground/60 border border-border bg-foreground/[0.03] rounded-full px-4 py-1.5"
              >
                {pill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
