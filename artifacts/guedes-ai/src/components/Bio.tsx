import React from "react";
import { motion } from "framer-motion";

export function Bio() {
  return (
    <section id="especialista" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <motion.div 
            className="flex-1 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-mono text-3xl md:text-5xl font-bold text-foreground">
              O Especialista que Une Ciência e Prática
            </h2>
            
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Executivo com mais de 30 anos de mercado, pós-doutor em IA pela FEA/USP e professor premiado. Autor de "Criatividade, Modelos Mentais e Inovação". Minha trajetória é definida pela intersecção entre o rigor acadêmico e a aplicação prática nos negócios.
              </p>
              
              <blockquote className="font-serif text-2xl md:text-3xl italic text-primary border-l-4 border-primary pl-6 py-2 my-8">
                "Busco inspirar novas reflexões, provocar as pessoas para repensar o sucesso e apoiar a mudança em direção a um novo capitalismo: veloz, eficiente, equilibrado."
              </blockquote>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="space-y-2">
                <span className="font-pixel text-[10px] text-secondary inline-block bg-secondary/10 px-2 py-1 border border-secondary/30 rounded-sm mb-2">30+ Anos na Estrada</span>
                <p className="text-sm text-muted-foreground">Vivência executiva real, transformando teoria em resultados tangíveis.</p>
              </div>
              <div className="space-y-2">
                <span className="font-pixel text-[10px] text-secondary inline-block bg-secondary/10 px-2 py-1 border border-secondary/30 rounded-sm mb-2">Entre Dois Mundos</span>
                <p className="text-sm text-muted-foreground">Ponte entre a vanguarda tecnológica e as dinâmicas humanas organizacionais.</p>
              </div>
              <div className="space-y-2">
                <span className="font-pixel text-[10px] text-secondary inline-block bg-secondary/10 px-2 py-1 border border-secondary/30 rounded-sm mb-2">Com os Olhos Bem Abertos</span>
                <p className="text-sm text-muted-foreground">Visão crítica e realista sobre as promessas e os perigos da IA.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Abstract Geometric Composition */}
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px]" />
              <div className="absolute inset-4 border border-primary/20 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-8 border border-secondary/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
              <div className="absolute inset-16 border border-[#00C896]/20 rounded-full animate-[spin_20s_linear_infinite]" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-wrap justify-center gap-4 max-w-[80%]">
                  {['Ex-Google', 'FEA/USP', 'FGV/EAESP', 'FIA Consulting', 'ABNT'].map((cred, i) => (
                    <span 
                      key={cred}
                      className="font-mono text-sm md:text-base text-foreground bg-card border border-primary/50 px-4 py-2 rounded-sm shadow-[0_0_15px_rgba(45,53,255,0.2)] clipped-corner"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}