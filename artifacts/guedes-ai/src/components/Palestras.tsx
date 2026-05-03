import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X, ChevronLeft, ChevronRight, Megaphone, CheckCircle2, AlertTriangle } from "lucide-react";
import ia360 from "@assets/image_1777765594782.png";
import iaAcelerando from "@assets/image_1777765683539.png";
import caminhar from "@assets/image_1777765706628.png";

type Detail =
  | { kind: "text"; text: string }
  | { kind: "two-col"; left: { icon: "check" | "alert"; label: string; items: { title: string; desc: string }[] }; right: { icon: "check" | "alert"; label: string; items: { title: string; desc: string }[] } }
  | { kind: "grid"; items: { title: string; desc: string }[] }
  | { kind: "quote"; text: string };

interface Palestra {
  id: string;
  title: string;
  badge: string;
  audience: string;
  desc: string;
  image: string;
  accentColor: string;
  subtitle: string;
  tagline: string;
  fullDesc: string;
  details: Detail[];
}

const palestras: Palestra[] = [
  {
    id: "ia-360",
    title: "IA | 360",
    badge: "Palestra / Mini-curso",
    audience: "Executivos, líderes, famílias",
    desc: "Visão 360° do impacto da IA: carreira, empresa, família e sociedade.",
    image: ia360,
    accentColor: "#6366f1",
    subtitle: "2025",
    tagline: "Fundamentos de IA para um novo mundo",
    fullDesc:
      "Uma palestra que explora como a Inteligência Artificial está transformando simultaneamente nossas carreiras, empresas, famílias e a sociedade — com profundidade acadêmica e linguagem acessível.",
    details: [
      {
        kind: "grid",
        items: [
          {
            title: "Sua Carreira e Seu Futuro",
            desc: "Como a IA pode ser utilizada para acelerar seu aprendizado, aumentar sua eficiência e influência, agora e no futuro próximo.",
          },
          {
            title: "Sua Empresa e Seu Time",
            desc: "Em tempos turbulentos, a liderança faz toda a diferença; discutiremos como a IA pode estar a serviço do futuro.",
          },
          {
            title: "Seus Filhos e Sua Família",
            desc: "As oportunidades com o uso da IA são do tamanho dos desafios: técnicos, humanos, éticos. Como apoiar os nossos?",
          },
          {
            title: "Sociedade e um Bem Maior",
            desc: "Como líderes e pessoas influentes podem utilizar ferramentas de IA para apoiar o progresso de suas comunidades e da sociedade.",
          },
        ],
      },
    ],
  },
  {
    id: "acelerando-ia",
    title: "Acelerando a Implementação da IA",
    badge: "Palestra",
    audience: "C-level, inovação",
    desc: "Drives e riscos da adoção de IA nas organizações — eficiência, governança e inovação.",
    image: iaAcelerando,
    accentColor: "#8b5cf6",
    subtitle: "C-level · Inovação",
    tagline: "Acelerando a implementação da IA",
    fullDesc:
      "Para executivos e times de inovação que precisam ir além do hype e entender os verdadeiros vetores de adoção, os riscos ocultos e as boas práticas para governança de IA nas organizações.",
    details: [
      {
        kind: "two-col",
        left: {
          icon: "check",
          label: "Drives",
          items: [
            {
              title: "Eficiência",
              desc: "A primeira fronteira da adoção de IA é a busca pelo aumento da eficiência. Não uma revolução, mas uma evolução no que fazemos hoje.",
            },
            {
              title: "Acelerar a Inovação",
              desc: "A IA deve estar a serviço da inovação em suas mais diversas formas: tecnológica, gerencial, nos processos. Como elaborar um plano mestre.",
            },
          ],
        },
        right: {
          icon: "alert",
          label: "Riscos",
          items: [
            {
              title: "Excesso de Confiança",
              desc: "Os LLMs foram treinados para a inteligibilidade e não para a acurácia. Quais as boas práticas para não dar às máquinas maior credibilidade do que é aceitável.",
            },
            {
              title: "Delegação para IA",
              desc: "A comunidade acadêmica e as boas práticas indicam que o humano deve estar no controle das decisões, mesmo daquelas que foram indicadas por IA.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "800km",
    title: "800 km, Um Passo de Cada Vez",
    badge: "Palestra Motivacional",
    audience: "Todos os públicos",
    desc: "Lições do Caminho de Santiago aplicadas à vida corporativa.",
    image: caminhar,
    accentColor: "#0d9488",
    subtitle: "Inspiração",
    tagline: "Inspiração e energia para a mudança",
    fullDesc:
      "Nessa palestra busco estabelecer paralelos entre a vida corporativa e o que aprendi ao longo das duas vezes em que fiz o Caminho de Santiago — uma jornada de 800 km a pé.",
    details: [
      {
        kind: "grid",
        items: [
          {
            title: "Superação e Resiliência",
            desc: "As lições de superação, solidariedade, confiança, fraternidade e a tenacidade apoiam a reflexão de como podemos nos planejar para fazer grandes coisas.",
          },
          {
            title: "Planejamento do Caminho",
            desc: "É bom que se esperem dificuldades ao longo do percurso. A conversa se estabelece ao redor dos desafios típicos do ambiente corporativo.",
          },
          {
            title: "Estabelecer as Condições",
            desc: "Convida os participantes a estabelecerem suas próprias condições, a traçar o caminho e arrumar sua mochila.",
          },
          {
            title: "Escolher sua Companhia",
            desc: "Sobretudo, escolher com cuidado sua companhia — um dos ensinamentos mais valiosos do Caminho de Santiago.",
          },
        ],
      },
      {
        kind: "quote",
        text: "Não é sobre chegar rápido. É sobre escolher bem o caminho — e as pessoas que caminham com você.",
      },
    ],
  },
];

function DrawerDetail({ detail }: { detail: Detail }) {
  if (detail.kind === "text") {
    return <p className="text-sm text-foreground/60 leading-relaxed">{detail.text}</p>;
  }

  if (detail.kind === "quote") {
    return (
      <blockquote className="border-l-2 border-primary pl-5 py-1 mt-4">
        <p className="font-serif italic text-foreground/80 text-base leading-relaxed">"{detail.text}"</p>
      </blockquote>
    );
  }

  if (detail.kind === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {detail.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <h4 className="text-sm font-semibold text-foreground mb-1">{item.title}</h4>
            <p className="text-xs text-foreground/55 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    );
  }

  if (detail.kind === "two-col") {
    const col = (side: typeof detail.left) => (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          {side.icon === "check" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          )}
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/50">{side.label}</span>
        </div>
        {side.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <h4 className="text-sm font-semibold text-foreground mb-1">{item.title}</h4>
            <p className="text-xs text-foreground/55 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    );
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {col(detail.left)}
        {col(detail.right)}
      </div>
    );
  }

  return null;
}

export default function Palestras() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex !== null ? palestras[selectedIndex] : null;

  const goNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % palestras.length);
  };
  const goPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + palestras.length) % palestras.length);
  };

  // Close drawer on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedIndex(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedIndex]);

  return (
    <section id="palestras" className="w-full py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-bold mb-4">
            PALESTRAS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Temas para Contratação
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {palestras.map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => setSelectedIndex(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
              whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.25 } }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.22)" }}
            >
              {/* Image */}
              <div className="relative h-[230px] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                {/* Accent glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `radial-gradient(circle at top, ${p.accentColor}25, transparent 65%)` }}
                />
                {/* Badge on image */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <Megaphone className="w-3 h-3" /> {p.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-7 -mt-10">
                <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-4 inline-block">
                  {p.audience}
                </span>

                <h3 className="text-xl font-bold text-foreground mt-3 mb-3 leading-snug">
                  {p.title}
                </h3>

                <p className="text-sm text-foreground/50 leading-relaxed mb-6 line-clamp-2">
                  {p.desc}
                </p>

                <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Ver detalhes
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                </div>
              </div>

              {/* Bottom accent bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${p.accentColor}, transparent)` }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Drawer overlay + panel */}
      <AnimatePresence>
        {selected && selectedIndex !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
            />

            {/* Side panel */}
            <motion.aside
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed right-0 top-0 h-full z-[61] w-full max-w-[540px] bg-background border-l border-border shadow-2xl overflow-y-auto flex flex-col"
            >
              {/* Hero image */}
              <div className="relative h-64 shrink-0">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selected.id}
                    src={selected.image}
                    alt={selected.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                {/* Close */}
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                  aria-label="Fechar"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Prev / Next */}
                <div className="absolute left-4 top-4 flex gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                    aria-label="Próxima"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Pagination dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {palestras.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === selectedIndex ? "w-6 bg-white" : "w-1.5 bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content — animated on change */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28 }}
                  className="flex flex-col flex-1 p-8"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/40">
                      {selected.subtitle}
                    </span>
                    <span className="text-[10px] font-medium text-foreground/60 bg-foreground/[0.06] px-3 py-1 rounded-full border border-border">
                      {selected.badge}
                    </span>
                    <span className="text-[10px] font-medium text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                      {selected.audience}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2 leading-tight">
                    {selected.title}
                  </h3>

                  <p className="text-sm font-medium text-primary mb-5">{selected.tagline}</p>

                  <p className="text-sm text-foreground/60 leading-relaxed mb-8">
                    {selected.fullDesc}
                  </p>

                  <div className="space-y-6 flex-1">
                    {selected.details.map((detail, i) => (
                      <DrawerDetail key={i} detail={detail} />
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-8 border-t border-border mt-8">
                    <a
                      href="#contato"
                      onClick={() => setSelectedIndex(null)}
                      className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                      style={{ background: selected.accentColor }}
                    >
                      <Megaphone className="w-4 h-4" />
                      Agendar esta palestra
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
