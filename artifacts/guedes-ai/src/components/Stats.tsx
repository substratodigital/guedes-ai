import React from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 100, suffix: "+", label: "Palestras nos últimos 5 anos", badge: "IMPACTO" },
  { value: 30, suffix: "+", label: "Anos de Experiência", badge: "CARREIRA" },
  { value: 60, suffix: "+", label: "Artigos Científicos", badge: "PESQUISA" },
  { value: 200, suffix: "+", label: "Congressos Acadêmicos", badge: "ACADEMIA" },
  { value: 50, suffix: "+", label: "Projetos de Consultoria", badge: "MERCADO" },
  { value: 19, suffix: "", label: "Prêmios de Excelência Didática", badge: "RECONHECIMENTO" },
  { value: 7, suffix: "", label: "Países: Brasil, EUA, Egito, Colômbia, Espanha...", badge: "GLOBAL" },
];

function Counter({ value, suffix }: { value: number, suffix: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // ms
      const increment = value / (duration / 16); // 60fps
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-[#00C896]">
      {count}{suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-24 bg-[#0A0E27]/80 bg-grid relative overflow-hidden border-t border-b border-border">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-mono text-xl md:text-2xl text-muted-foreground uppercase tracking-widest">
            Nos últimos 5 anos
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              className="flex flex-col items-center text-center p-6 bg-card rounded-sm border border-card-border hover:border-primary/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="font-mono text-4xl md:text-5xl font-bold mb-4 drop-shadow-[0_0_10px_rgba(0,200,150,0.5)]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="text-base md:text-lg text-foreground font-medium mb-4">
                {stat.label}
              </h3>
              <span className="font-pixel text-[8px] md:text-[10px] text-secondary border border-secondary/30 px-2 py-1 rounded-sm bg-secondary/10">
                {stat.badge}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}