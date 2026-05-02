import { motion } from "framer-motion";

export default function Newsletter() {
  return (
    <section id="newsletter" className="w-full py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-indigo-400 font-bold mb-6">
            NEWSLETTER
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 gradient-text">
            Newsletter do Guedes
          </h2>
          
          <p className="text-lg md:text-xl text-white/50 leading-relaxed mb-8 max-w-2xl mx-auto">
            Reflexões mensais sobre IA, inovação e o futuro do trabalho. Sem hype. Sem pauta de vendas.
          </p>

          <div className="mb-10 flex items-center justify-center">
            <span className="text-xs font-medium text-white/60 bg-white/[0.03] border border-white/10 px-4 py-1.5 rounded-full">
              Mensal · Gratuita · LinkedIn
            </span>
          </div>

          <a 
            href="https://www.linkedin.com/newsletters/newsletter-do-guedes-7186097313407258624/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-8 py-3.5 rounded-full transition-all"
            data-testid="link-newsletter-linkedin"
          >
            Assinar no LinkedIn →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
