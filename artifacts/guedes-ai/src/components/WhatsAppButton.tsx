import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5511999587672"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform"
      aria-label="Falar no WhatsApp"
      data-testid="button-whatsapp-floating"
    >
      <span className="absolute inset-0 rounded-full border border-[#25D366] animate-ping" />
      <FaWhatsapp className="w-7 h-7" />
    </a>
  );
}