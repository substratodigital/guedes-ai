import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Building2 } from "lucide-react";

const tabs = [
  { id: "experiencia", label: "Experiência", icon: <Briefcase className="w-4 h-4 mr-2" /> },
  { id: "educacao", label: "Educação", icon: <GraduationCap className="w-4 h-4 mr-2" /> },
  { id: "institucional", label: "Atuação Institucional", icon: <Building2 className="w-4 h-4 mr-2" /> },
];

const timelineData = {
  experiencia: [
    { year: "Desde 2015", title: "Consultor Estratégico", org: "FIA Consulting", desc: "30+ projetos para governos e grandes empresas" },
    { year: "Desde 2009", title: "Professor-Doutor em IA, Inovação e Criatividade", org: "FIA Business School / Albert Einstein", desc: "19 prêmios de excelência didática" },
    { year: "2011–2012", title: "Head FP&A Latam", org: "Google", desc: "Liderança financeira para a América Latina" },
  ],
  educacao: [
    { year: "2022–2024", title: "Pós-Doutorado em IA", org: "FEA/USP", desc: "" },
    { year: "2008–2012", title: "Doutorado em Inovação", org: "FEA/USP", desc: "" },
    { year: "2007", title: "MBA Executivo Internacional", org: "FIA", desc: "Módulos em Cambridge, Lyon, Vanderbilt" },
    { year: "2002–2004", title: "Mestrado em Gestão de Operações", org: "FGV/EAESP", desc: "" },
    { year: "1990–1995", title: "Engenharia de Computadores", org: "FEI", desc: "" },
  ],
  institucional: [
    { year: "Desde 2025", title: "Consultor", org: "Comissão Brasileira de IA da ABNT", desc: "" },
    { year: "Desde 2023", title: "Conselheiro", org: "Prefeitura de SP para Políticas Climáticas", desc: "" },
    { year: "Desde 2023", title: "Membro", org: "Comissão de Tecnologia Quântica da ABNT", desc: "" },
    { year: "2023–2025", title: "Articulista de Inovação", org: "Revista Isto É Dinheiro", desc: "" },
  ]
};

export function Trajetoria() {
  const [activeTab, setActiveTab] = useState<keyof typeof timelineData>("experiencia");
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="trajetoria" className="py-24 bg-[#0A0E27] relative overflow-hidden">
      <div className="absolute inset-0 scanlines opacity-50" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <h2 className="font-mono text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">
          Trajetória
        </h2>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-6 py-3 text-sm md:text-base font-medium rounded-sm border transition-all ${
                activeTab === tab.id 
                  ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(45,53,255,0.3)]" 
                  : "bg-card border-card-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
              data-testid={`tab-${tab.id}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative" ref={containerRef}>
          {/* Central Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          <motion.div 
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[3px] bg-primary -translate-x-1/2 origin-top"
            style={{ scaleY }}
          />

          <div className="space-y-12">
            {timelineData[activeTab].map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={`${activeTab}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex md:justify-between items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Connector Dot */}
                  <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(45,53,255,0.8)]" />
                  
                  {/* Content Card */}
                  <div className={`w-[calc(100%-50px)] ml-[50px] md:ml-0 md:w-[calc(50%-40px)] ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="bg-card p-6 border border-card-border rounded-sm hover:border-primary/50 transition-colors">
                      <span className="font-mono text-primary font-bold text-sm md:text-base mb-2 block">{item.year}</span>
                      <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground font-medium mb-2">{item.org}</p>
                      {item.desc && <p className="text-sm text-muted-foreground/80">{item.desc}</p>}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}