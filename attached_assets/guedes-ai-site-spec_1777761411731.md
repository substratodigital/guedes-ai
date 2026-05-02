# GUEDES.AI — Design Spec & Dev Spec
### Landing Page para Palestrante & Cientista Internacional
**Versão 1.0 — Maio 2025**

---

## 1. VISÃO GERAL DO PROJETO

**Objetivo:** Site de marca pessoal de Luís Guedes — palestrante, professor-doutor, consultor e pesquisador em IA & Inovação. O site deve funcionar como hub de conversão para contratação de palestras/eventos, consultoria e newsletter.

**Tom:** Autoridade intelectual com energia humana. Rigor acadêmico com linguagem acessível. Futurismo com calor. Não é um site corporativo frio — é a marca de uma pessoa com história, paixão e propósito.

**Audiência-alvo:**
- Organizadores de eventos e congressos (nacionais e internacionais)
- RH e L&D de grandes empresas
- Executivos C-level buscando mentoria e consultoria
- Jornalistas e assessores de imprensa
- Academia / pesquisadores

---

## 2. DESIGN SYSTEM

### 2.1 Paleta de Cores

Extraída diretamente do portfolio PDF (fundo azul-royal profundo, pixel art, gradientes teal/verde):

```css
:root {
  /* Primárias */
  --color-deep-navy:    #0A0E27;   /* fundo base / hero */
  --color-royal-blue:   #1A1FCC;   /* azul vibrante dos destaques */
  --color-electric:     #2D35FF;   /* botões, CTAs, links ativos */
  --color-pixel-purple: #5B4AE8;   /* accent secundário */

  /* Gradientes */
  --gradient-hero: linear-gradient(135deg, #0A0E27 0%, #0D1A5E 50%, #0A2E2A 100%);
  --gradient-teal: linear-gradient(135deg, #0A2E2A 0%, #0B4D3E 100%);
  --gradient-card: linear-gradient(135deg, rgba(26,31,204,0.15) 0%, rgba(91,74,232,0.10) 100%);
  --gradient-glow: radial-gradient(ellipse at center, rgba(45,53,255,0.3) 0%, transparent 70%);

  /* Neutras */
  --color-white:        #FFFFFF;
  --color-off-white:    #E8EAFF;
  --color-muted:        #7B82C0;
  --color-border:       rgba(255,255,255,0.08);
  --color-surface:      rgba(255,255,255,0.04);

  /* Accent especial */
  --color-green-teal:   #00C896;   /* highlight de dados/stats */
  --color-pixel-white:  #FFFFFF;
}
```

### 2.2 Tipografia

**Filosofia:** Pixel art nos títulos (referência visual da apresentação) + sans-serif técnico-humanista no corpo.

```css
/* Display / Headings principais */
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
/* Alternativa pixel: Press Start 2P (para elementos decorativos menores) */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

/* Body / UI */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

/* Quotes / Destaques editoriais */
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');

:root {
  --font-display:   'Space Mono', monospace;        /* H1, logotipo, stats grandes */
  --font-pixel:     'Press Start 2P', monospace;    /* tags decorativas, badges */
  --font-body:      'DM Sans', sans-serif;          /* parágrafos, nav, UI */
  --font-editorial: 'DM Serif Display', serif;      /* citações, subtítulos especiais */

  /* Escala */
  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.25rem;   /* 20px */
  --text-xl:   1.5rem;    /* 24px */
  --text-2xl:  2rem;      /* 32px */
  --text-3xl:  3rem;      /* 48px */
  --text-4xl:  4rem;      /* 64px */
  --text-hero: clamp(3rem, 8vw, 7rem);
}
```

### 2.3 Efeitos Visuais & Atmosfera

Inspiração: unicorn.studio / neuform.ai — WebGL particles, aurora, glow orgânico.

```
- Background: partículas flutuantes com noise Simplex (three.js ou tsparticles)
- Glow aura ao redor da foto do palestrante
- Grid lines levemente visíveis (estilo tela retro / wireframe)
- Noise texture overlay sutil (5% opacidade) para profundidade
- Scanlines animadas na seção hero (nod to pixel aesthetic do PDF)
- Aurora / nebula blob animado no background (CSS houdini ou canvas)
- Cursor customizado: pequeno pixel crosshair
```

---

## 3. ESTRUTURA DE SEÇÕES (Landing Page)

### SEÇÃO 1 — HERO
**Conteúdo:**
- Logo "GUEDES.AI" em Space Mono, all-caps, com efeito glitch/scanline
- Tagline: "IA e Inovação para o Futuro"
- Sub-tagline: "Professor-Doutor · Palestrante Internacional · Consultor Estratégico"
- CTA primário: "Agende uma Palestra" → âncora #contato
- CTA secundário: "Conheça o trabalho" → âncora #palestras
- Foto de Luís Guedes com glow azul/teal ao redor
- Background: canvas animado com partículas + gradiente deep navy

**Animações (GSAP):**
- Logo entra com efeito typewriter + glitch (SplitText)
- Tagline: stagger fade-in palavra por palavra
- Foto: aparece com scale(0.9→1) + blur(8px→0) + aura pulsante
- Partículas de fundo: movimento contínuo lento

---

### SEÇÃO 2 — NÚMEROS / SOCIAL PROOF
**Conteúdo (dados do PDF):**
- 100+ Palestras nos últimos 5 anos
- 30+ Anos de Experiência Profissional
- 60+ Artigos Científicos Publicados
- 200+ Congressos Acadêmicos
- 50+ Projetos de Consultoria
- 50+ Orientações (MBA, Mestrado, Doutorado)
- Países: Brasil, EUA, Egito, Colômbia, Espanha

**Layout:** 3 colunas, números grandes em Space Mono com counter animado ao entrar na viewport

**Animações (GSAP + ScrollTrigger):**
- Counter up ao scroll
- Cards com leve parallax
- Números com cor var(--color-green-teal)

---

### SEÇÃO 3 — O ESPECIALISTA (Mini Bio)
**Conteúdo:**
Luís Guedes é executivo sênior com mais de 30 anos de experiência consolidada nos ambientes corporativo e acadêmico. Pós-doutor em IA pela FEA/USP (2024), Doutor em Inovação pela FEA/USP (2012), Mestre em Gestão de Operações pela FGV/EAESP (2004), Engenheiro de Computadores pela FEI (1995).

Professor premiado com 19 prêmios de excelência didática. Consultor estratégico da FIA Consulting desde 2015. Ex-Google (Head FP&A Latam, 2011-2012). Autor do livro "Criatividade, modelos mentais e inovação" (Ed. Senac).

Conselheiro da Prefeitura de São Paulo para Políticas e Ações Climáticas. Membro da Comissão de Estudo de Tecnologia Quântica da ABNT. Consultor da Comissão Brasileira de Estudo de IA da ABNT (desde 2025). Articulista de Inovação da revista Isto É Dinheiro (2023–2025).

**Filosofia pessoal (destaque em quote):**
> "Busco inspirar novas reflexões, provocar as pessoas para repensar o sucesso e apoiar a mudança em direção a um novo capitalismo: veloz, eficiente, equilibrado."

**Layout:** 2 colunas — foto + texto. Timeline horizontal de educação/carreira abaixo.

**Animações (GSAP):**
- Foto com efeito parallax no scroll
- Quote com reveal de linha por linha
- Timeline: pin + scrub horizontal

---

### SEÇÃO 4 — PALESTRAS (Portfolio de Temas)
**Conteúdo — 3 temas principais:**

**IA | 360 — Fundamentos de IA para um Novo Mundo**
Formato: Palestra / Mini-curso
Para quem: Executivos, líderes, profissionais
Aborda: Carreira e futuro, empresa e time, família e filhos, sociedade

**Acelerando a Implementação da IA**
Formato: Palestra
Para quem: Líderes e equipes de inovação
Aborda: Eficiência, riscos de LLMs, delegação para IA, plano de inovação

**800km, Um Passo de Cada Vez**
Formato: Palestra motivacional / inspiracional
Para quem: Todos os públicos corporativos
Aborda: Lições do Caminho de Santiago para a vida corporativa

**Layout:** Cards com hover 3D tilt (usando VanillaTilt.js ou GSAP). Fundo de cada card com imagem temática com overlay.

**Animações (GSAP):**
- Cards entram com stagger do lado esquerdo
- Hover: lift + shadow + border glow
- Clique: expand para modal com detalhes completos

---

### SEÇÃO 5 — TRAJETÓRIA (Timeline Interativa)
**Conteúdo:**

**Experiência:**
- FIA Consulting | Desde 2015 — Consultor Estratégico
- FIA / Einstein | Desde 2009 — Professor-Doutor (IA, Inovação, Criatividade)
- Google | 2011–2012 — Head FP&A Latam

**Educação:**
- Pós-Doutorado em IA — FEA/USP (2022–2024)
- Doutorado em Inovação — FEA/USP (2008–2012)
- Mestrado em Gestão de Operações — FGV/EAESP (2002–2004)
- Engenharia de Computadores — FEI (1990–1995)

**Layout:** Timeline vertical scrollável com ícones estilo pixel (referência visual do PDF)

**Animações (GSAP + ScrollTrigger):**
- Linha da timeline se desenha conforme scroll
- Cada item entra com fade-in da esquerda/direita alternados
- Ícones "pulsam" ao entrar na viewport

---

### SEÇÃO 6 — CLIENTES & PARCEIROS
**Conteúdo (logos do PDF):**
Encontro Nacional da Mulher Contabilista, ALESP, Bunge, CCR, CONARH ABRH Brasil, FIESP, Firjan SENAI SESI IEL CIRJ, IAMOT Montreal, Itaú Social, IT Forum, LHH, Mahle, MedMax, FUNASA, Nile University, Pacto Global Rede Brasil, PIT São José dos Campos, Prefeitura de São Paulo, Porto de Santos, SERPRO, SPUrbanismo, Swisscam Brasil.

**Layout:** Marquee/carrossel infinito horizontal com logos em grayscale → colorido no hover

**Animações:** CSS scroll marquee + GSAP hover colorize

---

### SEÇÃO 7 — NEWSLETTER
**Conteúdo:**
"Newsletter do Guedes" — mensal, no LinkedIn Newsletters
Link: linkedin.com/newsletters/newsletter-do-guedes-7186097313407258624/

**Layout:** Banner full-width com CTA para assinar. Campo de e-mail (integração futura). Preview de edição recente.

---

### SEÇÃO 8 — SOLUÇÕES (Além das Palestras)
**Conteúdo (do portfolio KNP):**
- Consultoria Estratégica — projetos complexos para governos e grandes empresas
- Mentoria Executiva — sessões individuais para líderes
- Desenvolvimento Gerencial — em parceria com FIA Business School
- Research as a Service — pesquisas com rigor acadêmico
- Coprodução de Artigos Acadêmicos — journals, white papers, position papers

**Layout:** Grid 2x3 de cards com ícone, título e descrição curta. CTA "Saiba mais" em cada card.

---

### SEÇÃO 9 — DEPOIMENTOS
**Conteúdo (do site KNP):**
> "A oportunidade das conversas semanais com o prof. Guedes ao longo desses três meses mostrou novos caminhos para a minha atuação na empresa e me ajudou a evitar obstáculos na chegada a essa nova função."
> — VP Jurídico, Empresa Alimentícia

> "A decisão de aceitar uma posição executiva fora do país foi a mais difícil da minha carreira e a mentoria me ajudou muito a pesar todos os fatores..."
> — Diretor Marketing B2B, Indústria Química

**Layout:** Carrossel de cards estilo "terminal" (bordas pixeladas, fundo escuro)

---

### SEÇÃO 10 — CONTATO / CTA FINAL
**Conteúdo:**
"Há muito o que fazer. Vamos juntos!"
"Comecemos com um café ☕"

- WhatsApp: (11) 99958-7672
- E-mail: lguedes.sp@gmail.com
- LinkedIn: linkedin.com/in/lguedes/
- Formulário de contato (nome, empresa, tipo de demanda, mensagem)

**Layout:** Split — texto + form. Background com glow radial máximo.

---

## 4. NAVEGAÇÃO

```
Logo GUEDES.AI  |  Palestras  |  Trajetória  |  Soluções  |  Newsletter  |  [Contato →]
```

- Sticky header com blur backdrop
- Hamburger em mobile
- Smooth scroll
- Active state no item correspondente à seção visível (ScrollTrigger)

---

## 5. ESPECIFICAÇÃO TÉCNICA (DEV SPEC)

### 5.1 Stack Recomendada

```
Framework:     HTML5 + Vanilla JS  (ou Astro se quiser SSG)
Animações:     GSAP 3 (ScrollTrigger, SplitText, Flip, MorphSVG)
3D/Partículas: Three.js (WebGL particles no hero)
               OU tsParticles (mais leve, sem WebGL)
Formulário:    Formspree ou Netlify Forms
CSS:           Custom Properties + CSS Grid/Flexbox
               NÃO usar Tailwind (custom design system)
Fontes:        Google Fonts (Space Mono, Press Start 2P, DM Sans, DM Serif Display)
Deploy:        Replit → export para Netlify/Vercel
```

### 5.2 Estrutura de Arquivos

```
guedes-ai/
├── index.html
├── assets/
│   ├── css/
│   │   ├── reset.css
│   │   ├── tokens.css       ← design tokens (cores, fonts, spacing)
│   │   ├── components.css   ← cards, buttons, tags
│   │   ├── sections.css     ← estilos de cada seção
│   │   └── animations.css   ← keyframes CSS
│   ├── js/
│   │   ├── main.js          ← init, nav, scroll
│   │   ├── hero.js          ← three.js / partículas
│   │   ├── gsap-anims.js    ← todas as animações GSAP
│   │   └── utils.js
│   ├── images/
│   │   ├── guedes-hero.webp
│   │   ├── guedes-bio.webp
│   │   └── logos/           ← logos dos clientes
│   └── fonts/               ← fallback local se necessário
└── README.md
```

### 5.3 Animações GSAP — Detalhamento

#### Hero entrance sequence (timeline)
```javascript
const heroTL = gsap.timeline({ delay: 0.3 });

heroTL
  .from('.logo-text', {
    duration: 1.2,
    text: { value: '', delimiter: '' },  // SplitText typewriter
    ease: 'none'
  })
  .from('.hero-tagline span', {
    duration: 0.6,
    y: 30,
    opacity: 0,
    stagger: 0.08,
    ease: 'power3.out'
  }, '-=0.3')
  .from('.hero-photo', {
    duration: 1,
    scale: 0.9,
    filter: 'blur(12px)',
    opacity: 0,
    ease: 'power2.out'
  }, '-=0.4')
  .from('.hero-cta', {
    duration: 0.5,
    y: 20,
    opacity: 0,
    stagger: 0.15,
    ease: 'back.out(1.7)'
  }, '-=0.2');
```

#### Stats counter (ScrollTrigger)
```javascript
gsap.utils.toArray('.stat-number').forEach(el => {
  const target = +el.dataset.target;
  ScrollTrigger.create({
    trigger: el,
    start: 'top 80%',
    onEnter: () => {
      gsap.to({ val: 0 }, {
        val: target,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate() { el.textContent = Math.round(this.targets()[0].val) + '+'; }
      });
    }
  });
});
```

#### Timeline draw (ScrollTrigger scrub)
```javascript
gsap.to('.timeline-line', {
  scaleY: 1,
  transformOrigin: 'top center',
  ease: 'none',
  scrollTrigger: {
    trigger: '.timeline-section',
    start: 'top 70%',
    end: 'bottom 30%',
    scrub: true
  }
});
```

#### Cards 3D hover (VanillaTilt ou GSAP)
```javascript
document.querySelectorAll('.palestra-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 15,
      rotateX: -y * 15,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
  });
});
```

#### Particle hero (Three.js)
```javascript
// Setup básico de partículas flutuantes
// ~2000 partículas, cor azul/branco, movimento senoidal lento
// Reagir ao movimento do mouse (parallax suave)
// Shader simples com noise para variação de opacidade
```

### 5.4 Glitch Effect (Logo)

```css
@keyframes glitch {
  0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
  10% { clip-path: inset(10% 0 60% 0); transform: translate(-3px, 1px); }
  20% { clip-path: inset(40% 0 20% 0); transform: translate(3px, -1px); }
  30% { clip-path: inset(70% 0 10% 0); transform: translate(-2px, 2px); }
  40% { clip-path: inset(20% 0 70% 0); transform: translate(2px, -2px); }
}

.logo-glitch::before,
.logo-glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}
.logo-glitch::before {
  color: #2D35FF;
  animation: glitch 3s infinite;
  animation-delay: 0.1s;
}
.logo-glitch::after {
  color: #00C896;
  animation: glitch 3s infinite;
  animation-delay: -0.1s;
}
```

### 5.5 Aurora / Background Blob Animation

```css
.aurora-blob {
  position: fixed;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: aurora-drift 12s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes aurora-drift {
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(100px, -80px) scale(1.2); }
  66%  { transform: translate(-60px, 120px) scale(0.9); }
  100% { transform: translate(80px, 40px) scale(1.1); }
}
```

### 5.6 Componentes UI

#### Button styles
```css
.btn-primary {
  background: var(--color-electric);
  color: white;
  font-family: var(--font-display);
  font-size: var(--text-sm);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 14px 32px;
  border: none;
  position: relative;
  cursor: pointer;
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
  transition: background 0.2s;
}
/* Estilo "cortado" nos cantos — referência ao design pixel do PDF */

.btn-outline {
  background: transparent;
  border: 1px solid var(--color-electric);
  color: var(--color-electric);
  /* mesmo clip-path */
}
```

#### Pixel Badge / Tag
```css
.pixel-tag {
  font-family: var(--font-pixel);
  font-size: 8px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-electric);
  border: 1px solid var(--color-electric);
  padding: 6px 12px;
  display: inline-block;
  /* box-shadow pixelado */
  box-shadow: 2px 2px 0 var(--color-electric);
}
```

---

## 6. RESPONSIVIDADE

| Breakpoint | Layout |
|---|---|
| < 480px (mobile S) | 1 coluna, font-scale reduzida, hero stack vertical |
| 480–768px (mobile L) | 1 coluna, cards full-width |
| 768–1024px (tablet) | 2 colunas onde aplicável |
| 1024–1440px (desktop) | Layout completo, 3 colunas |
| > 1440px (wide) | Max-width 1400px centralizado |

---

## 7. SEO & META

```html
<title>Luís Guedes — IA e Inovação para o Futuro | Palestrante Internacional</title>
<meta name="description" content="Pós-doutor em IA, professor, consultor e palestrante internacional. 100+ palestras no Brasil, EUA, Egito, Colômbia e Espanha. Especialista em IA, Inovação e Estratégia.">
<meta property="og:title" content="Luís Guedes — GUEDES.AI">
<meta property="og:image" content="[foto hero]">
<meta name="robots" content="index, follow">
```

**Schema.org recomendado:** `Person` + `ProfessionalService`

---

## 8. PERFORMANCE

- Imagens em `.webp` com lazy loading
- Fontes com `font-display: swap`
- GSAP carregado via CDN com defer
- Three.js: carregado apenas se `!window.matchMedia('(prefers-reduced-motion)').matches`
- Partículas desabilitadas em mobile (substituídas por CSS gradient animado)
- Lighthouse target: ≥ 90 Performance, 100 Accessibility

---

## 9. CONTATO & INTEGRAÇÕES

| Canal | Valor |
|---|---|
| WhatsApp | (11) 99958-7672 |
| E-mail | lguedes.sp@gmail.com |
| LinkedIn | linkedin.com/in/lguedes/ |
| Newsletter | LinkedIn Newsletters — Newsletter do Guedes |
| Formulário | Formspree (free tier suficiente para início) |

**Botão WhatsApp flutuante:** canto inferior direito, animação de pulse suave.

---

## 10. ROADMAP DE IMPLEMENTAÇÃO (Replit)

### Fase 1 — Estrutura base (1-2h)
- [ ] `index.html` com todas as seções vazia
- [ ] `tokens.css` com design system completo
- [ ] Google Fonts import
- [ ] Nav sticky funcional
- [ ] Smooth scroll

### Fase 2 — Hero (2-3h)
- [ ] Layout hero com foto
- [ ] Three.js / tsParticles background
- [ ] GSAP entrance animation
- [ ] Glitch logo effect
- [ ] Aurora blob CSS

### Fase 3 — Conteúdo (3-4h)
- [ ] Stats section com counter
- [ ] Bio section com quote
- [ ] Palestras cards com hover 3D
- [ ] Timeline com draw animation
- [ ] Logos marquee

### Fase 4 — Polimento (2h)
- [ ] Soluções grid
- [ ] Depoimentos carrossel
- [ ] Formulário contato
- [ ] WhatsApp float button
- [ ] Newsletter CTA

### Fase 5 — Otimização (1h)
- [ ] WebP conversion
- [ ] Lazy loading
- [ ] Mobile responsivo
- [ ] Meta tags SEO

---

## 11. REFERÊNCIAS VISUAIS DE ANIMAÇÃO

| Referência | O que usar |
|---|---|
| unicorn.studio | Partículas WebGL, aurora, blobs orgânicos animados |
| neuform.ai | Cards com glassmorphism, hover lift, glow effects |
| Portfolio PDF | Pixel art aesthetic, grid de fundo, cores deep navy + electric blue |
| Apresentação | Tipografia Space Mono, badges com bordas pixeladas, layout assimétrico |

---

*Documento gerado para implementação no Replit. Todos os valores de cores, fontes e breakpoints são definitivos e devem ser seguidos à risca para manter coerência com a identidade visual existente de Luís Guedes / GUEDES.AI.*
