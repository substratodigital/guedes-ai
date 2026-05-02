import React from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

export function Newsletter() {
  return (
    <section id="newsletter" className="py-24 relative overflow-hidden bg-[#0A0E27]">
      {/* Intense Glow Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-4xl h-[200px] bg-primary/30 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center bg-card/40 backdrop-blur-md border border-primary/20 p-10 md:p-16 rounded-sm shadow-[0_0_40px_rgba(45,53,255,0.1)]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center space-x-2 font-pixel text-[10px] text-[#00C896] bg-[#00C896]/10 border border-[#00C896]/30 px-3 py-1.5 rounded-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse" />
            <span>1x por mês · Gratuito · LinkedIn</span>
          </div>

          <h2 className="font-mono text-3xl md:text-5xl font-bold text-foreground mb-6">
            NEWSLETTER DO GUEDES
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Reflexões mensais sobre IA, inovação e o futuro do trabalho. Sem hype. Sem pauta de vendas. Apenas análise profunda.
          </p>

          <a 
            href="https://www.linkedin.com/newsletters/newsletter-do-guedes-7186097313407258624/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#0A66C2] text-white px-8 py-4 font-bold text-lg clipped-corner hover:bg-[#004182] transition-colors shadow-[0_0_20px_rgba(10,102,194,0.4)]"
            data-testid="link-newsletter-linkedin"
          >
            <Linkedin className="w-5 h-5 mr-3" />
            Assinar no LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}