import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const publications = [
  { type: "Livro",  year: "2019", title: "Criatividade, Modelos Mentais e Inovação", venue: "Editora Senac", url: null },
  { type: "Artigo", year: "2024", title: "Artificial intelligence adoption in public organizations: a case study", venue: "Future Studies Research Journal", url: "https://www.revistafuture.org/FSRJ/article/view/860" },
  { type: "Artigo", year: "2024", title: "Barreiras à adoção de IA em organizações do setor público brasileiro", venue: "Cadernos EBAPE.BR", url: null },
  { type: "Artigo", year: "2023", title: "IA generativa e tomada de decisão organizacional: oportunidades e riscos", venue: "Future Studies Research Journal", url: null },
  { type: "Artigo", year: "2022", title: "Gestão da Inovação em Organizações Públicas: estudo multicaso", venue: "RAP – Revista de Administração Pública", url: null },
  { type: "Artigo", year: "2020", title: "Maturidade em Gestão do Conhecimento e Inovação: análise em grandes empresas", venue: "INMR – Innovation & Management Review", url: null },
  { type: "Artigo", year: "2019", title: "Inovação aberta e ecossistemas de startups: o papel dos grandes players", venue: "RAE – Revista de Administração de Empresas", url: null },
  { type: "Artigo", year: "2018", title: "Technology roadmapping: A methodological proposition to refine Delphi results", venue: "Technological Forecasting and Social Change", url: "https://www.sciencedirect.com/science/article/abs/pii/S0040162516306734" },
  { type: "Artigo", year: "2017", title: "O mapeamento de uma cadeia extrativista na Amazônia", venue: "RGSA/ANPAD", url: "https://rgsa.openaccesspublications.org/rgsa/article/view/1222" },
];

export default function Publicacoes() {
  const { t } = useLanguage();
  const [filterIndex, setFilterIndex] = useState(0);

  const filters = t.publicacoes.filters;
  const activeFilter = filters[filterIndex];
  const isAll = filterIndex === 0;

  const filtered = publications.filter((p) => {
    if (isAll) return true;
    const ptFilters = ["Todos", "Artigo", "Livro", "Capítulo"];
    const ptKey = ptFilters[filterIndex];
    return p.type === ptKey;
  });

  return (
    <section id="publicacoes" className="w-full py-32 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-bold mb-4">
            {t.publicacoes.label}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-8">
            {t.publicacoes.h2}
          </h2>

          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f, i) => (
              <button
                key={f}
                onClick={() => setFilterIndex(i)}
                className={`text-xs font-medium px-4 py-2 rounded-full transition-all border ${
                  filterIndex === i
                    ? "bg-foreground/10 border-foreground/20 text-foreground"
                    : "bg-transparent border-transparent text-foreground/50 hover:text-foreground/80 hover:bg-foreground/[0.05]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((pub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
              className="bg-card border border-border rounded-xl p-5 flex flex-col h-full hover:border-foreground/20 transition-colors group relative"
            >
              {pub.url && (
                <a href={pub.url} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 text-foreground/20 group-hover:text-foreground/50 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-medium text-foreground/60 bg-foreground/[0.06] border border-border px-2 py-0.5 rounded-full">
                  {t.publicacoes.typeMap[pub.type] ?? pub.type}
                </span>
                <span className="text-xs font-mono text-foreground/35">{pub.year}</span>
              </div>
              <h3 className="text-sm font-medium text-foreground/90 leading-snug mb-3">{pub.title}</h3>
              <div className="mt-auto pt-2">
                <p className="text-xs text-primary font-medium">{pub.venue}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-foreground/40 mb-4">{t.publicacoes.footerText}</p>
          <a
            href="https://www.linkedin.com/in/lguedes/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            {t.publicacoes.footerLink}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
