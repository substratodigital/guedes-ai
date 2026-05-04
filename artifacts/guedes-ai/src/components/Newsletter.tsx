import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Newsletter() {
  const { t } = useLanguage();

  return (
    <section id="newsletter" className="w-full py-16 md:py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-pixel mb-6">
            {t.newsletter.label}
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 gradient-text">
            {t.newsletter.h2}
          </h2>

          <p className="text-lg md:text-xl text-foreground/50 leading-relaxed mb-8 max-w-2xl mx-auto">
            {t.newsletter.p}
          </p>



          <a
            href="https://www.linkedin.com/newsletters/newsletter-do-guedes-7186097313407258624/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm px-8 py-3.5 rounded-full transition-all"
            data-testid="link-newsletter-linkedin"
          >
            {t.newsletter.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
