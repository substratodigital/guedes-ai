import { FaWhatsapp, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-bold text-foreground tracking-tight">
            GUEDES<span className="text-primary">.</span>AI
          </div>
          <div className="text-[11px] text-foreground/40 uppercase tracking-widest">
            © {new Date().getFullYear()} Luís Fernando Ascensão Guedes
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://wa.me/5511999587672" target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-foreground transition-colors">
            <FaWhatsapp className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/lguedes" target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-foreground transition-colors">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="mailto:lguedes.sp@gmail.com" className="text-foreground/40 hover:text-foreground transition-colors">
            <FaEnvelope className="w-5 h-5" />
          </a>
          <a href="https://knp.com.br" target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-foreground transition-colors">
            <Globe className="w-5 h-5" />
          </a>
        </div>

      </div>
    </footer>
  );
}
