import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Bio() {
  const { t } = useLanguage();

  return (
    <section id="trajetoria" className="w-full py-16 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-pixel mb-6">
            {t.bio.label}
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 gradient-text leading-tight">
            {t.bio.h2}
          </h2>

          <div className="flex flex-wrap gap-3 mb-10">
            {t.bio.pills.map((pill, i) => (
              <span
                key={i}
                className="text-[11px] font-medium text-foreground/60 border border-border bg-foreground/[0.03] rounded-full px-4 py-1.5"
              >
                {pill}
              </span>
            ))}
          </div>

          <div className="space-y-6 text-foreground/60 text-lg leading-relaxed max-w-3xl mb-8">
            <p>{t.bio.p}</p>
          </div>

          <div className="mb-12">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full border-primary/30 bg-transparent hover:bg-primary/10 text-primary px-5 py-2 text-sm font-medium transition-all duration-300 h-auto">
                  + BIO
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border custom-scrollbar">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold mb-4">Luís Guedes, PhD</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-foreground/80 leading-relaxed">
                  {t.bio.fullBio.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <blockquote className="border-l-2 border-primary pl-6 py-1 max-w-3xl">
            <p className="font-serif italic text-2xl md:text-3xl text-foreground/80 leading-snug">
              "{t.bio.quote}"
            </p>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
