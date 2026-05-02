import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const navBg = isScrolled
    ? "bg-background/80 backdrop-blur-md border-b border-border py-3"
    : "bg-transparent py-5";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-bold text-foreground tracking-tight hover:text-primary transition-colors text-[15px]"
          data-testid="link-logo"
        >
          GUEDES<span className="text-primary">.</span>AI
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-[13px] font-medium text-foreground/60 hover:text-foreground transition-colors"
              data-testid={`link-nav-${link.name.toLowerCase()}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            data-testid="button-theme-toggle"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-all"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Sun className="w-4 h-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Moon className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* CTA */}
          <a
            href="#contato"
            onClick={(e) => scrollToSection(e, "#contato")}
            className="hidden lg:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-[13px] px-4 py-2 rounded-full transition-all"
            data-testid="button-nav-agendar"
          >
            Agendar Palestra
          </a>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-foreground/70 hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contato"
                onClick={(e) => scrollToSection(e, "#contato")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-center text-sm px-5 py-2.5 rounded-full transition-all mt-2"
              >
                Agendar Palestra
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
