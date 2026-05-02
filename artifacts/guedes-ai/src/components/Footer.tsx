import React from "react";
import { FaWhatsapp, FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-[#050714] border-t border-border pt-16 pb-8 text-muted-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          
          <div className="text-center md:text-left">
            <h3 className="font-mono font-bold text-2xl tracking-tighter text-foreground mb-2">
              GUEDES.AI
            </h3>
            <p className="text-sm">IA e Inovação para o Futuro</p>
            <p className="text-sm">São Paulo, Brasil</p>
          </div>

          <div className="flex space-x-6">
            <a href="https://wa.me/5511999587672" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
              <FaWhatsapp className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/lguedes/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0A66C2] transition-colors" aria-label="LinkedIn">
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a href="mailto:lguedes.sp@gmail.com" className="hover:text-primary transition-colors" aria-label="Email">
              <FaEnvelope className="w-6 h-6" />
            </a>
            <a href="https://knp.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-[#00C896] transition-colors" aria-label="KNP Website">
              <FaGlobe className="w-6 h-6" />
            </a>
          </div>

        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© {new Date().getFullYear()} Luís Fernando Ascensão Guedes.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}