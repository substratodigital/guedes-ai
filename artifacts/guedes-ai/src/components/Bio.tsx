import { motion } from "framer-motion";

export default function Bio() {
  return (
    <section id="trajetoria" className="w-full py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-bold mb-6">
            TRAJETÓRIA
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 gradient-text leading-tight">
            O Especialista que Une Ciência e Prática
          </h2>
          
          <div className="space-y-6 text-foreground/60 text-lg leading-relaxed max-w-3xl mb-12">
            <p>
              Executivo com mais de 30 anos de mercado, pós-doutor em IA pela FEA/USP e professor premiado. Autor de "Criatividade, Modelos Mentais e Inovação". Minha trajetória é definida pela intersecção entre o rigor acadêmico e a aplicação prática nos negócios.
            </p>
          </div>
          
          <blockquote className="border-l-2 border-primary pl-6 py-1 mb-12 max-w-3xl">
            <p className="font-serif italic text-2xl md:text-3xl text-foreground/80 leading-snug">
              "Busco inspirar novas reflexões, provocar as pessoas para repensar o sucesso e apoiar a mudança em direção a um novo capitalismo: veloz, eficiente, equilibrado."
            </p>
          </blockquote>
          
          <div className="flex flex-wrap gap-3">
            {[
              "Pós-Doutor FEA/USP",
              "Doutor FEA/USP",
              "MSc FGV",
              "Ex-Google",
              "FIA Consulting",
              "ABNT IA"
            ].map((pill, i) => (
              <span 
                key={i}
                className="text-[11px] font-medium text-foreground/60 border border-border bg-foreground/[0.03] rounded-full px-4 py-1.5"
              >
                {pill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
