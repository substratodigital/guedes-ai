import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Palestras", href: "#palestras" },
  { name: "Trajetória", href: "#trajetoria" },
  { name: "Soluções", href: "#solucoes" },
  { name: "Newsletter", href: "#newsletter" },
  { name: "Contato", href: "#contato" },
];

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers = navLinks.map((link) => {
      const element = document.getElementById(link.href.replace("#", ""));
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(link.href);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(element);
      return { element, observer };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.element);
      });
    };
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
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => scrollToSection(e, "#hero")}
          className="font-mono font-bold text-xl tracking-tighter glitch-text text-foreground hover:text-primary transition-colors"
          data-text="GUEDES.AI"
          data-testid="link-logo"
        >
          GUEDES.AI
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid={`link-nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            onClick={(e) => scrollToSection(e, "#contato")}
            className="bg-primary text-primary-foreground px-6 py-2 text-sm font-bold clipped-corner hover:bg-primary/90 transition-colors"
            data-testid="button-nav-agendar"
          >
            Agendar Palestra
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border py-4 px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`text-lg font-medium transition-colors ${
                activeSection === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`link-mobile-nav-${link.name.toLowerCase()}`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contato"
            onClick={(e) => scrollToSection(e, "#contato")}
            className="bg-primary text-primary-foreground px-6 py-3 text-center text-sm font-bold clipped-corner hover:bg-primary/90 transition-colors"
            data-testid="button-mobile-nav-agendar"
          >
            Agendar Palestra
          </a>
        </div>
      )}
    </nav>
  );
}