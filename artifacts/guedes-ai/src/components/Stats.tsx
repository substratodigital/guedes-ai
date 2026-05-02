import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 100, suffix: "+", label: "Palestras" },
  { value: 30, suffix: "+", label: "Anos" },
  { value: 60, suffix: "+", label: "Artigos" },
  { value: 200, suffix: "+", label: "Congressos" },
  { value: 50, suffix: "+", label: "Projetos" },
  { value: 19, suffix: "", label: "Prêmios" },
  { value: 5, suffix: "", label: "Países" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500;
      const fps = 60;
      const increment = value / (duration / (1000 / fps));
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / fps);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-teal-400">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="w-full py-20 bg-[#0C0C10] border-y border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <div className="font-bold text-5xl md:text-6xl mb-2 tracking-tight">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium text-white/50 tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
