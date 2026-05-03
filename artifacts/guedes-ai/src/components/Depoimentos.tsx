import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Depoimentos() {
  const { t } = useLanguage();

  return (
    <section id="depoimentos" className="w-full py-32 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-pixel mb-4">
            {t.depoimentos.label}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            {t.depoimentos.h2}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.depoimentos.items.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="bg-card border border-border rounded-2xl p-8 flex flex-col"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-primary text-xs">★</span>
                ))}
              </div>
              <p className="font-serif italic text-foreground/80 text-lg leading-relaxed flex-grow mb-8">
                "{d.quote}"
              </p>
              <p className="text-xs font-medium text-foreground/40 tracking-wide uppercase mt-auto">
                {d.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
