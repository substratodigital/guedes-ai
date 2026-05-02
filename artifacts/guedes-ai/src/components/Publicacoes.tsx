import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

const publications = [
  {
    type: "Livro",
    year: "2019",
    title: "Criatividade, Modelos Mentais e Inovação",
    venue: "Editora Senac",
    url: null
  },
  {
    type: "Artigo",
    year: "2024",
    title: "Artificial intelligence adoption in public organizations: a case study",
    venue: "Future Studies Research Journal",
    url: "https://www.revistafuture.org/FSRJ/article/view/860"
  },
  {
    type: "Artigo",
    year: "2024",
    title: "Barreiras à adoção de IA em organizações do setor público brasileiro",
    venue: "Cadernos EBAPE.BR",
    url: null
  },
  {
    type: "Artigo",
    year: "2023",
    title: "IA generativa e tomada de decisão organizacional: oportunidades e riscos",
    venue: "Future Studies Research Journal",
    url: null
  },
  {
    type: "Artigo",
    year: "2022",
    title: "Gestão da Inovação em Organizações Públicas: estudo multicaso",
    venue: "RAP – Revista de Administração Pública",
    url: null
  },
  {
    type: "Artigo",
    year: "2020",
    title: "Maturidade em Gestão do Conhecimento e Inovação: análise em grandes empresas",
    venue: "INMR – Innovation & Management Review",
    url: null
  },
  {
    type: "Artigo",
    year: "2019",
    title: "Inovação aberta e ecossistemas de startups: o papel dos grandes players",
    venue: "RAE – Revista de Administração de Empresas",
    url: null
  },
  {
    type: "Artigo",
    year: "2018",
    title: "Technology roadmapping: A methodological proposition to refine Delphi results",
    venue: "Technological Forecasting and Social Change",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0040162516306734"
  },
  {
    type: "Artigo",
    year: "2017",
    title: "O mapeamento de uma cadeia extrativista na Amazônia",
    venue: "RGSA/ANPAD",
    url: "https://rgsa.openaccesspublications.org/rgsa/article/view/1222"
  },
];

type FilterKey = "Todos" | "Artigo" | "Livro" | "Capítulo";

export default function Publicacoes() {
  const [filter, setFilter] = useState<FilterKey>("Todos");

  const filtered = publications.filter(p => filter === "Todos" || p.type === filter);

  return (
    <section id="publicacoes" className="w-full py-32 px-6 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-indigo-400 font-bold mb-4">
            PUBLICAÇÕES
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-8">
            60+ Artigos · 1 Livro · 4 Capítulos
          </h2>

          <div className="flex flex-wrap gap-2 mb-10">
            {["Todos", "Artigo", "Livro", "Capítulo"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as FilterKey)}
                className={`text-xs font-medium px-4 py-2 rounded-full transition-all border ${
                  filter === f 
                    ? "bg-white/10 border-white/20 text-white" 
                    : "bg-transparent border-transparent text-white/50 hover:text-white/80 hover:bg-white/5"
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
              className="bg-[#0F0F13] border border-white/[0.06] rounded-xl p-5 flex flex-col h-full hover:border-white/[0.12] transition-colors group relative"
            >
              {pub.url && (
                <a href={pub.url} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 text-white/20 group-hover:text-white/50 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-medium text-white/70 bg-white/[0.05] border border-white/[0.08] px-2 py-0.5 rounded-full">
                  {pub.type}
                </span>
                <span className="text-xs font-mono text-white/30">
                  {pub.year}
                </span>
              </div>
              <h3 className="text-sm font-medium text-white/90 leading-snug mb-3">
                {pub.title}
              </h3>
              <div className="mt-auto pt-2">
                <p className="text-xs text-indigo-400 font-medium">
                  {pub.venue}
                </p>
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
          <p className="text-sm text-white/40 mb-4">+52 artigos publicados</p>
          <a 
            href="https://www.linkedin.com/in/lguedes/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
          >
            Ver todos no Lattes / Google Scholar →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
