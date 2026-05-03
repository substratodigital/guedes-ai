# GUEDES.AI — Tech Spec

> Site de marca pessoal do Prof. Dr. Luís Fernando Ascenção Guedes.  
> SPA estático (React + Vite) sem backend. Deploy-ready para Vercel.

---

## Ambiente e Tooling

| Item | Versão / Valor |
|------|----------------|
| Node.js | 24 |
| Package manager | pnpm (workspace monorepo) |
| TypeScript | 5.9 |
| Vite | 7.x |
| React | 19.x |

### Monorepo

O projeto vive em `artifacts/guedes-ai` dentro de um pnpm workspace.

```
workspace/
├── artifacts/
│   └── guedes-ai/          ← este app
├── lib/                    ← libs compartilhadas
├── scripts/
└── pnpm-workspace.yaml
```

---

## Stack Completa

### Framework & Build

| Pacote | Versão | Uso |
|--------|--------|-----|
| `vite` | 7.x | Build tool e dev server |
| `@vitejs/plugin-react` | catalog | Fast Refresh + JSX |
| `@tailwindcss/vite` | catalog | Tailwind CSS v4 via Vite plugin |
| `typescript` | 5.9 | Tipagem estática |

### UI & Componentes

| Pacote | Versão | Uso |
|--------|--------|-----|
| `react` / `react-dom` | 19.x | Framework de UI |
| `lucide-react` | catalog | Ícones SVG outline (stroke-only) |
| `framer-motion` | catalog | Animações declarativas (scroll, enter, exit) |
| `wouter` | ^3.3.5 | Roteamento leve (hash routing) |
| `next-themes` | ^0.4.6 | Dark/light mode com `ThemeProvider` |
| `clsx` + `tailwind-merge` | catalog | Composição de classes Tailwind |
| `class-variance-authority` | catalog | Variantes tipadas de componentes |

### Radix UI Primitives (acessibilidade)

Todos os primitivos Radix estão instalados para uso com shadcn/ui patterns:
`accordion`, `alert-dialog`, `dialog`, `dropdown-menu`, `label`, `select`,
`separator`, `slot`, `switch`, `tabs`, `toast`, `tooltip`, etc.

### 3D / WebGL

| Pacote | Versão | Uso |
|--------|--------|-----|
| `three` | ^0.184.0 | Engine WebGL (canvas ASCII shader no Hero) |
| `@react-three/fiber` | ^9.6.1 | React renderer para Three.js |
| `@react-three/drei` | ^10.7.7 | Helpers Three.js (câmera, stats, etc.) |
| `@react-three/postprocessing` | ^3.0.4 | Efeitos de pós-processamento |
| `postprocessing` | ^6.39.1 | Biblioteca base de pós-processamento |

O efeito ASCII do Hero é um shader GLSL customizado que converte a textura da
câmera em caracteres ASCII em tempo real via WebGL.

### Forms & Validação

| Pacote | Versão | Uso |
|--------|--------|-----|
| `react-hook-form` | ^7.55.0 | Gerenciamento de formulários |
| `@hookform/resolvers` | ^3.10.0 | Integração com Zod |
| `zod` | catalog | Validação de schema do formulário de contato |

### Tipografia — Geist Font Family

| Variante | Arquivo | Peso | Uso |
|----------|---------|------|-----|
| **Geist Sans** | `GeistSans-Variable.woff2` | 100–900 (variável) | Corpo, headings, UI geral |
| **Geist Mono** | `GeistMono-Variable.woff2` | 100–900 (variável) | Datas, números, labels monospace |
| **Geist Pixel** | `GeistPixel.woff2` | 400 | Labels de seção, badges, eyebrow text |

Fontes servidas localmente via `public/fonts/`. Declaradas em `src/index.css`
com `@font-face` e `font-display: swap`. Mapeadas via Tailwind:

```css
--font-sans: 'Geist', sans-serif;      → classe `font-sans`
--font-mono: 'GeistMono', monospace;   → classe `font-mono`
--font-pixel: 'GeistPixel', monospace; → classe `font-pixel`
```

---

## Internacionalização (i18n)

Implementação custom sem biblioteca externa:

- **`src/context/LanguageContext.tsx`** — React Context com `useLanguage()` hook
- **`src/i18n/translations.ts`** — objeto `as const` com todos os textos em PT / EN / ES
- Persistência via `localStorage` (`key: "lang"`)
- Ciclo: PT → EN → ES → PT (botão na Nav)
- Todos os 12 componentes consomem `useLanguage()`

---

## Estrutura de Arquivos

```
src/
├── components/
│   ├── Bio.tsx             ← Trajetória pessoal
│   ├── Clientes.tsx        ← Logos de clientes (marquee)
│   ├── Contato.tsx         ← Formulário de contato (React Hook Form)
│   ├── Depoimentos.tsx     ← Depoimentos em cards
│   ├── EffectScene.tsx     ← ASCII shader WebGL (Three.js / R3F)
│   ├── Footer.tsx          ← Rodapé
│   ├── Nav.tsx             ← Navegação + tema + idioma
│   ├── Newsletter.tsx      ← CTA newsletter LinkedIn
│   ├── Palestras.tsx       ← Cards de temas de palestra
│   ├── Publicacoes.tsx     ← Seção "Trabalho de Inspirar Mudança" (6 abas)
│   ├── Solucoes.tsx        ← Grid de soluções oferecidas
│   ├── Trajetoria.tsx      ← Timeline de trajetória acadêmica
│   └── WhatsAppButton.tsx  ← Botão flutuante WhatsApp
├── context/
│   └── LanguageContext.tsx
├── i18n/
│   └── translations.ts
├── pages/
│   └── Home.tsx
├── App.tsx
├── main.tsx
└── index.css               ← Tailwind v4 + @font-face + CSS vars
```

---

## CSS e Design System

### Tailwind v4

Usa `@theme inline` para mapear CSS custom properties ao sistema de design:

```css
@import "tailwindcss";
@import "tw-animate-css";
@plugin "@tailwindcss/typography";
```

### Variáveis de Cor (HSL)

| Token | Dark | Light |
|-------|------|-------|
| `--background` | `240 6% 4%` | `0 0% 99%` |
| `--foreground` | `240 5% 96%` | `240 10% 8%` |
| `--primary` | `239 84% 67%` | `239 84% 60%` |
| `--muted` | `240 5% 12%` | `240 5% 94%` |
| `--card` | `240 5% 8%` | `0 0% 97%` |
| `--border` | `240 6% 11%` | `240 6% 90%` |

### Utilitários Customizados

- `.gradient-text` — gradiente preto→branco no texto (adaptativo ao tema)
- `.gradient-text-accent` — gradiente índigo (`#4F46E5 → #818CF8`)
- `.font-pixel` — aplica Geist Pixel
- `.animate-marquee` — animação de marquee 30s para logos de clientes
- `.orb-*` — orbs de fundo com blur desfocado (decoração sutil)

---

## Comandos

```bash
# Desenvolvimento
pnpm --filter @workspace/guedes-ai run dev

# Build de produção
pnpm --filter @workspace/guedes-ai run build

# Typecheck
pnpm --filter @workspace/guedes-ai run typecheck
```

---

## Deploy — Vercel

Ver `vercel.json` na raiz do artifact (`artifacts/guedes-ai/vercel.json`).

**Configurações no painel Vercel:**

| Campo | Valor |
|-------|-------|
| Root Directory | `artifacts/guedes-ai` |
| Install Command | `cd ../.. && pnpm install --frozen-lockfile` |
| Build Command | `cd ../.. && pnpm --filter @workspace/guedes-ai run build` |
| Output Directory | `dist/public` |
| Framework | Other |

**Variáveis de ambiente no Vercel:**

| Variável | Valor |
|----------|-------|
| `BASE_PATH` | `/` |
| `NODE_ENV` | `production` |
