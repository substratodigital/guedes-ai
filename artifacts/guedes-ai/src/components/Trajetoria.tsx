import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";

const timelineData = {
  experiencia: [
    { year: "2015–hoje", role: "Consultor Estratégico", org: "FIA Consulting", desc: "30+ projetos para governos e grandes empresas" },
    { year: "2009–hoje", role: "Professor-Doutor", org: "FIA/Einstein", desc: "IA, Inovação e Criatividade" },
    { year: "2011–2012", role: "Head FP&A Latam", org: "Google", desc: "Liderança financeira para a América Latina" },
  ],
  formacao: [
    { year: "2022–2024", role: "Pós-Doc IA", org: "FEA/USP", desc: "" },
    { year: "2008–2012", role: "Doutorado Inovação", org: "FEA/USP", desc: "" },
    { year: "2007", role: "MBA Internacional", org: "FIA", desc: "Módulos em Cambridge, Lyon, Vanderbilt" },
    { year: "2002–2004", role: "MSc Operações", org: "FGV/EAESP", desc: "" },
    { year: "1990–1995", role: "Eng. Computadores", org: "FEI", desc: "" },
  ],
  institucional: [
    { year: "2025–", role: "Consultor", org: "ABNT IA", desc: "" },
    { year: "2023–", role: "Conselheiro", org: "Pref SP Clima", desc: "" },
    { year: "2023–", role: "Membro", org: "Comissão Tecnologia Quântica ABNT", desc: "" },
    { year: "2023–2025", role: "Articulista", org: "Isto É Dinheiro", desc: "" },
  ]
};

type TabKey = keyof typeof timelineData;

export default function Trajetoria() {
  const [activeTab, setActiveTab] = useState<TabKey>("experiencia");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="w-full py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-bold mb-4">
            TRAJETÓRIA
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-10">
            Uma Carreira em Dois Mundos
          </h2>

          <div className="flex flex-wrap gap-6 border-b border-border">
            {(Object.keys(timelineData) as TabKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`pb-4 text-sm font-medium transition-colors relative ${
                  activeTab === key ? "text-primary" : "text-foreground/50 hover:text-foreground/80"
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
                {activeTab === key && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="relative pt-8 pb-16" ref={containerRef}>
          <div className="absolute left-0 top-8 bottom-16 w-px bg-border" />
          <motion.div 
            className="absolute left-0 top-8 bottom-16 w-px bg-primary origin-top"
            style={{ scaleY }}
          />

          <div className="space-y-10">
            {timelineData[activeTab].map((item, index) => (
              <motion.div 
                key={`${activeTab}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                className="relative pl-8"
              >
                <div className="absolute left-[-4px] top-1.5 w-[9px] h-[9px] rounded-full bg-background border-2 border-primary" />
                <div className="flex flex-col items-start gap-1">
                  <span className="text-xs font-mono text-foreground/40 mb-1 bg-foreground/[0.04] border border-border px-2 py-0.5 rounded-md">
                    {item.year}
                  </span>
                  <h3 className="text-base font-semibold text-foreground">
                    {item.role}
                  </h3>
                  <div className="text-sm font-medium text-primary mb-1">
                    {item.org}
                  </div>
                  {item.desc && (
                    <p className="text-sm text-foreground/50">
                      {item.desc}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
