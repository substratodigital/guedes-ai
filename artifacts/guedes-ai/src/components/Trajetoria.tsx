import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const experiencia = [
  {
    org: "FIA Consulting",
    period: "Desde 2015",
    role: "Consultor Estratégico",
    bullets: [
      "Projetos em estratégia, inovação, eficiência, liderança",
      "Mais de 30 projetos com governos e grandes empresas",
    ],
  },
  {
    org: "Google",
    period: "2011 – 2012",
    role: "Head FP&A Latam",
    bullets: [
      "Liderança da área de planejamento financeiro para Latam",
      "Destaque: projetos de otimização e comunicação interna",
    ],
  },
  {
    org: "FIA / Einstein",
    period: "Desde 2009",
    role: "Professor-Doutor",
    bullets: [
      "IA, inovação, criatividade aplicada aos negócios",
      "19 prêmios de excelência didática",
    ],
  },
  {
    org: "ABNT / Pref. SP",
    period: "Desde 2023",
    role: "Consultor & Conselheiro",
    bullets: [
      "Consultor na comissão de IA da ABNT",
      "Conselheiro de Clima da Prefeitura de São Paulo",
    ],
  },
];

const educacao = [
  {
    org: "FEA / USP",
    period: "2022 – 2024",
    role: "Pós-Doutorado",
    desc: "Inteligência Artificial",
  },
  {
    org: "FEA / USP",
    period: "2008 – 2012",
    role: "Doutorado",
    desc: "em Inovação",
  },
  {
    org: "FIA",
    period: "2007",
    role: "MBA Internacional",
    desc: "Cambridge · Lyon · Vanderbilt",
  },
  {
    org: "FGV / EAESP",
    period: "2002 – 2004",
    role: "Mestrado",
    desc: "em Gestão de Operações",
  },
  {
    org: "FEI",
    period: "1990 – 1995",
    role: "Graduação",
    desc: "Engenharia de Computadores",
  },
];

interface ExpItem {
  org: string;
  period: string;
  role: string;
  bullets: string[];
}

interface EduItem {
  org: string;
  period: string;
  role: string;
  desc: string;
}

function HorizontalRow({
  label,
  icon,
  accentColor,
  items,
  renderItem,
}: {
  label: string;
  icon: React.ReactNode;
  accentColor: string;
  items: (ExpItem | EduItem)[];
  renderItem: (item: ExpItem | EduItem, i: number) => React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="w-full"
    >
      {/* Row label */}
      <div className="flex items-center gap-2.5 mb-6 px-2">
        <span
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] border"
          style={{
            background: `${accentColor}15`,
            borderColor: `${accentColor}40`,
            color: accentColor,
          }}
        >
          {icon}
          {label}
        </span>
      </div>

      {/* Scrollable track */}
      <div className="overflow-x-auto pb-4 -mx-6 px-6">
        <div className="relative flex min-w-max">
          {/* Horizontal line */}
          <div
            className="absolute top-[52px] left-0 right-0 h-px"
            style={{ background: `${accentColor}30` }}
          />

          {items.map((item, i) => (
            <div
              key={i}
              className="relative flex flex-col"
              style={{ minWidth: "220px", paddingRight: "40px" }}
            >
              {/* Above line: org + period */}
              <div className="mb-4 pr-4">
                <p className="text-[11px] text-foreground/40 font-mono mb-0.5">{item.period}</p>
                <p className="text-base font-bold text-foreground leading-tight">{item.org}</p>
              </div>

              {/* Pin dot on line */}
              <div
                className="relative z-10 w-3 h-3 rounded-full border-2 bg-background shrink-0 mb-0"
                style={{ borderColor: accentColor, marginBottom: "-6px" }}
              />

              {/* Below line: role + content */}
              <div className="pt-5 pr-4">
                <p className="text-sm font-semibold text-foreground mb-2">{item.role}</p>
                {renderItem(item, i)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Trajetoria() {
  return (
    <section id="trajetoria" className="w-full py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-bold mb-4">
            TRAJETÓRIA
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            30 Anos de Trajetória
          </h2>
        </motion.div>

        {/* Two timeline rows */}
        <div className="flex flex-col gap-20">
          {/* Experiência */}
          <HorizontalRow
            label="Experiência"
            icon={<Briefcase className="w-3 h-3" />}
            accentColor="#6366f1"
            items={experiencia}
            renderItem={(item) => {
              const exp = item as ExpItem;
              return (
                <ul className="space-y-1.5">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-2 text-xs text-foreground/55 leading-relaxed">
                      <span className="text-indigo-500 shrink-0 mt-0.5">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
              );
            }}
          />

          {/* Educação */}
          <HorizontalRow
            label="Educação"
            icon={<GraduationCap className="w-3 h-3" />}
            accentColor="#8b5cf6"
            items={educacao}
            renderItem={(item) => {
              const edu = item as EduItem;
              return (
                <p className="text-xs text-foreground/55 leading-relaxed">{edu.desc}</p>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}
