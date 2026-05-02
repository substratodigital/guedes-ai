import { motion } from "framer-motion";

const row1 = [
  "Bunge", "CCR", "FIESP", "Firjan SENAI", "Itaú Social", "LHH", "Mahle", "MedMax", "Swisscam"
];

const row2 = [
  "Google", "CONARH ABRH", "IT Forum", "Prefeitura SP", "FUNASA", "SERPRO", "Porto de Santos", "ALESP", "Nile University", "Pacto Global"
];

export default function Clientes() {
  return (
    <section id="clientes" className="w-full py-32 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-indigo-400 font-bold mb-4">
            CLIENTES
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Mais de 100 Organizações Atendidas
          </h2>
          <p className="text-sm text-white/40">
            Brasil · EUA · Egito · Colômbia · Espanha
          </p>
        </motion.div>
      </div>

      <div className="relative w-full flex flex-col gap-8">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Row 1: Left Marquee */}
        <div className="flex w-fit animate-marquee">
          {[...row1, ...row1, ...row1].map((client, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="text-sm font-medium text-white/50 hover:text-white/90 transition-colors px-8 whitespace-nowrap cursor-default">
                {client}
              </span>
              <span className="text-white/15 text-xs">/</span>
            </div>
          ))}
        </div>

        {/* Row 2: Right Marquee (Reverse) */}
        <div className="flex w-fit animate-marquee" style={{ animationDirection: "reverse" }}>
          {[...row2, ...row2, ...row2].map((client, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="text-sm font-medium text-white/50 hover:text-white/90 transition-colors px-8 whitespace-nowrap cursor-default">
                {client}
              </span>
              <span className="text-white/15 text-xs">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
