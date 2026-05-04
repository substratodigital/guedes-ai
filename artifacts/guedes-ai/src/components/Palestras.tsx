import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Megaphone, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Detail =
  | { kind: "two-col"; left: { icon: "check" | "alert"; label: string; items: { title: string; desc: string }[] }; right: { icon: "check" | "alert"; label: string; items: { title: string; desc: string }[] } }
  | { kind: "grid"; items: { title: string; desc: string }[] }
  | { kind: "quote"; text: string };

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {detail.items.map((item, i) => (
          <div key={i} className="border border-border p-5 lg:p-6 bg-foreground/[0.02]">
            <h4 className="text-base lg:text-lg font-bold text-foreground uppercase tracking-wide mb-2">{item.title}</h4>
            <p className="text-sm lg:text-base text-foreground/55 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    );
  }

  if (detail.kind === "two-col") {
    const numItems = Math.max(detail.left.items.length, detail.right.items.length);
    const itemsArray = Array.from({ length: numItems });

    const mobileRenderSide = (side: typeof detail.left) => (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-1">
          {side.icon === "check"
            ? <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            : <AlertTriangle className="w-5 h-5 text-amber-500" />}
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/40">{side.label}</span>
        </div>
        {side.items.map((item, i) => (
          <div key={i} className="border border-border p-5 bg-foreground/[0.02]">
            <h4 className="text-base font-bold text-foreground uppercase tracking-wide mb-2">{item.title}</h4>
            <p className="text-sm text-foreground/55 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    );

    return (
      <>
        {/* MOBILE: Stacked Layout */}
        <div className="flex sm:hidden flex-col gap-8">
          {mobileRenderSide(detail.left)}
          {mobileRenderSide(detail.right)}
        </div>

        {/* DESKTOP: Symmetrical Grid Row-by-Row Layout */}
        <div className="hidden sm:grid grid-cols-2 gap-4">
          {/* Headers */}
          <div className="flex items-center gap-2 mb-2">
            {detail.left.icon === "check" ? <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-500" /> : <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 text-amber-500" />}
            <span className="text-xs lg:text-sm font-bold uppercase tracking-[0.2em] text-foreground/40">{detail.left.label}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            {detail.right.icon === "check" ? <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-500" /> : <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 text-amber-500" />}
            <span className="text-xs lg:text-sm font-bold uppercase tracking-[0.2em] text-foreground/40">{detail.right.label}</span>
          </div>

          {/* Rows */}
          {itemsArray.map((_, i) => [
            <div key={`left-${i}`} className="border border-border p-5 lg:p-6 bg-foreground/[0.02]">
              {detail.left.items[i] && (
                <>
                  <h4 className="text-base lg:text-lg font-bold text-foreground uppercase tracking-wide mb-2">{detail.left.items[i].title}</h4>
                  <p className="text-sm lg:text-base text-foreground/55 leading-relaxed">{detail.left.items[i].desc}</p>
                </>
              )}
            </div>,
            <div key={`right-${i}`} className="border border-border p-5 lg:p-6 bg-foreground/[0.02]">
              {detail.right.items[i] && (
                <>
                  <h4 className="text-base lg:text-lg font-bold text-foreground uppercase tracking-wide mb-2">{detail.right.items[i].title}</h4>
                  <p className="text-sm lg:text-base text-foreground/55 leading-relaxed">{detail.right.items[i].desc}</p>
                </>
              )}
            </div>
          ])}
        </div>
      </>
    );
  }

  return null;
}

export default function Palestras() {
  const [active, setActive] = useState(0);
  const { t } = useLanguage();
  const palestras = t.palestras.items;
  const p = palestras[active];

  return (
    <section id="palestras" className="w-full py-16 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-pixel mb-4">
            {t.palestras.label}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-xl">
            {t.palestras.h2}
          </h2>
        </motion.div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-0 items-stretch">

          {/* LEFT — tabs */}
          <div className="flex overflow-x-auto snap-x snap-mandatory lg:flex-col lg:w-[320px] shrink-0 border-t border-b lg:border-b-0 border-border [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                  className={`relative w-[260px] lg:w-full shrink-0 snap-start text-left border-r lg:border-r-0 lg:border-b border-border px-5 lg:px-6 py-4 lg:py-6 transition-all duration-200 focus:outline-none group ${
                    isActive ? "bg-foreground/[0.04]" : "hover:bg-foreground/[0.02]"
                  }`}
                >
                  <div
                    className="absolute left-0 top-0 lg:bottom-0 w-full lg:w-[3px] h-[3px] lg:h-full transition-opacity duration-200"
                    style={{ background: item.accentColor, opacity: isActive ? 1 : 0 }}
                  />
                  <div className="pl-1">
                    <div className="flex items-center gap-2 mb-1 lg:mb-2">
                      <span className="font-mono text-[10px] md:text-xs lg:text-sm transition-colors" style={{ color: isActive ? item.accentColor : undefined }}>
                        {item.num}
                      </span>
                    </div>
                    <span className={`text-base md:text-lg lg:text-xl font-semibold leading-snug block transition-colors whitespace-pre-line ${isActive ? "text-foreground" : "text-foreground/45 group-hover:text-foreground/70"}`}>
                      {item.title}
                    </span>
                    <span className={`text-xs md:text-sm lg:text-base mt-1 block transition-colors ${isActive ? "text-foreground/50" : "text-foreground/25"}`}>
                      {item.badge}
                    </span>
                  </div>
                </motion.button>
              );
            })}

            {/* Agendar CTA - Desktop */}
            <div className="hidden lg:block px-5 pt-6">
              <a
                href="#contato"
                className="flex items-center justify-between w-full text-sm font-semibold text-foreground border border-border px-4 py-3 hover:bg-foreground/[0.04] transition-colors group"
              >
                {t.palestras.cta}
                <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="hidden lg:block w-px bg-border shrink-0" />

          {/* RIGHT — content panel */}
          <div className="flex-1 min-w-0 border-t border-border">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${p.id}-${active}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="py-8 px-2 md:p-8 lg:p-10 flex flex-col gap-8"
              >
                {/* Meta row */}
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="font-mono text-[11px] text-foreground/30">{p.num} /</span>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs md:text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 border"
                      style={{ color: p.accentColor, borderColor: `${p.accentColor}50`, background: `${p.accentColor}10` }}
                    >
                      <Megaphone className="w-3 h-3" /> {p.badge}
                    </span>
                    <span className="text-xs md:text-[10px] text-foreground/35 border border-border px-2.5 py-1">
                      {p.audience}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight mb-2 whitespace-pre-line">
                    {p.title}
                  </h3>

                  <p className="font-mono text-xs md:text-[11px] uppercase tracking-[0.18em] mb-5" style={{ color: p.accentColor }}>
                    — {p.tagline}
                  </p>

                  <p className="text-base md:text-sm text-foreground/60 leading-relaxed max-w-2xl">
                    {p.fullDesc}
                  </p>
                </div>

                <div className="border-t border-border" />

                <div className="flex flex-col gap-6">
                  {p.details.map((d, i) => (
                    <DetailBlock key={i} detail={d as Detail} accent={p.accentColor} />
                  ))}
                </div>

                {/* Agendar CTA - Mobile */}
                <div className="lg:hidden mt-2 pt-8 border-t border-border">
                  <a
                    href="#contato"
                    className="flex items-center justify-between w-full text-sm font-semibold text-foreground border border-border px-4 py-3 hover:bg-foreground/[0.04] transition-colors group"
                  >
                    {t.palestras.cta}
                    <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
