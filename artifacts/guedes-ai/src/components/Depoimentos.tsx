import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Linkedin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Depoimentos() {
  const { t } = useLanguage();

  return (
    <section id="depoimentos" className="w-full py-16 md:py-32 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-pixel mb-4">
            {t.depoimentos.label}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            {t.depoimentos.h2}
          </h2>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            dragFree: true
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {t.depoimentos.items.map((d, i) => (
              <CarouselItem key={i} className="pl-6 basis-[85vw] md:basis-[400px]">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  className="bg-card border border-border rounded-2xl p-8 flex flex-col h-full"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-primary text-xs">★</span>
                    ))}
                  </div>
                  <p className="font-serif italic text-foreground/80 text-lg leading-relaxed flex-grow mb-8">
                    "{d.quote}"
                  </p>
                  <div className="mt-auto">
                    <a 
                      href={d.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group"
                    >
                      <div className="flex-1">
                        <p className="text-xs font-medium text-foreground tracking-wide uppercase group-hover:text-primary transition-colors">
                          {d.author}
                        </p>
                        <p className="text-[10px] text-foreground/50 uppercase tracking-wider mt-1">
                          {d.role}
                        </p>
                      </div>
                      <Linkedin className="w-4 h-4 text-foreground/30 group-hover:text-primary transition-colors shrink-0" />
                    </a>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
