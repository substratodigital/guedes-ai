import { motion } from "framer-motion";

const depoimentos = [
  {
    quote: "A oportunidade das conversas semanais com o prof. Guedes ao longo desses três meses mostrou novos caminhos para a minha atuação na empresa e me ajudou a evitar obstáculos na chegada a essa nova função.",
    author: "VP Jurídico, Empresa Alimentícia"
  },
  {
    quote: "A decisão de aceitar uma posição executiva fora do país foi a mais difícil da minha carreira e a mentoria me ajudou muito a pesar todos os fatores e enfim tomar uma decisão sólida.",
    author: "Diretor Marketing B2B, Indústria Química"
  },
  {
    quote: "Palestrante que consegue equilibrar profundidade técnica com energia humana. Uma das melhores experiências de desenvolvimento que já tivemos.",
    author: "Gerente de RH, Empresa de Tecnologia"
  }
];

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="w-full py-32 px-6 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-indigo-400 font-bold mb-4">
            DEPOIMENTOS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            O Que Dizem
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {depoimentos.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="bg-[#0F0F13] border border-white/[0.06] rounded-2xl p-8 flex flex-col"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-indigo-400 text-xs">★</span>
                ))}
              </div>
              <p className="font-serif italic text-white/80 text-lg leading-relaxed flex-grow mb-8">
                "{d.quote}"
              </p>
              <p className="text-xs font-medium text-white/40 tracking-wide uppercase mt-auto">
                {d.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
