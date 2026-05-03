import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Megaphone, CheckCircle2, AlertTriangle } from "lucide-react";
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
  num: string;
  title: string;
  badge: string;
  audience: string;
  desc: string;
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
    audience: "Executivos, líderes, famílias",
    desc: "Visão 360° do impacto da IA na carreira, empresa, família e sociedade.",
    image: ia360,
    accentColor: "#6366f1",
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
            desc: "Como líderes e pessoas influentes podem utilizar ferramentas de IA para apoiar o progresso de suas comunidades.",
          },
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
    desc: "Drives e riscos da adoção de IA — eficiência, governança e inovação.",
    image: iaAcelerando,
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
            {
              title: "Eficiência",
              desc: "A primeira fronteira da adoção de IA é a busca pelo aumento da eficiência. Não uma revolução, mas uma evolução no que fazemos hoje.",
            },
            {
              title: "Acelerar a Inovação",
              desc: "A IA deve estar a serviço da inovação em suas mais diversas formas: tecnológica, gerencial, nos processos.",
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
    num: "03",
    title: "800 km, Um Passo de Cada Vez",
    badge: "Palestra Motivacional",
    audience: "Todos os públicos",
    desc: "Lições do Caminho de Santiago aplicadas à vida corporativa.",
    image: caminhar,
    accentColor: "#0d9488",
    tagline: "Inspiração e energia para a mudança",
    fullDesc:
      "Nessa palestra busco estabelecer paralelos entre a vida corporativa e o que aprendi ao longo das duas vezes em que fiz o Caminho de Santiago — uma jornada de 800 km a pé.",
    details: [
      {
        kind: "grid",
        items: [
          {
            title: "Superação e Resiliência",
            desc: "As lições de superação, solidariedade, confiança e a tenacidade apoiam a reflexão de como podemos nos planejar para fazer grandes coisas.",
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

function DetailBlock({ detail }: { detail: Detail }) {
  if (detail.kind === "text") {
    return <p className="text-sm text-foreground/60 leading-relaxed">{detail.text}</p>;
  }

  if (detail.kind === "quote") {
    return (
      <blockquote className="border-l-2 border-primary pl-5 py-1">
        <p className="font-serif italic text-foreground/70 text-base leading-relaxed">"{detail.text}"</p>
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
            transition={{ delay: i * 0.06 }}
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
    const renderSide = (side: typeof detail.left) => (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          {side.icon === "check" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          )}
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/50">
            {side.label}
          </span>
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
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-bold mb-4">
            PALESTRAS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-xl">
            Temas para Contratação
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* LEFT — nav list */}
          <div className="lg:w-[340px] shrink-0 flex flex-col gap-1">
            {palestras.map((item, i) => {
              const isActive = i === active;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className={`group relative text-left rounded-2xl px-5 py-5 transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? "bg-card border-border shadow-lg"
                      : "border-transparent hover:bg-foreground/[0.04]"
                  }`}
                >
                  {/* Active accent line */}
                  {isActive && (
                    <motion.div
                      layoutId="active-bar"
                      className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
                      style={{ background: item.accentColor }}
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    />
                  )}

                  <div className="flex items-start gap-4 pl-1">
                    <span
                      className="text-[10px] font-bold mt-0.5 shrink-0 transition-colors duration-200"
                      style={{ color: isActive ? item.accentColor : "var(--color-foreground)" + "60" }}
                    >
                      {item.num}
                    </span>
                    <div>
                      <p
                        className="text-base font-semibold leading-snug transition-colors duration-200"
                        style={{ color: isActive ? "var(--foreground)" : undefined }}
                      >
                        {item.title}
                      </p>
                      <p
                        className={`text-xs mt-1 leading-relaxed transition-colors duration-200 ${
                          isActive ? "text-foreground/60" : "text-foreground/35"
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}

            {/* CTA below nav */}
            <div className="mt-6 px-5">
              <a
                href="#contato"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-85 focus:outline-none"
                style={{ background: p.accentColor }}
              >
                <Megaphone className="w-4 h-4" />
                Agendar palestra
              </a>
            </div>
          </div>

          {/* RIGHT — content panel */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                className="flex flex-col gap-8"
              >
                {/* Image */}
                <div
                  className="relative w-full rounded-3xl overflow-hidden"
                  style={{ aspectRatio: "16/9" }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Subtle gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  {/* Glow tint */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `radial-gradient(ellipse at bottom left, ${p.accentColor}, transparent 65%)`,
                    }}
                  />
                  {/* Bottom meta */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                      <Megaphone className="w-3 h-3" /> {p.badge}
                    </span>
                    <span className="inline-flex items-center text-[10px] font-medium text-white/80 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                      {p.audience}
                    </span>
                  </div>
                </div>

                {/* Text content */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1">
                    {p.title}
                  </h3>
                  <p className="text-sm font-medium mb-4" style={{ color: p.accentColor }}>
                    {p.tagline}
                  </p>
                  <p className="text-sm text-foreground/60 leading-relaxed max-w-prose">
                    {p.fullDesc}
                  </p>
                </div>

                {/* Detail blocks */}
                <div className="flex flex-col gap-6">
                  {p.details.map((d, i) => (
                    <DetailBlock key={i} detail={d} />
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
