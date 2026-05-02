import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Users, GraduationCap, Search, BookOpen, Globe } from "lucide-react";

const solucoes = [
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: "Consultoria Estratégica",
    desc: "Projetos em estratégia, inovação, eficiência e liderança para governos e grandes empresas."
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Mentoria Executiva",
    desc: "Orientação personalizada para executivos navegarem desafios e desenvolverem habilidades de liderança."
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-primary" />,
    title: "Desenvolvimento Gerencial",
    desc: "Programas customizados com certificado FIA Business School, do workshop à pós-graduação."
  },
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: "Research as a Service",
    desc: "Pesquisas com rigor acadêmico sobre IA, mercados e tendências emergentes."
  },
  {
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    title: "Coprodução Acadêmica",
    desc: "Artigos científicos, white papers e position papers para journals e congressos."
  },
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: "Palestras Internacionais",
    desc: "Temas customizáveis para qualquer setor, público ou contexto — em PT, EN ou ES."
  }
];

export function Solucoes() {
  return (
    <section id="solucoes" className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-mono text-4xl md:text-5xl font-bold text-foreground mb-4">
            Além das Palestras
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ecossistema completo de soluções para transformar conhecimento em resultados reais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {solucoes.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card p-8 border border-card-border rounded-sm hover:border-primary transition-all duration-300 group hover:shadow-[0_0_20px_rgba(45,53,255,0.15)]"
            >
              <div className="mb-6 p-4 bg-background inline-block rounded-sm border border-border group-hover:scale-110 transition-transform duration-300 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-mono">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a 
            href="#contato"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block bg-transparent border border-primary text-primary px-8 py-4 font-bold text-lg clipped-corner hover:bg-primary hover:text-primary-foreground transition-all shadow-[0_0_15px_rgba(45,53,255,0.2)]"
            data-testid="button-solucoes-fale"
          >
            Fale sobre seu projeto
          </a>
        </div>
      </div>
    </section>
  );
}