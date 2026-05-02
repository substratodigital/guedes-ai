import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const palestras = [
  {
    id: "ia-360",
    title: "IA | 360 — Fundamentos de IA para um Novo Mundo",
    type: "Palestra / Mini-curso",
    audience: "Para executivos, líderes, famílias",
    shortDesc: "Visão 360° do impacto da IA: carreira, empresa, família e sociedade.",
    fullDesc: "Uma jornada imersiva para desmistificar a Inteligência Artificial e entender seu impacto profundo e abrangente. Aborda como a IA transforma os modelos de negócios, exige novas habilidades profissionais e remodela as dinâmicas sociais e familiares. Uma visão equilibrada entre oportunidades e riscos éticos.",
    image: "/palestra-1.png",
  },
  {
    id: "acelerando-ia",
    title: "Acelerando a Implementação da IA",
    type: "Palestra",
    audience: "Para líderes de inovação, C-level",
    shortDesc: "Drives e riscos da adoção de IA nas organizações — eficiência, governança e inovação.",
    fullDesc: "Focada em líderes que precisam ir além do hype. Estratégias pragmáticas para integrar IA aos processos organizacionais, garantindo governança, mitigação de riscos e retorno sobre investimento. Como construir uma cultura orientada a dados e adaptar a força de trabalho para a colaboração humano-máquina.",
    image: "/palestra-2.png",
  },
  {
    id: "800km",
    title: "800 km, Um Passo de Cada Vez",
    type: "Palestra Motivacional",
    audience: "Para todos os públicos corporativos",
    shortDesc: "Lições do Caminho de Santiago aplicadas à vida corporativa.",
    fullDesc: "Metáforas poderosas baseadas em uma jornada real de 800 km a pé. Explora resiliência, foco no essencial, superação de limites e a importância de celebrar as pequenas vitórias. Uma reflexão profunda sobre propósito, saúde mental e sustentabilidade na busca por resultados em ambientes de alta pressão.",
    image: "/palestra-3.png",
  }
];

function TiltCard({ palestra, index }: { palestra: typeof palestras[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || expanded) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    if (!expanded) {
      setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    }
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
    if (!expanded) {
      setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="h-full"
    >
      <div 
        ref={cardRef}
        className={`relative h-full bg-card border border-card-border rounded-sm overflow-hidden transition-all duration-300 ${expanded ? 'shadow-[0_0_30px_rgba(45,53,255,0.3)] border-primary' : 'hover:shadow-[0_0_20px_rgba(45,53,255,0.2)] hover:border-primary/50'}`}
        style={{ transform, transformStyle: "preserve-3d", transition: transform !== "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)" ? "none" : "transform 0.5s ease" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="h-48 overflow-hidden relative">
          <div className="absolute inset-0 bg-background/40 z-10" />
          <img 
            src={palestra.image} 
            alt={palestra.title} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            data-testid={`img-palestra-${palestra.id}`}
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="font-pixel text-[8px] bg-background/80 backdrop-blur text-foreground border border-border px-3 py-1 rounded-sm">
              {palestra.type}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col h-[calc(100%-12rem)]">
          <h3 className="font-mono text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight" style={{ transform: "translateZ(30px)" }}>
            {palestra.title}
          </h3>
          
          <p className="text-sm text-primary mb-4 font-medium">
            {palestra.audience}
          </p>
          
          <p className="text-muted-foreground mb-6 flex-grow">
            {expanded ? palestra.fullDesc : palestra.shortDesc}
          </p>

          <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
            <button 
              onClick={toggleExpand}
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid={`btn-expand-${palestra.id}`}
            >
              {expanded ? (
                <>Menos detalhes <ChevronUp className="ml-1 w-4 h-4" /></>
              ) : (
                <>Mais detalhes <ChevronDown className="ml-1 w-4 h-4" /></>
              )}
            </button>
            
            <a 
              href="#contato"
              onClick={(e) => {
                const element = document.getElementById("contato");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-primary text-sm font-bold hover:text-primary-foreground hover:bg-primary px-4 py-2 clipped-corner transition-colors border border-primary/30 hover:border-transparent"
              data-testid={`link-agendar-${palestra.id}`}
            >
              Agendar
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Palestras() {
  return (
    <section id="palestras" className="py-24 bg-background relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <span className="font-pixel text-[10px] text-secondary inline-block mb-4 tracking-widest border border-secondary/30 px-3 py-1 rounded-sm bg-secondary/5">PORTFOLIO DE TEMAS</span>
          <h2 className="font-mono text-4xl md:text-5xl font-bold text-foreground">
            Palestras & Cursos
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {palestras.map((palestra, i) => (
            <TiltCard key={palestra.id} palestra={palestra} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}