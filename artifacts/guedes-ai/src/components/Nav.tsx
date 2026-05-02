import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Palestras", href: "#palestras" },
  { name: "Trajetória", href: "#trajetoria" },
  { name: "Publicações", href: "#publicacoes" },
  { name: "Soluções", href: "#solucoes" },
  { name: "Depoimentos", href: "#depoimentos" },
  { name: "Newsletter", href: "#newsletter" },
  { name: "Contato", href: "#contato" },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#09090B]/80 backdrop-blur-md border-b border-white/[0.06] py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => scrollToSection(e, "#hero")}
          className="font-bold text-white tracking-tight hover:text-indigo-400 transition-colors"
          data-testid="link-logo"
        >
          GUEDES.AI
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                data-testid={`link-nav-${link.name.toLowerCase().replace("ç", "c").replace("õ", "o")}`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <a
            href="#contato"
            onClick={(e) => scrollToSection(e, "#contato")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-5 py-2.5 rounded-full transition-all"
            data-testid="button-nav-agendar"
          >
            Agendar Palestra
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white/80 hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#09090B] border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-base font-medium text-white/70 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contato"
                onClick={(e) => scrollToSection(e, "#contato")}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-center text-sm px-5 py-3 rounded-full transition-all mt-4"
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
