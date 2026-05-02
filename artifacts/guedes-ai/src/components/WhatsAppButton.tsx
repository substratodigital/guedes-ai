import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <div className="absolute inset-0 bg-emerald-600/30 rounded-full animate-ping pointer-events-none" />
        <a
          href="https://wa.me/5511999587672"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 rounded-full shadow-lg transition-transform hover:scale-105"
          aria-label="Contato pelo WhatsApp"
          data-testid="button-whatsapp-floating"
        >
          <FaWhatsapp className="w-7 h-7 text-white" />
        </a>
      </div>
    </div>
  );
}
