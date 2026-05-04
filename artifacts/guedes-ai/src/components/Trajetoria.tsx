import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const COL_W = 240;

interface ExpItem { org: string; period: string; role: string; bullets: readonly string[] }
interface EduItem { org: string; period: string; role: string; desc: string }
type AnyItem = ExpItem | EduItem;

function isExpItem(item: AnyItem): item is ExpItem {
  return "bullets" in item;
}

function TimelineRow({
  label,
  icon,
  accent,
  items,
}: {
  label: string;
  icon: React.ReactNode;
  accent: string;
  items: readonly AnyItem[];
}) {
  const totalWidth = items.length * COL_W;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {/* Row label badge */}
      <div className="mb-6">
        <span
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] border"
          style={{ background: `${accent}15`, borderColor: `${accent}40`, color: accent }}
        >
          {icon}
          {label}
        </span>
      </div>

      {/* DESKTOP: horizontal timeline */}
      <div className="hidden md:block overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div style={{ width: totalWidth }}>

          {/* Row A: period + org */}
          <div className="flex">
            {items.map((item, i) => (
              <div key={i} style={{ width: COL_W, flexShrink: 0 }} className="pr-8 pb-3">
                <p className="text-[10px] font-mono text-foreground/40 mb-0.5 tracking-wide">{item.period}</p>
                <p className="text-base font-bold text-foreground leading-tight">{item.org}</p>
              </div>
            ))}
          </div>

          {/* Row B: timeline line + dots */}
          <div className="relative flex items-center" style={{ height: 24 }}>
            <div className="absolute inset-y-1/2 left-0 right-0 h-px" style={{ background: `${accent}35` }} />
            {items.map((_, i) => (
              <div key={i} style={{ width: COL_W, flexShrink: 0 }} className="relative z-10 flex items-center">
                <div className="w-3 h-3 rounded-full border-2 bg-background shrink-0" style={{ borderColor: accent }} />
              </div>
            ))}
          </div>

          {/* Row C: role + content */}
          <div className="flex">
            {items.map((item, i) => (
              <div key={i} style={{ width: COL_W, flexShrink: 0 }} className="pr-8 pt-4">
                <p className="text-sm font-semibold text-foreground mb-2">{item.role}</p>
                {isExpItem(item) ? (
                  <ul className="space-y-1.5">
                    {item.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-2 text-xs text-foreground/55 leading-relaxed">
                        <span className="shrink-0 mt-0.5" style={{ color: accent }}>•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-foreground/55 leading-relaxed">{item.desc}</p>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* MOBILE: vertical card list */}
      <div className="md:hidden flex flex-col gap-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="relative pl-5 border-l-2"
            style={{ borderColor: `${accent}50` }}
          >
            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 bg-background" style={{ borderColor: accent }} />
            <p className="text-[10px] font-mono text-foreground/40 mb-0.5">{item.period}</p>
            <p className="text-sm font-bold text-foreground mb-0.5">{item.org}</p>
            <p className="text-sm font-semibold text-foreground/80 mb-2">{item.role}</p>
            {isExpItem(item) ? (
              <ul className="space-y-1">
                {item.bullets.map((b, bi) => (
                  <li key={bi} className="text-xs text-foreground/55 flex gap-2">
                    <span style={{ color: accent }} className="shrink-0">•</span>
                    {b}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-foreground/55">{item.desc}</p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Trajetoria() {
  const { t } = useLanguage();

  return (
    <section id="trajetoria" className="w-full py-16 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-pixel mb-4">
            {t.trajetoria.label}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground" style={{ whiteSpace: "pre-line" }}>
            {t.trajetoria.h2}
          </h2>
        </motion.div>

        {/* Timeline rows */}
        <div className="flex flex-col gap-20">
          <TimelineRow
            label={t.trajetoria.experienciaLabel}
            icon={<Briefcase className="w-3 h-3" />}
            accent="#6366f1"
            items={t.trajetoria.experiencia}
          />
          <TimelineRow
            label={t.trajetoria.educacaoLabel}
            icon={<GraduationCap className="w-3 h-3" />}
            accent="#8b5cf6"
            items={t.trajetoria.educacao}
          />
        </div>

      </div>
    </section>
  );
}
