import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Megaphone, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import ia360img from "@assets/palestra_IA360_1777778290405.webp";
import acelerandoImg from "@assets/palestra_acelerando_implementacao_1777778290405.webp";
import caminharImg from "@assets/palestra_800km_1777778290404.webp";

type Detail =
  | { kind: "two-col"; left: { icon: "check" | "alert"; label: string; items: { title: string; desc: string }[] }; right: { icon: "check" | "alert"; label: string; items: { title: string; desc: string }[] } }
  | { kind: "grid"; items: { title: string; desc: string }[] }
  | { kind: "quote"; text: string };

interface Palestra {
  id: string;
  num: string;
  title: string;
  badge: string;
  audience: string;
  image: string;
  accentColor: string;
  tagline: string;
  fullDesc: string;
  details: Detail[];
}

const palestras: Palestra[] = [
  {
    id: "ia-360",
    num: "01",
    title: "IA | 360",
    badge: "Palestra / Mini-curso",
    audience: "Executivos · Líderes · Famílias",
    image: ia360img,
    accentColor: "#6366f1",
    tagline: "Fundamentos de IA para um novo mundo",
    fullDesc:
      "Uma palestra que explora como a Inteligência Artificial está transformando simultaneamente nossas carreiras, empresas, famílias e a sociedade — com profundidade acadêmica e linguagem acessível.",
    details: [
      {
        kind: "grid",
        items: [
          { title: "Sua Carreira e Seu Futuro", desc: "Como a IA pode acelerar seu aprendizado, aumentar sua eficiência e influência, agora e no futuro próximo." },
          { title: "Sua Empresa e Seu Time", desc: "Em tempos turbulentos, a liderança faz toda a diferença; como a IA pode estar a serviço do futuro." },
          { title: "Seus Filhos e Sua Família", desc: "As oportunidades com o uso da IA são do tamanho dos desafios: técnicos, humanos, éticos. Como apoiar os nossos?" },
          { title: "Sociedade e um Bem Maior", desc: "Como líderes podem utilizar ferramentas de IA para apoiar o progresso de suas comunidades." },
        ],
      },
    ],
  },
  {
    id: "acelerando-ia",
    num: "02",
    title: "Acelerando a Implementação da IA",
    badge: "Palestra",
    audience: "C-level · Inovação",
    image: acelerandoImg,
    accentColor: "#8b5cf6",
    tagline: "Acelerando a implementação da IA nas organizações",
    fullDesc:
      "Para executivos e times de inovação que precisam ir além do hype e entender os verdadeiros vetores de adoção, os riscos ocultos e as boas práticas para governança de IA.",
    details: [
      {
        kind: "two-col",
        left: {
          icon: "check",
          label: "Drives",
          items: [
            { title: "Eficiência", desc: "A primeira fronteira da adoção de IA é a busca pelo aumento da eficiência. Não uma revolução, mas uma evolução no que fazemos hoje." },
            { title: "Acelerar a Inovação", desc: "A IA deve estar a serviço da inovação em suas mais diversas formas: tecnológica, gerencial, nos processos." },
          ],
        },
        right: {
          icon: "alert",
          label: "Riscos",
          items: [
            { title: "Excesso de Confiança", desc: "Os LLMs foram treinados para a inteligibilidade e não para a acurácia. Quais as boas práticas para não dar às máquinas maior credibilidade do que é aceitável." },
            { title: "Delegação para IA", desc: "A comunidade acadêmica e as boas práticas indicam que o humano deve estar no controle das decisões, mesmo daquelas indicadas por IA." },
          ],
        },
      },
    ],
  },
  {
    id: "800km",
    num: "03",
    title: "800 km, Um Passo de Cada Vez",
    badge: "Palestra Motivacional",
    audience: "Todos os públicos",
    image: caminharImg,
    accentColor: "#0d9488",
    tagline: "Inspiração e energia para a mudança",
    fullDesc:
      "Nessa palestra busco estabelecer paralelos entre a vida corporativa e o que aprendi ao longo das duas vezes em que fiz o Caminho de Santiago — uma jornada de 800 km a pé.",
    details: [
      {
        kind: "grid",
        items: [
          { title: "Superação e Resiliência", desc: "As lições de superação, solidariedade, confiança e a tenacidade apoiam a reflexão de como podemos nos planejar para fazer grandes coisas." },
          { title: "Planejamento do Caminho", desc: "É bom que se esperem dificuldades ao longo do percurso. A conversa se estabelece ao redor dos desafios típicos do ambiente corporativo." },
          { title: "Estabelecer as Condições", desc: "Convida os participantes a estabelecerem suas próprias condições, a traçar o caminho e arrumar sua mochila." },
          { title: "Escolher sua Companhia", desc: "Sobretudo, escolher com cuidado sua companhia — um dos ensinamentos mais valiosos do Caminho de Santiago." },
        ],
      },
      {
        kind: "quote",
        text: "Não é sobre chegar rápido. É sobre escolher bem o caminho — e as pessoas que caminham com você.",
      },
    ],
  },
];

function DetailBlock({ detail, accent }: { detail: Detail; accent: string }) {
  if (detail.kind === "quote") {
    return (
      <blockquote className="border-l-2 pl-5 py-1 mt-2" style={{ borderColor: accent }}>
        <p className="font-mono italic text-foreground/70 text-sm leading-relaxed">"{detail.text}"</p>
      </blockquote>
    );
  }

  if (detail.kind === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {detail.items.map((item, i) => (
          <div key={i} className="border border-border p-4 rounded-none bg-foreground/[0.02]">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">{item.title}</h4>
            <p className="text-xs text-foreground/55 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    );
  }

  if (detail.kind === "two-col") {
    const renderSide = (side: typeof detail.left) => (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-1">
          {side.icon === "check"
            ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            : <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/40">{side.label}</span>
        </div>
        {side.items.map((item, i) => (
          <div key={i} className="border border-border p-4 rounded-none bg-foreground/[0.02]">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">{item.title}</h4>
            <p className="text-xs text-foreground/55 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    );
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {renderSide(detail.left)}
        {renderSide(detail.right)}
      </div>
    );
  }

  return null;
}

export default function Palestras() {
  const [active, setActive] = useState(0);
  const p = palestras[active];

  return (
    <section id="palestras" className="w-full py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-bold mb-4">PALESTRAS</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-xl">
            Temas para Contratação
          </h2>
        </motion.div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-0 items-stretch">

          {/* LEFT — brutalist compact tabs */}
          <div className="lg:w-[260px] shrink-0 border-t border-border">
            {palestras.map((item, i) => {
              const isActive = i === active;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`relative w-full text-left border-b border-border px-5 py-5 transition-all duration-200 focus:outline-none group ${
                    isActive ? "bg-foreground/[0.04]" : "hover:bg-foreground/[0.02]"
                  }`}
                >
                  {/* Active accent left bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] transition-opacity duration-200"
                    style={{
                      background: item.accentColor,
                      opacity: isActive ? 1 : 0,
                    }}
                  />

                  <div className="pl-1">
                    <span
                      className="font-mono text-[10px] block mb-1 transition-colors"
                      style={{ color: isActive ? item.accentColor : "rgba(var(--foreground-rgb, 255 255 255) / 0.25)" }}
                    >
                      {item.num}
                    </span>
                    <span
                      className={`text-sm font-semibold leading-snug block transition-colors ${
                        isActive ? "text-foreground" : "text-foreground/45 group-hover:text-foreground/70"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className={`text-[10px] mt-0.5 block transition-colors ${isActive ? "text-foreground/50" : "text-foreground/25"}`}>
                      {item.badge}
                    </span>
                  </div>
                </motion.button>
              );
            })}

            {/* Agendar CTA below tabs */}
            <div className="px-5 pt-6">
              <a
                href="#contato"
                className="flex items-center justify-between w-full text-sm font-semibold text-foreground border border-border px-4 py-3 hover:bg-foreground/[0.04] transition-colors group"
                style={{ borderRadius: 0 }}
              >
                Agendar palestra
                <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Vertical divider on desktop */}
          <div className="hidden lg:block w-px bg-border shrink-0" />

          {/* RIGHT — content panel, brutalist */}
          <div className="flex-1 min-w-0 border-t border-border">
            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="p-8 lg:p-10 flex flex-col gap-8"
              >
                {/* Top row: meta + thumbnail */}
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    {/* Num + badge row */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-[11px] text-foreground/30">{p.num} /</span>
                      <span
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 border"
                        style={{ color: p.accentColor, borderColor: `${p.accentColor}50`, background: `${p.accentColor}10` }}
                      >
                        <Megaphone className="w-3 h-3" /> {p.badge}
                      </span>
                      <span className="text-[10px] text-foreground/35 border border-border px-2.5 py-1">
                        {p.audience}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight mb-2">
                      {p.title}
                    </h3>

                    {/* Tagline — monospace accent */}
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] mb-5" style={{ color: p.accentColor }}>
                      — {p.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-foreground/60 leading-relaxed max-w-xl">
                      {p.fullDesc}
                    </p>
                  </div>

                  {/* Thumbnail — small, secondary */}
                  <div className="hidden md:block shrink-0 border border-border overflow-hidden" style={{ width: 180, aspectRatio: "16/9" }}>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Detail blocks */}
                <div className="flex flex-col gap-6">
                  {p.details.map((d, i) => (
                    <DetailBlock key={i} detail={d} accent={p.accentColor} />
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
