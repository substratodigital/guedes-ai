import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const row1 = ["Bunge", "CCR", "FIESP", "Firjan SENAI", "Itaú Social", "LHH", "Mahle", "MedMax", "Swisscam"];
const row2 = ["Google", "CONARH ABRH", "IT Forum", "Prefeitura SP", "FUNASA", "SERPRO", "Porto de Santos", "ALESP", "Nile University", "Pacto Global"];

export default function Clientes() {
  const { t } = useLanguage();

  return (
    <section id="clientes" className="w-full py-32 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-bold mb-4">
            {t.clientes.label}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            {t.clientes.h2}
          </h2>
          <p className="text-sm text-foreground/40">
            {t.clientes.countries}
          </p>
        </motion.div>
      </div>

      <div className="relative w-full flex flex-col gap-8">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex w-fit animate-marquee">
          {[...row1, ...row1, ...row1].map((client, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="text-sm font-medium text-foreground/50 hover:text-foreground/90 transition-colors px-8 whitespace-nowrap cursor-default">{client}</span>
              <span className="text-foreground/15 text-xs">/</span>
            </div>
          ))}
        </div>

        <div className="flex w-fit animate-marquee-reverse">
          {[...row2, ...row2, ...row2].map((client, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="text-sm font-medium text-foreground/50 hover:text-foreground/90 transition-colors px-8 whitespace-nowrap cursor-default">{client}</span>
              <span className="text-foreground/15 text-xs">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
