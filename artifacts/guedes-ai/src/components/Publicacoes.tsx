import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, BookMarked, Award, Mic, GraduationCap, Newspaper,
  ExternalLink, ChevronDown, ChevronUp,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// ── Static Data (bibliographic — kept in original language) ───────────────

const ARTIGOS_PERIODICOS = [
  { ano: 2024, titulo: "Artificial intelligence adoption in public organizations: a case study", periodico: "Future Studies Research Journal – Future, v. 16, p. e860-26", url: "https://www.revistafuture.org/FSRJ/article/view/860" },
  { ano: 2024, titulo: "Barreiras à adoção de IA em organizações do setor público brasileiro", periodico: "Cadernos EBAPE.BR", url: null },
  { ano: 2019, titulo: "Uma discussão teórica acerca dos fatores que influenciam a sobrevivência dos clusters de negócios", periodico: "Revista Eletrônica de Estratégia & Negócios, v. 11, p. 3-22", url: "https://portaldeperiodicos.animaeducacao.com.br/index.php/EeN/article/view/4927" },
  { ano: 2019, titulo: "The importance of the atmosphere of the environment in Brazilian physical retail in 2030", periodico: "Revista de Administração da UFSM, v. 12, p. 1278-1292", url: null },
  { ano: 2018, titulo: "Technology roadmapping: A methodological proposition to refine Delphi results", periodico: "Technological Forecasting and Social Change, v. 126, p. 194-206", url: "https://www.sciencedirect.com/science/article/abs/pii/S0040162516306734?via%3Dihub" },
  { ano: 2017, titulo: "O mapeamento de uma cadeia extrativista na Amazônia: Arapaima Gigas em Reservas de Desenvolvimento Sustentável", periodico: "RGSA (ANPAD), v. 11, p. 02", url: "https://rgsa.openaccesspublications.org/rgsa/article/view/1222" },
  { ano: 2015, titulo: "Designers at work: An introductory study on the practice of Design Thinking in Brazil", periodico: "Business Management Review (BMR), v. 4, p. 397-407", url: null },
  { ano: 2010, titulo: "La Importancia De La Tecnología De Búsqueda En La Web, La Innovación Y El Modelo De Negocios, Para Explicar El Éxito De Google", periodico: "Espacios (Caracas), v. 31, p. 4-8", url: null },
  { ano: 2009, titulo: "Uma proposta de modelo preditivo para o crescimento da telefonia celular no Brasil", periodico: "Future Studies Research Journal, v. 01, p. 28-47", url: "https://www.revistafuture.org/FSRJ/article/view/2" },
  { ano: 2007, titulo: "Modelos de desenvolvimento organizacional: construindo uma abordagem integrada", periodico: "Cadernos Camilliani, v. 8, p. 73-83", url: null },
];

const CONGRESSOS = [
  { ano: 2022, titulo: "Understanding innovation adoption differences between US and Brazil: A comparative study on original equipment Manufacturer", evento: "XXV SEMEAD – USP, São Paulo" },
  { ano: 2021, titulo: "Maior que a soma das partes: mapeando a cadeia de valor da maior empresa pública de saneamento básico do mundo", evento: "XXIV SEMEAD – USP, São Paulo" },
  { ano: 2021, titulo: "Measuring what matters: establishing performance metrics for the largest public maintenance operation in Latin America", evento: "Triple Helix Conference 2021, São Paulo" },
  { ano: 2020, titulo: "Gestão de risco na produção de soja com biotecnologia", evento: "XXIII Semead, São Paulo" },
  { ano: 2017, titulo: "O mapeamento de uma cadeia extrativista na Amazônia: Arapaima Gigas em Reservas de Desenvolvimento Sustentável", evento: "XLI Encontro da ANPAD, São Paulo" },
  { ano: 2017, titulo: "Inovação no Ensino de Administração: A aplicação de metodologias educacionais ativas na USP", evento: "XLI Encontro da ANPAD, São Paulo" },
  { ano: 2016, titulo: "Using Delphi as a technology roadmap designing tool", evento: "25th IAMOT, Orlando/FL" },
  { ano: 2016, titulo: "Finding the appropriate level of open innovation: Framework and application", evento: "25th IAMOT, Orlando/FL" },
  { ano: 2016, titulo: "Long-Term R&D-Based consortia: Paths to integrate basic research with company strategy", evento: "25th IAMOT, Orlando/FL" },
  { ano: 2016, titulo: "Práticas de Gestão de Talentos nas Organizações Contemporâneas", evento: "EnANPAD, Costa do Sauípe" },
  { ano: 2016, titulo: "Gestão da mudança na mitigação do impacto cultural: uma análise em fusões e aquisições", evento: "XIX Semead – FEA/USP, São Paulo" },
  { ano: 2016, titulo: "Ambidestria Organizacional: O Caso do Centro de Medicina Diagnóstica Fleury", evento: "XIX SemeAd – FEA/USP, São Paulo" },
  { ano: 2016, titulo: "Relatórios de sustentabilidade: análise crítica sobre o processo de elaboração e seus resultados", evento: "Redlas 2016, São Paulo" },
  { ano: 2016, titulo: "A Avaliação dos Resultados Intangíveis dos Projetos de P&D e Inovação – Setor Elétrico", evento: "V SINGEP, São Paulo" },
  { ano: 2014, titulo: "Business Model Innovation: AB InBev Case", evento: "IAMOT 2014, Washington" },
  { ano: 2014, titulo: "Technology Forecasting Techniques to Reduce Weight in Shock Absorbers", evento: "IAMOT 2014, Washington" },
  { ano: 2014, titulo: "Measures that Matter: Strategically Tracking Innovation Initiatives", evento: "23rd IAMOT, Washington" },
  { ano: 2014, titulo: "Estudo introdutório sobre a prática do Design Thinking por empresas de consultoria", evento: "EnANPAD 2014, Rio de Janeiro" },
  { ano: 2013, titulo: "Contributions to global R&D coordination study: Main influencing factors and the outline of a coordination support system", evento: "IAMOT 2013, Porto Alegre" },
  { ano: 2013, titulo: "Seja a Mudança que você quer ver no Mundo: Práticas Inovadoras em Gestão de Pessoas", evento: "VI Congresso CONSAD de Gestão Pública, Brasília" },
  { ano: 2013, titulo: "A Interação de Culturas Organizacionais e seus Desdobramentos em Projetos de Consultoria: Um Estudo de Caso", evento: "XVI SEMEAD – FEA/USP, São Paulo" },
  { ano: 2013, titulo: "Inovação na Organização Ambidestra: Estudo de caso em um centro de medicina diagnóstica", evento: "SIMPOI 2013, São Paulo" },
  { ano: 2012, titulo: "The Presence of an Innovative Culture Across the Company and Differences Among Functional Areas", evento: "IAMOT 2012, Massachusetts" },
  { ano: 2011, titulo: "Innovative Culture and Product Development Success at Cristália: A Brazilian High Technology Company of the Pharmaceutical Sector", evento: "IAMOT 2011, Miami Beach" },
  { ano: 2011, titulo: "Impact of R&D Internationalization on the Coordination of New Product Development Activities: the 3M Dust Suppressant Project Case", evento: "IAMOT 2011, Miami Beach" },
  { ano: 2010, titulo: "Global R&D Coordination Assessment: 3M Case", evento: "19th IAMOT, Cairo" },
  { ano: 2010, titulo: "Competitive Technology Intelligence Maturity Level Assessment: conceptual framework and application", evento: "19th IAMOT, Cairo" },
  { ano: 2009, titulo: "Internationalization of R&D at 3M focusing on Wind Energy Business: Conceptual Model and Application", evento: "18th IAMOT, Miami" },
  { ano: 2009, titulo: "The organizational environment relevance to adopt an innovation: the e-learning use by employees", evento: "18th IAMOT, Miami" },
  { ano: 2008, titulo: "Adoção Organizacional de Inovações: Um Estudo sobre a Decisão de Adotar a Tecnologia de Celulares de Terceira Geração", evento: "XI Semead, São Paulo" },
  { ano: 2007, titulo: "E-Surveys: Vantagens e Limitações dos Questionários Eletrônicos via Internet no Contexto da Pesquisa Científica", evento: "SemeAd – FEA/USP, São Paulo" },
  { ano: 2007, titulo: "e-Learning Scorecard: Proposta para Avaliação de Cursos On-Line", evento: "Congresso Internacional de Educação a Distância, Curitiba" },
  { ano: 2006, titulo: "O Caso Fleury: Alinhamento Estratégico da Tecnologia da Informação", evento: "SIMPOI 2006, São Paulo" },
];

const LIVROS = [
  { ano: 2018, titulo: "Criatividade, Modelos Mentais e Inovação", editora: "Editora Senac, 273p.", url: "https://www.amazon.com.br/Criatividade-modelos-mentais-inova%C3%A7%C3%A3o-Universit%C3%A1ria-ebook/dp/B07H8R5J27" },
];

const CAPITULOS = [
  { ano: 2023, titulo: "Faça a coisa certa: elaborando uma estratégia para negócios sustentáveis (p. 29-44)", livro: "ESG: Environmental, Social and Governance", editora: "Arraes Editores, Belo Horizonte" },
  { ano: 2014, titulo: "Innovation in Services: The Case of Fleury, a Diagnostic Medical Center (p. 211-232)", livro: "Managing Consumer Services", editora: "Springer International Publishing" },
  { ano: 2013, titulo: "Práticas inovadoras em Gestão de Pessoas: um estudo de caso no setor de saúde (p. 319-341)", livro: "Contribuições para a Gestão de Pessoas na Administração Pública", editora: "Câmara Brasileira do Livro" },
  { ano: 2012, titulo: "Lições Aprendidas com o Sucesso do Google (p. 20-51)", livro: "Como vencer a concorrência de forma lucrativa", editora: "Editora Atlas, São Paulo" },
];

const PREMIOS = [
  { ano: 2020, premio: "Patrono da Turma de Graduação", concedido: "FIA Business School" },
  { ano: 2019, premio: "Outstanding Academic Performance Award – MBA Gestão de Negócios, Inovação e Empreendedorismo T33", concedido: "FIA Business School" },
  { ano: 2019, premio: "Paraninfo da Turma 9 de Graduação em Administração de Empresas", concedido: "FIA Business School" },
  { ano: 2018, premio: "Outstanding Academic Performance Award – MBA Gestão de Negócios, Inovação e Empreendedorismo", concedido: "FIA Business School" },
  { ano: 2017, premio: "Outstanding Academic Performance Award – Graduação Administração de Empresas T6", concedido: "FIA Business School" },
  { ano: 2017, premio: "Best Professor Award – MBA Executivo Internacional T46", concedido: "FIA Business School" },
  { ano: 2017, premio: "Outstanding Academic Performance Award – CapExecutivo T10", concedido: "FIA Business School" },
  { ano: 2016, premio: "Paraninfo", concedido: "FIA Business School" },
  { ano: 2015, premio: "Professor homenageado – Desempenho Acadêmico", concedido: "FIA Business School" },
  { ano: 2015, premio: "Melhor Desempenho Acadêmico", concedido: "MBA Conhecimento, Tecnologia e Inovação (classe de 2015)" },
  { ano: 2015, premio: "Paraninfo", concedido: "FIA Business School" },
  { ano: 2014, premio: "Melhor Professor do Curso", concedido: "Fiat-Chrysler Executive Master (class 2014)" },
  { ano: 2013, premio: "Melhor trabalho do congresso (track Cultura Organizacional)", concedido: "XVI Semead – Universidade de São Paulo" },
  { ano: 2013, premio: "Finalista do Prêmio Mário Covas de Inovação no Setor Público", concedido: "Estado de São Paulo" },
  { ano: 2012, premio: "Melhor Professor do Curso", concedido: "MBA Conhecimento, Tecnologia e Inovação" },
  { ano: 2004, premio: "Latin America MootCorp", concedido: "MootCorp" },
  { ano: 2004, premio: "Dissertação aprovada com Mérito Acadêmico", concedido: "Fundação Getúlio Vargas" },
];

const MIDIA = [
  { ano: 2024, titulo: "Em Davos, CEO da Telefônica (VIVT3) pede por desregulamentação na Europa", tipo: "Entrevista", url: "https://www.suno.com.br/noticias/telefonica-vivt3-ceo-pede-desregulamentacao-tecnologia-cpf/" },
  { ano: 2024, titulo: "Legislação sobre Inteligência Artificial na UE pode servir de modelo para o Brasil", tipo: "Entrevista", url: "https://investalk.bb.com.br/noticias/mercado/legislacao-sobre-inteligencia-artificial-na-ue-pode-servir-de-modelo-para-o-brasil" },
  { ano: 2024, titulo: "Como a Nvidia atropelou gigantes para se tornar uma das empresas mais valiosas do mundo", tipo: "Entrevista", url: "https://inteligenciafinanceira.com.br/mercado-financeiro/negocios/nvidia-atropelou-gigantes/" },
  { ano: 2024, titulo: "Duas décadas de interação nas redes sociais: o que há para comemorar", tipo: "Entrevista", url: "https://www.propmarkdigital.com.br/edicao-de-15-de-janeiro-de-2024/68598054/15" },
  { ano: 2024, titulo: "Cogna e Mackenzie fazem aliança para pós-graduação digital", tipo: "Entrevista", url: "https://valor.globo.com/empresas/noticia/2024/04/04/cogna-e-mackenzie-fazem-alianca-para-pos-graduacao-digital.ghtml" },
  { ano: 2024, titulo: "Inteligência Artificial e Ética", tipo: "Mesa redonda", url: null },
  { ano: 2023, titulo: "Hype da vez: ChatGPT é o novo metaverso?", tipo: "Entrevista", url: "https://forbes.com.br/forbes-tech/2023/02/chatgpt-e-o-novo-metaverso-quanto-tempo-dura-o-hype/" },
  { ano: 2023, titulo: "Em quais ações o ChatGPT investiria na Bolsa brasileira?", tipo: "Entrevista", url: "https://economia.uol.com.br/mais/suno/noticias/2023/02/22/em-quais-acoes-o-chatgpt-investiria-na-bolsa-brasileira.htm" },
  { ano: 2023, titulo: "Gestão errática de Musk no Twitter abre espaço para concorrentes", tipo: "Entrevista", url: "https://istoedinheiro.com.br/gestao-erratica-de-musk-no-twitter-abre-espaco-para-concorrentes-conheca-os-principais/" },
  { ano: 2023, titulo: "AI and the future of Education", tipo: "Mesa redonda", url: "https://www.youtube.com/live/n97L1vLawiY?si=0YH4goX-dJCNVLhR" },
  { ano: 2023, titulo: "Avanço da tecnologia tem mudado a profissão, o mercado de trabalho e o perfil dos profissionais", tipo: "Entrevista", url: "https://revistarba.org.br/avanco-da-tecnologia-tem-mudado-a-profissao-o-mercado-de-trabalho-e-o-perfil-dos-profissionais/" },
  { ano: 2023, titulo: "Escolas devem usar ChatGPT para potencializar aquisição de conhecimento", tipo: "Entrevista", url: "https://www.estadao.com.br/educacao/escolas-devem-usar-chatgpt-para-potencializar-aquisicao-de-conhecimento-diz-especialista/" },
  { ano: 2022, titulo: "Greenwashing – Avaliação de riscos e prevenção", tipo: "Entrevista", url: "https://cbn.globo.com/podcasts/fiacast/" },
  { ano: 2022, titulo: "ESG? Dicas para o investidor fugir do greenwashing", tipo: "Entrevista", url: "https://tc.com.br/mover" },
  { ano: 2022, titulo: "FIA Business School contribui para tornar a criatividade parte da rotina das empresas", tipo: "Entrevista", url: "https://abnoticianews.com.br/noticia/79157/fia-business-school-contribui-para-tornar-a-criatividade-parte-da-rotina-das-empresas" },
  { ano: 2022, titulo: "Medir o desempenho das empresas é o caminho para aprimorar ESG", tipo: "Entrevista", url: "https://www.estadao.com.br/economia/negocios/summit-esg-2022-desempenho-empresas/" },
  { ano: 2022, titulo: "Summit ESG 2022", tipo: "Mesa redonda", url: "https://www.youtube.com/watch?v=J2qHUYixLI8" },
  { ano: 2022, titulo: "Summit ESG: boas práticas atuam contra risco sistêmico em empresas", tipo: "Entrevista", url: "https://www.terra.com.br/economia/summit-esg-boas-praticas-atuam-contra-risco-sistemico-em-empresas-e-dao-respostas-a-sociedade,dad281511648ba00be3101bf8cac436bbvwtrwyd.html" },
  { ano: 2022, titulo: "Momento ESG – O dilema em torno dos riscos ESG nas empresas brasileiras", tipo: "Entrevista", url: null },
  { ano: 2022, titulo: "Greenwashing: o embuste", tipo: "Entrevista", url: null },
  { ano: 2022, titulo: "Os percalços do mundo ESG", tipo: "Entrevista", url: null },
  { ano: 2021, titulo: "Em crise, indústria brasileira busca caminhos para se reinventar", tipo: "Entrevista", url: null },
  { ano: 2020, titulo: "Todos querem inovação, mas como aprender a fazer isso no seu trabalho?", tipo: "Entrevista", url: null },
  { ano: 2020, titulo: "Segurança cibernética", tipo: "Mesa redonda", url: null },
  { ano: 2020, titulo: "Empresas mais inovadoras do Brasil", tipo: "Entrevista", url: null },
  { ano: 2020, titulo: "Novas tendências: Compartilhar transportes e alugar imóveis por prazos cada vez menores", tipo: "Entrevista", url: null },
  { ano: 2020, titulo: "Sobrevivência no cenário de pandemia", tipo: "Entrevista", url: null },
  { ano: 2019, titulo: "Adoção de inteligência artificial por empresas maduras envolve papel ativo de líderes", tipo: "Entrevista", url: null },
  { ano: 2019, titulo: "Presente e futuro das cidades inteligentes", tipo: "Entrevista", url: null },
  { ano: 2019, titulo: "Quatro formas de ganhar competitividade para sua indústria", tipo: "Entrevista", url: null },
  { ano: 2019, titulo: "Economia patinando e baixo investimento em educação são os principais gargalos do setor", tipo: "Entrevista", url: null },
  { ano: 2019, titulo: "A hélice tripla da inovação: Universidade, Governo e Mercado", tipo: "Mesa redonda", url: null },
  { ano: 2019, titulo: "Como estimular o intraempreendedorismo dentro da sua empresa", tipo: "Entrevista", url: null },
  { ano: 2018, titulo: "Painel Inovação na Educação: a Oportunidade de Incluir", tipo: "Mesa redonda", url: null },
  { ano: 2016, titulo: "Caderno Especial: Negócios no Futuro", tipo: "Entrevista", url: null },
  { ano: 2016, titulo: "Transformações criam um novo perfil de liderança", tipo: "Entrevista", url: null },
  { ano: 2014, titulo: "Inovação e Gestão de Pessoas", tipo: "Entrevista", url: null },
  { ano: 2013, titulo: "Brasil cai seis posições no ranking do Índice de Inovação Global 2013", tipo: "Entrevista", url: null },
];

const ARTIGOS_OPINIAO = [
  "Agente Smith, é você? A ascensão dos agentes de Inteligência Artificial",
  "Sua empresa deve ter um Centro de Excelência em Inovação?",
  "Marketing para produtos inovadores",
  "Do risco nuclear ao risco da IA",
  "Criativos, tenazes, estudiosos e generosos",
  "Criptografia pós-quântica",
  "A ambição embriaga mais do que a glória",
  "Indústria Verde: de tendência à prioridade",
  "Computação neuromórfica: o início da jornada das máquinas pensantes",
  "Aprendizado como legado",
  "CrIAtividade",
  "Hiperconexão: faça valer a pena",
  "A arte Zen de estabelecer métricas para inovação",
  "Breve ensaio sobre o paradoxo da escolha",
  "Não é somente sobre os dados",
  "Nem tudo precisa ser útil",
  "Robôs que respeitam: ética na era da IA",
  "Resultados em vez de entregas",
  "Reimaginando o conceito de sucesso",
  "O marketing nos tempos acelerados pela IA",
  "Estratégia é outra coisa",
  "Manifesto do aprendizado pela vida toda",
  "O futuro já chegou e ele é colaborativo",
  "As contradições de uma cultura inovadora",
  "Empresas digitalmente inteligentes",
  "A indústria de IA que temos e a que precisamos",
  "Seu próximo computador será invisível!",
  "Inovações radicais e os custos afundados",
  "Um bravo mundo novo",
  "Deep learning: o que fazer na fronteira da inteligência artificial",
  "Bem-vindos à era da computação em exaescala",
  "Mais de 70 anos de pesquisa sobre lançamento de novos produtos",
  "Humanos primeiro, por favor",
  "Uma universidade para chamar de sua",
  "O criativo à beira do abismo",
  "Governo aumentado pela IA: quatro pontos relevantes",
  "A simplicidade vem depois de muito esforço",
  "Escolha seus clientes, escolha seu futuro",
  "Liderança, aprendizado e IA: superando Dunning-Kruger",
  "Bioinspiração",
  "Transformação digital: uma odisseia moderna",
  "O que a Computação Quântica pode nos ensinar sobre inovações radicais",
  "A disciplina da criatividade",
  "Estratégias para proteger seu futuro profissional dos avanços da IA",
  "Computação de borda: você ainda vai ouvir falar muito sobre isso!",
  "Como a inteligência artificial generativa vai mudar o seu trabalho no futuro",
  "A ciência que move o agro e alimenta milhões",
  "O resultado da inovação",
];

// ── Tab IDs ────────────────────────────────────────────────────────────────

const TAB_IDS = ["cientificas", "livros", "premios", "midia", "academicas", "opiniao"] as const;
type TabId = (typeof TAB_IDS)[number];

const TAB_ICONS: Record<TabId, React.ElementType> = {
  cientificas: BookOpen,
  livros: BookMarked,
  premios: Award,
  midia: Mic,
  academicas: GraduationCap,
  opiniao: Newspaper,
};

const LIMITS = { artigos: 5, congressos: 8, premios: 8, midia: 10 };

// ── Helpers ────────────────────────────────────────────────────────────────

function YearBadge({ year }: { year: number }) {
  return (
    <span className="font-mono text-[11px] text-foreground/40 tabular-nums">{year}</span>
  );
}

function TypeBadge({ label }: { label: string }) {
  return (
    <span className="text-[10px] font-medium border border-border text-foreground/50 px-2 py-0.5 rounded-full">
      {label}
    </span>
  );
}

function LinkButton({ url, label }: { url: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[11px] text-primary hover:text-primary/70 transition-colors font-medium"
    >
      {label}
      <ExternalLink className="w-3 h-3" />
    </a>
  );
}

function VerMaisBtn({
  expanded,
  toggle,
  verMais,
  verMenos,
}: {
  expanded: boolean;
  toggle: () => void;
  verMais: string;
  verMenos: string;
}) {
  return (
    <button
      onClick={toggle}
      className="mt-6 flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors mx-auto"
    >
      {expanded ? (
        <>
          {verMenos} <ChevronUp className="w-4 h-4" />
        </>
      ) : (
        <>
          {verMais} <ChevronDown className="w-4 h-4" />
        </>
      )}
    </button>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function Publicacoes() {
  const { t } = useLanguage();
  const pub = t.publicacoes;

  const [activeTab, setActiveTab] = useState<TabId>("cientificas");
  const [subTab, setSubTab] = useState<"artigos" | "congressos">("artigos");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  const isExp = (key: string) => !!expanded[key];

  return (
    <section id="publicacoes" className="w-full py-32 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-pixel mb-4">
            {pub.label}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            {pub.h2}
          </h2>
        </motion.div>

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-border pb-6">
          {TAB_IDS.map((id, i) => {
            const Icon = TAB_ICONS[id];
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  isActive
                    ? "bg-foreground/8 border-foreground/15 text-foreground"
                    : "border-transparent text-foreground/45 hover:text-foreground/80 hover:bg-foreground/[0.04]"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${isActive ? "text-primary" : ""}`}
                  strokeWidth={1.5}
                />
                <span>{pub.tabs[i]}</span>
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {/* ── PUBLICAÇÕES CIENTÍFICAS ── */}
            {activeTab === "cientificas" && (
              <div>
                {/* Sub-tabs */}
                <div className="flex gap-3 mb-8">
                  {pub.subtabs.map((label, i) => {
                    const key = i === 0 ? "artigos" : "congressos";
                    return (
                      <button
                        key={key}
                        onClick={() =>
                          setSubTab(key as "artigos" | "congressos")
                        }
                        className={`text-sm px-4 py-1.5 rounded-full border transition-all ${
                          subTab === key
                            ? "border-primary/40 text-primary bg-primary/5"
                            : "border-transparent text-foreground/40 hover:text-foreground/70"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* Artigos em Periódicos */}
                {subTab === "artigos" && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(isExp("artigos")
                        ? ARTIGOS_PERIODICOS
                        : ARTIGOS_PERIODICOS.slice(0, LIMITS.artigos)
                      ).map((a, i) => (
                        <div
                          key={i}
                          className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-foreground/15 transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <YearBadge year={a.ano} />
                            {a.url && (
                              <a
                                href={a.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground/20 group-hover:text-primary transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          <p className="text-sm font-medium text-foreground/90 leading-snug">
                            {a.titulo}
                          </p>
                          <p className="text-xs text-primary/80 font-medium mt-auto">
                            {a.periodico}
                          </p>
                        </div>
                      ))}
                    </div>
                    {ARTIGOS_PERIODICOS.length > LIMITS.artigos && (
                      <div className="flex justify-center">
                        <VerMaisBtn
                          expanded={isExp("artigos")}
                          toggle={() => toggle("artigos")}
                          verMais={`${pub.verMais} (${ARTIGOS_PERIODICOS.length - LIMITS.artigos})`}
                          verMenos={pub.verMenos}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Congressos */}
                {subTab === "congressos" && (
                  <div>
                    <div className="overflow-x-auto rounded-xl border border-border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border bg-card/50">
                            <th className="text-left font-mono text-[11px] text-foreground/40 px-4 py-3 uppercase tracking-wide w-16">
                              {pub.anoLabel}
                            </th>
                            <th className="text-left font-mono text-[11px] text-foreground/40 px-4 py-3 uppercase tracking-wide">
                              {pub.tituloLabel}
                            </th>
                            <th className="text-left font-mono text-[11px] text-foreground/40 px-4 py-3 uppercase tracking-wide hidden md:table-cell">
                              {pub.eventoLabel}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(isExp("congressos")
                            ? CONGRESSOS
                            : CONGRESSOS.slice(0, LIMITS.congressos)
                          ).map((c, i) => (
                            <tr
                              key={i}
                              className="border-b border-border/50 last:border-0 hover:bg-card/40 transition-colors"
                            >
                              <td className="px-4 py-3.5 align-top">
                                <YearBadge year={c.ano} />
                              </td>
                              <td className="px-4 py-3.5 align-top text-foreground/80 leading-snug">
                                {c.titulo}
                                <p className="text-xs text-foreground/40 mt-1 md:hidden">
                                  {c.evento}
                                </p>
                              </td>
                              <td className="px-4 py-3.5 align-top text-xs text-foreground/45 hidden md:table-cell leading-snug">
                                {c.evento}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {CONGRESSOS.length > LIMITS.congressos && (
                      <div className="flex justify-center">
                        <VerMaisBtn
                          expanded={isExp("congressos")}
                          toggle={() => toggle("congressos")}
                          verMais={`${pub.verMais} (${CONGRESSOS.length - LIMITS.congressos})`}
                          verMenos={pub.verMenos}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ── LIVROS & CAPÍTULOS ── */}
            {activeTab === "livros" && (
              <div className="space-y-10">
                {/* Featured book */}
                {LIVROS.map((l, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row gap-6 bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-foreground/15 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-24 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border border-primary/20 flex items-center justify-center">
                      <BookMarked className="w-8 h-8 text-primary/60" strokeWidth={1} />
                    </div>
                    <div className="flex flex-col justify-center gap-3">
                      <div className="flex items-center gap-3">
                        <TypeBadge label={pub.livroLabel} />
                        <YearBadge year={l.ano} />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{l.titulo}</h3>
                      <p className="text-sm text-foreground/50">{l.editora}</p>
                      {l.url && (
                        <LinkButton url={l.url} label={pub.comprarLabel} />
                      )}
                    </div>
                  </div>
                ))}

                {/* Capítulos */}
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.2em] text-foreground/40 font-pixel mb-4">
                    {pub.capitulosLabel}
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-card/50">
                          <th className="text-left font-mono text-[11px] text-foreground/40 px-4 py-3 uppercase tracking-wide w-16">
                            {pub.anoLabel}
                          </th>
                          <th className="text-left font-mono text-[11px] text-foreground/40 px-4 py-3 uppercase tracking-wide">
                            {pub.capituloLabel}
                          </th>
                          <th className="text-left font-mono text-[11px] text-foreground/40 px-4 py-3 uppercase tracking-wide hidden md:table-cell">
                            {pub.livroSrcLabel}
                          </th>
                          <th className="text-left font-mono text-[11px] text-foreground/40 px-4 py-3 uppercase tracking-wide hidden lg:table-cell">
                            {pub.editoraLabel}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {CAPITULOS.map((c, i) => (
                          <tr
                            key={i}
                            className="border-b border-border/50 last:border-0 hover:bg-card/40 transition-colors"
                          >
                            <td className="px-4 py-3.5 align-top">
                              <YearBadge year={c.ano} />
                            </td>
                            <td className="px-4 py-3.5 align-top text-foreground/80 leading-snug">
                              {c.titulo}
                            </td>
                            <td className="px-4 py-3.5 align-top text-xs text-foreground/45 hidden md:table-cell italic leading-snug">
                              {c.livro}
                            </td>
                            <td className="px-4 py-3.5 align-top text-xs text-foreground/40 hidden lg:table-cell">
                              {c.editora}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── PRÊMIOS ── */}
            {activeTab === "premios" && (
              <div>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-card/50">
                        <th className="text-left font-mono text-[11px] text-foreground/40 px-4 py-3 uppercase tracking-wide w-16">
                          {pub.anoLabel}
                        </th>
                        <th className="text-left font-mono text-[11px] text-foreground/40 px-4 py-3 uppercase tracking-wide">
                          {pub.premioLabel}
                        </th>
                        <th className="text-left font-mono text-[11px] text-foreground/40 px-4 py-3 uppercase tracking-wide hidden md:table-cell">
                          {pub.concedidoLabel}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(isExp("premios")
                        ? PREMIOS
                        : PREMIOS.slice(0, LIMITS.premios)
                      ).map((p, i) => (
                        <tr
                          key={i}
                          className="border-b border-border/50 last:border-0 hover:bg-card/40 transition-colors"
                        >
                          <td className="px-4 py-3.5 align-top">
                            <YearBadge year={p.ano} />
                          </td>
                          <td className="px-4 py-3.5 align-top text-foreground/80 leading-snug">
                            {p.premio}
                            <p className="text-xs text-foreground/40 mt-1 md:hidden">
                              {p.concedido}
                            </p>
                          </td>
                          <td className="px-4 py-3.5 align-top text-xs text-foreground/45 hidden md:table-cell">
                            {p.concedido}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {PREMIOS.length > LIMITS.premios && (
                  <div className="flex justify-center">
                    <VerMaisBtn
                      expanded={isExp("premios")}
                      toggle={() => toggle("premios")}
                      verMais={`${pub.verMais} (${PREMIOS.length - LIMITS.premios})`}
                      verMenos={pub.verMenos}
                    />
                  </div>
                )}
              </div>
            )}

            {/* ── NA MÍDIA ── */}
            {activeTab === "midia" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(isExp("midia")
                    ? MIDIA
                    : MIDIA.slice(0, LIMITS.midia)
                  ).map((m, i) => (
                    <div
                      key={i}
                      className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2.5 hover:border-foreground/15 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <TypeBadge label={m.tipo} />
                        <YearBadge year={m.ano} />
                      </div>
                      <p className="text-sm text-foreground/85 leading-snug font-medium">
                        {m.titulo}
                      </p>
                      {m.url && (
                        <div className="mt-auto pt-1">
                          <LinkButton url={m.url} label={pub.acessar} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {MIDIA.length > LIMITS.midia && (
                  <div className="flex justify-center">
                    <VerMaisBtn
                      expanded={isExp("midia")}
                      toggle={() => toggle("midia")}
                      verMais={`${pub.verMais} (${MIDIA.length - LIMITS.midia})`}
                      verMenos={pub.verMenos}
                    />
                  </div>
                )}
              </div>
            )}

            {/* ── ATIVIDADES ACADÊMICAS ── */}
            {activeTab === "academicas" && (
              <div className="max-w-3xl">
                <div className="space-y-4">
                  {pub.atividades.map((a, i) => (
                    <div
                      key={i}
                      className="flex gap-4 bg-card border border-border rounded-xl p-5 hover:border-foreground/15 transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center mt-0.5">
                        <GraduationCap className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── ARTIGOS DE OPINIÃO ── */}
            {activeTab === "opiniao" && (
              <div>
                <p className="text-sm text-foreground/40 mb-6">{pub.opiniaoSource}</p>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-card/50">
                        <th className="text-left font-mono text-[11px] text-foreground/40 px-4 py-3 uppercase tracking-wide w-12">
                          #
                        </th>
                        <th className="text-left font-mono text-[11px] text-foreground/40 px-4 py-3 uppercase tracking-wide">
                          {pub.tituloLabel}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ARTIGOS_OPINIAO.map((titulo, i) => (
                        <tr
                          key={i}
                          className="border-b border-border/40 last:border-0 hover:bg-card/40 transition-colors"
                        >
                          <td className="px-4 py-3 align-top">
                            <span className="font-mono text-[11px] text-foreground/25 tabular-nums">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </td>
                          <td className="px-4 py-3 align-top text-foreground/75 leading-snug">
                            {titulo}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
