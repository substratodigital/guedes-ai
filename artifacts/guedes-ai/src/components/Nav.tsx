import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { name: "Clientes", href: "#clientes" },
  { name: "Palestras", href: "#palestras" },
  { name: "Trajetória", href: "#trajetoria" },
  { name: "Publicações", href: "#publicacoes" },
  { name: "Soluções", href: "#solucoes" },
  { name: "Contato", href: "#contato" },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    }, menuOpen ? 400 : 0);
  };

  const navBg = isScrolled
    ? "bg-background/80 backdrop-blur-md border-b border-border py-3"
    : "bg-transparent py-5";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="font-bold text-foreground tracking-tight hover:text-primary transition-colors text-[15px] z-[110] relative"
            data-testid="link-logo"
          >
            GUEDES<span className="text-primary">.</span>AI
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-[13px] font-medium text-foreground/60 hover:text-foreground transition-colors"
                data-testid={`link-nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 z-[110] relative">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              data-testid="button-theme-toggle"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-all"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Sun className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Moon className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Desktop CTA */}
            <a
              href="#contato"
              onClick={(e) => scrollTo(e, "#contato")}
              className="hidden lg:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-[13px] px-4 py-2 rounded-full transition-all"
              data-testid="button-nav-agendar"
            >
              Agendar Palestra
            </a>

            {/* Mobile hamburger → X */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] group"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              data-testid="button-mobile-menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block w-5 h-[1.5px] bg-foreground origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.22 }}
                className="block w-5 h-[1.5px] bg-foreground"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block w-5 h-[1.5px] bg-foreground origin-center"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Full-screen brutalist mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] lg:hidden flex flex-col"
            style={{ background: "var(--color-background)" }}
          >
            {/* Top bar inside overlay */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
              <span className="font-bold text-foreground tracking-tight text-[15px]">
                GUEDES<span className="text-primary">.</span>AI
              </span>
              <span className="font-mono text-[10px] text-foreground/30 uppercase tracking-[0.2em]">
                Menu
              </span>
            </div>

            {/* Nav items */}
            <div className="flex-1 flex flex-col overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3, delay: i * 0.06, ease: "easeOut" }}
                  className="group flex items-center gap-5 px-6 py-6 border-b border-border hover:bg-foreground/[0.03] transition-colors"
                >
                  {/* Number */}
                  <span className="font-mono text-[11px] text-foreground/25 w-6 shrink-0 group-hover:text-primary transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Link text */}
                  <span className="text-[2.2rem] font-bold tracking-tight text-foreground leading-none group-hover:text-primary transition-colors">
                    {link.name}
                  </span>

                  {/* Arrow */}
                  <motion.span
                    className="ml-auto text-foreground/20 group-hover:text-primary font-mono text-lg transition-colors"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                  >
                    →
                  </motion.span>
                </motion.a>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.38 }}
              className="shrink-0 px-6 py-8 border-t border-border"
            >
              <a
                href="#contato"
                onClick={(e) => scrollTo(e, "#contato")}
                className="flex items-center justify-center w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-6 py-4 rounded-2xl transition-all"
              >
                Agendar Palestra
              </a>
              <p className="text-center text-[11px] text-foreground/30 font-mono mt-4 tracking-wide uppercase">
                lguedes.sp@gmail.com
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
