import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import ia360 from "@assets/image_1777765594782.png";
import iaAcelerando from "@assets/image_1777765683539.png";
import caminhar from "@assets/image_1777765706628.png";

const palestras = [
  {
    id: "ia-360",
    title: "IA | 360",
    badge: "Palestra / Mini-curso",
    audience: "Executivos, líderes, famílias",
    desc: "Visão 360° do impacto da IA: carreira, empresa, família e sociedade.",
    image: ia360,
    details: [
      "Como a IA pode ser utilizada para acelerar seu aprendizado, aumentar sua eficiência e influência.",
      "Oportunidades com o uso da IA do tamanho dos desafios: técnicos, humanos e éticos.",
      "Como líderes e pessoas influentes podem usar ferramentas de IA para apoiar o progresso de suas comunidades e sociedade.",
    ],
    fullTitle: "Fundamentos de IA para um novo mundo",
  },
  {
    id: "acelerando-ia",
    title: "Acelerando a Implementação da IA",
    badge: "Palestra",
    audience: "C-level, inovação",
    desc: "Drives e riscos da adoção de IA nas organizações — eficiência, governança e inovação.",
    image: iaAcelerando,
    details: [
      "A primeira fronteira da adoção de IA é a busca pelo aumento da eficiência.",
      "A IA deve estar a serviço da inovação em suas formas tecnológica, gerencial e nos processos.",
      "A comunidade acadêmica e as boas práticas indicam que o humano deve estar no controle das decisões." 
    ],
    fullTitle: "Acelerando a implementação da IA",
  },
  {
    id: "800km",
    title: "800 km, Um Passo de Cada Vez",
    badge: "Palestra Motivacional",
    audience: "Todos os públicos",
    desc: "Lições do Caminho de Santiago aplicadas à vida corporativa.",
    image: caminhar,
    details: [
      "As lições de superação, solidariedade, confiança, fraternidade e tenacidade do caminho.",
      "Paralelos entre a vida corporativa e o que aprendi ao longo das duas vezes em que fiz o Caminho de Santiago.",
      "A conversa convida a estabelecer condições, traçar o caminho e escolher com cuidado sua companhia.",
    ],
    fullTitle: "Inspiração e energia para a mudança",
  },
];

export default function Palestras() {
  const [selected, setSelected] = useState<(typeof palestras)[number] | null>(null);
  const selectedIndex = useMemo(() => palestras.findIndex((p) => p.id === selected?.id), [selected]);

  return (
    <section id="palestras" className="w-full py-32 px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
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
            <motion.button
              key={p.id}
              type="button"
              onClick={() => setSelected(p)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card text-left shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-all duration-300"
            >
              <div className="relative h-[260px] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="relative p-8 -mt-16">
                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="text-[10px] font-medium text-foreground/70 bg-foreground/[0.06] px-3 py-1 rounded-full border border-border backdrop-blur-sm">
                    {p.badge}
                  </span>
                  <span className="text-[10px] font-medium text-indigo-500 dark:text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 backdrop-blur-sm">
                    {p.audience}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3 leading-snug">
                  {p.title}
                </h3>

                <p className="text-sm text-foreground/50 leading-relaxed mb-8">
                  {p.desc}
                </p>

                <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Ver detalhes <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.aside
              initial={{ x: 520, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 520, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-full max-w-[520px] bg-background border-l border-border shadow-2xl overflow-y-auto"
            >
              <div className="relative h-72">
                <img src={selected.image} alt={selected.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-md"
                  aria-label="Fechar detalhes"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[10px] font-medium text-foreground/70 bg-foreground/[0.06] px-3 py-1 rounded-full border border-border">
                    {selected.badge}
                  </span>
                  <span className="text-[10px] font-medium text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                    {selected.audience}
                  </span>
                </div>

                <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-bold mb-4">
                  {selected.id === "ia-360" ? "IA | 360" : selected.id === "acelerando-ia" ? "DRIVES E RISCOS" : "800 KM"}
                </div>

                <h3 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                  {selected.fullTitle}
                </h3>

                <p className="text-foreground/60 mb-8 leading-relaxed">
                  {selected.desc}
                </p>

                <div className="space-y-4">
                  {selected.details.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="rounded-2xl border border-border bg-card p-4 text-sm text-foreground/70 leading-relaxed"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>

                <a
                  href="#contato"
                  onClick={() => setSelected(null)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Agendar palestra
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
