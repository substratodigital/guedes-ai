# GUEDES.AI — Design Spec

> Documento de referência visual e de sistema de design do site pessoal do  
> Prof. Dr. Luís Fernando Ascenção Guedes.

---

## Identidade Visual

### Conceito

Layout de marca pessoal acadêmica com estética **tech-minimalista**: fundo
escuro quase preto, tipografia grande, sem ornamentação excessiva. O objetivo
é transmitir autoridade intelectual com modernidade.

### Valores Visuais

- **Clareza** — hierarquia tipográfica forte, sem ruído visual
- **Contraste** — dark-first com variante light limpa
- **Profundidade** — camadas (background → shader → conteúdo)
- **Precisão** — ícones exclusivamente outline, sem preenchimento

---

## Paleta de Cores

### Dark Mode (padrão)

| Nome | HSL | Hex aproximado | Uso |
|------|-----|----------------|-----|
| Background | `240 6% 4%` | `#09090f` | Fundo da página |
| Foreground | `240 5% 96%` | `#f4f4f6` | Texto principal |
| Primary | `239 84% 67%` | `#6366f1` | Destaques, links, badges |
| Card | `240 5% 8%` | `#111117` | Cards e painéis |
| Border | `240 6% 11%` | `#1a1a24` | Divisores e contornos |
| Muted FG | `240 5% 60%` | `#8f8f9e` | Texto secundário |

### Light Mode

| Nome | HSL | Hex aproximado | Uso |
|------|-----|----------------|-----|
| Background | `0 0% 99%` | `#fcfcfc` | Fundo da página |
| Foreground | `240 10% 8%` | `#111118` | Texto principal |
| Primary | `239 84% 60%` | `#4f46e5` | Destaques |
| Card | `0 0% 97%` | `#f7f7f7` | Cards |
| Border | `240 6% 90%` | `#e2e2e8` | Divisores |

### Accent Gradient

```css
/* Títulos com gradiente de acento */
background: linear-gradient(135deg, #4F46E5 0%, #6366F1 50%, #818CF8 100%);
```

---

## Tipografia

### Família: Geist

Três variantes da família Geist, cada uma com papel específico:

#### Geist Sans — Texto Principal
- Arquivo: `GeistSans-Variable.woff2` (variável, 100–900)
- Classe Tailwind: `font-sans` (padrão do `body`)
- Usos: Headings (`h1`–`h3`), corpo de texto, botões, labels de UI

#### Geist Mono — Dados e Números
- Arquivo: `GeistMono-Variable.woff2` (variável, 100–900)
- Classe Tailwind: `font-mono`
- Usos: Anos/datas, numeração (`01`, `02`...), labels de tipo, código

#### Geist Pixel — Eyebrow / Labels de Seção
- Arquivo: `GeistPixel.woff2` (400 fixo)
- Classe Tailwind: `font-pixel`
- Usos: Labels de seção em ALL CAPS (`PALESTRAS`, `CLIENTES`...), badges do Hero

### Escala Tipográfica

| Elemento | Tamanho | Peso | Fonte |
|----------|---------|------|-------|
| Hero H1 "Luís Guedes" | `clamp(52px, 10vw, 120px)` | 700 | Geist Sans |
| Section H2 | `text-3xl` a `text-5xl` | 700 | Geist Sans |
| Card Title | `text-sm` a `text-xl` | 500–700 | Geist Sans |
| Body | `text-sm` / `text-base` | 400 | Geist Sans |
| Eyebrow | `11px`, `tracking-[0.2em]` | — | Geist Pixel |
| Year / Label | `11px–12px` | — | Geist Mono |
| Nav links | `13px` | 400 | Geist Sans |

---

## Layout e Grid

### Container

```
max-width: 1280px  (max-w-7xl)
padding-x: 24px    (px-6)
```

### Seções

Cada seção usa `py-32` (128px topo e base). Padrão:

```
eyebrow label (font-pixel, 11px, ALL CAPS)
↓ 16px
H2 (text-3xl md:text-5xl, font-bold)
↓ 32–48px
conteúdo
```

### Breakpoints (Tailwind padrão)

| Breakpoint | px | Uso |
|------------|-----|-----|
| `sm` | 640px | Layout de coluna única → dupla |
| `md` | 768px | Ativa colunas de tabela extras |
| `lg` | 1024px | Layout completo de 3 colunas |
| `xl` | 1280px | Max container |

---

## Iconografia

### Regra

**Todos os ícones são exclusivamente outline** (sem preenchimento):

- Fonte: `lucide-react`
- `strokeWidth={1.5}` como padrão
- Tamanho: `w-4 h-4` (16px) para inline, `w-5 h-5` (20px) para botões, `w-6 h-6` (24px) para cards

### Ícones por Seção (Publicações)

| Seção | Ícone | Classe |
|-------|-------|--------|
| Publicações Científicas | `BookOpen` | strokeWidth 1.5 |
| Livros & Capítulos | `BookMarked` | strokeWidth 1.5 |
| Prêmios | `Award` | strokeWidth 1.5 |
| Na Mídia | `Mic` | strokeWidth 1.5 |
| Atividades Acadêmicas | `GraduationCap` | strokeWidth 1.5 |
| Artigos de Opinião | `Newspaper` | strokeWidth 1.5 |

---

## Animações

### Biblioteca: Framer Motion

#### Padrões de Entrada (scroll-triggered)

```jsx
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.5, ease: "easeOut" }}
```

#### Stagger de Cards

```jsx
transition={{ duration: 0.3, delay: i * 0.05 }}
```

#### Tab Content Switch

```jsx
initial={{ opacity: 0, y: 8 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -8 }}
transition={{ duration: 0.25 }}
```

#### Fade do Hero (badge e heading)

- Badge: `delay: 0.2`, `duration: 0.6`
- H1: `delay: 0.35`, `duration: 0.7`
- H2 tagline: `delay: 0.5`, `duration: 0.6`

---

## Componentes — Padrões de Design

### Cards

```
bg-card
border border-border
rounded-xl p-5
hover:border-foreground/15 transition-colors
```

### Tabelas

```
overflow-x-auto rounded-xl border border-border
thead: bg-card/50, th font-mono text-[11px] uppercase tracking-wide text-foreground/40
tbody: hover:bg-card/40 transition-colors
```

### Buttons — Primário

```
bg-primary text-primary-foreground
rounded-xl px-6 py-3 font-medium
hover:bg-primary/90 transition-colors
```

### Buttons — Ghost/Tab

```
border border-transparent text-foreground/45
hover:text-foreground/80 hover:bg-foreground/[0.04]
active: bg-foreground/8 border-foreground/15 text-foreground
```

### Eyebrow Labels

```
font-pixel
text-[11px] uppercase tracking-[0.2em]
text-primary
```

---

## Hero Section

### Estrutura de Camadas (z-index)

```
z-0  → EffectScene (ASCII WebGL shader, position: absolute, inset 0)
z-1  → Dark gradient overlay (from-black/60 via-black/40 to-black/70)
z-2  → Bottom fade gradient (transparent → hsl(--background), h-64)
z-10 → Conteúdo (badge + H1 + H2 + CTAs)
```

### ASCII Shader (EffectScene)

- Engine: Three.js + React Three Fiber
- Efeito: converte textura (foto do Prof. Guedes) em grid de caracteres ASCII
- Parâmetros: `cellSize={7}`, `colorPalette={0}`, `mouseGlow={true}`
- Background fixo: `hsl(240 6% 4%)` (não usa `--background` do tema)

### Hero H1

```jsx
style={{ fontSize: "clamp(52px, 10vw, 120px)" }}
className="font-sans font-bold tracking-tight text-white leading-none"
```

- **Máximo absoluto: 120px** em qualquer viewport
- Responsivo via `clamp`: 52px (mobile) → 120px (desktop ≥ 1200px)

---

## Navegação

### Nav Desktop

```
Logo (GUEDES.AI, font-bold text-[15px])
Links (text-[13px], 6 itens)
Separador
Botão idioma (PT/EN/ES, font-pixel)
Toggle tema (sol/lua icon)
CTA "Agendar Palestra" (primary button, rounded-xl)
```

### Ciclo de Idioma

PT → EN → ES → PT  
Persiste em `localStorage["lang"]`

---

## Dark/Light Mode

- Provider: `next-themes` com `ThemeProvider`
- Default: `dark`
- Classe aplicada no `<html>`: `.dark`
- Dot grid no `body::before`: adaptativo (branco em dark, preto em light, opacidade baixa)

---

## Acessibilidade

- Todos os botões de navegação têm foco visível
- Tabelas com `<thead>` e `<tbody>` semânticos
- Links externos têm `target="_blank" rel="noopener noreferrer"`
- Animações respeitam `viewport={{ once: true }}` (sem looping infinito em scroll)
- Fonte mínima de `11px` apenas em labels auxiliares

---

## Performance

- Fontes com `font-display: swap` (sem FOUT bloqueante)
- Imagens de hero renderizadas via WebGL (sem `<img>` pesado)
- `viewport={{ once: true }}` em todas as animações (sem re-trigger)
- Assets Vercel com `Cache-Control: max-age=31536000, immutable`
- Sem analytics, sem scripts de terceiros no critical path
