import { motion } from "framer-motion";

const palestras = [
  {
    id: "ia-360",
    title: "IA | 360",
    badge: "Palestra / Mini-curso",
    audience: "Executivos, líderes, famílias",
    desc: "Visão 360° do impacto da IA: carreira, empresa, família e sociedade.",
  },
  {
    id: "acelerando-ia",
    title: "Acelerando a Implementação da IA",
    badge: "Palestra",
    audience: "C-level, inovação",
    desc: "Drives e riscos da adoção de IA nas organizações — eficiência, governança e inovação.",
  },
  {
    id: "800km",
    title: "800 km, Um Passo de Cada Vez",
    badge: "Palestra Motivacional",
    audience: "Todos os públicos",
    desc: "Lições do Caminho de Santiago aplicadas à vida corporativa.",
  }
];

export default function Palestras() {
  return (
    <section id="palestras" className="w-full py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-bold mb-4">
            PALESTRAS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Temas para Contratação
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {palestras.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="group flex flex-col p-8 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.15)] transition-all duration-300"
            >
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="text-[10px] font-medium text-foreground/70 bg-foreground/[0.06] px-3 py-1 rounded-full border border-border">
                  {p.badge}
                </span>
                <span className="text-[10px] font-medium text-indigo-500 dark:text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  {p.audience}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 leading-snug">
                {p.title}
              </h3>
              
              <p className="text-sm text-foreground/50 leading-relaxed flex-grow mb-8">
                {p.desc}
              </p>
              
              <div className="mt-auto">
                <a 
                  href="#contato"
                  className="inline-flex items-center text-sm font-medium text-primary group-hover:text-primary/80 transition-colors"
                >
                  Agendar →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
