# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

---

## Artifacts

### GUEDES.AI (`artifacts/guedes-ai`)

Personal brand website for Prof. Dr. Luís Fernando Ascenção Guedes. Static SPA (no backend).

**Stack:**
- React 19 + Vite 7 + TypeScript 5.9
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Framer Motion (scroll animations)
- Three.js + React Three Fiber + R3F Drei (ASCII WebGL shader in Hero)
- Lucide React (outline-only icons, `strokeWidth={1.5}`)
- Wouter (hash routing, client-side SPA)
- next-themes (dark/light mode)
- React Hook Form + Zod (contact form)
- Custom i18n: PT / EN / ES via `LanguageContext` + `translations.ts`
- Geist font family: Sans (body/headings), Mono (dates/numbers), Pixel (eyebrow labels)

**Key files:**
- `src/index.css` — Tailwind v4 + @font-face + CSS custom properties (dark/light)
- `src/i18n/translations.ts` — all PT/EN/ES strings (as const)
- `src/context/LanguageContext.tsx` — language state + localStorage persistence
- `src/components/EffectScene.tsx` — ASCII WebGL shader (named export)
- `src/components/Publicacoes.tsx` — "Trabalho de Inspirar Mudança" (6 tabs)
- `public/fonts/` — Geist woff2 font files (served locally)
- `vercel.json` — Vercel deployment config (SPA rewrites, cache headers)
- `TECH_SPEC.md` — full technology specification
- `DESIGN_SPEC.md` — design system, colors, typography, animation patterns

**Dev command:** `pnpm --filter @workspace/guedes-ai run dev`

**Deploy (Vercel):**
- Root Directory: `artifacts/guedes-ai`
- Build Command: `cd ../.. && pnpm --filter @workspace/guedes-ai run build`
- Output Directory: `dist/public`
- Env vars: `BASE_PATH=/`, `NODE_ENV=production`

**Design decisions:**
- Hero "Luís Guedes" H1 locked at `clamp(52px, 10vw, 120px)` — max 120px
- Dark mode default (`hsl(240 6% 4%)` background)
- Geist Pixel used exclusively for section eyebrow labels (ALL CAPS, tracking-[0.2em])
- Geist Mono for all numeric/date data
- All icons outline-only (no fill), strokeWidth 1.5
- Bottom hero fade gradient (h-64) blends into next section
