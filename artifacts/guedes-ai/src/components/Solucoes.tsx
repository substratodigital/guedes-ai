import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Solucoes() {
  const { t } = useLanguage();

  return (
    <section id="solucoes" className="w-full py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-pixel mb-4">
            {t.solucoes.label}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            {t.solucoes.h2}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {t.solucoes.items.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              className="flex flex-col group"
            >
              <div className="text-xs font-mono text-foreground/25 mb-3">
                {(i + 1).toString().padStart(2, "0")}
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-foreground/50 leading-relaxed mb-6">{s.desc}</p>
              <div className="w-full h-px bg-border mt-auto group-hover:bg-primary/30 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
