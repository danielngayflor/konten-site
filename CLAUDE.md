# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server (port 5173)
npm run build    # Type-check (tsc -b) then production build to dist/
npm run lint     # ESLint over the project
npm run preview  # Preview the built dist/ locally
```

There are no tests configured. Production build runs TypeScript project references first — a `tsc -b` failure stops the build.

## Source of truth

`~/MEGA/Konten LR /Konten_Claude_Code_Brief.md` is the 2026 rebrand brief — authoritative for palette, typography, copy, and route names.
`~/MEGA/Konten LR /Konten_Website_Copy_v2.md` is the approved copy v2.0.
`~/MEGA/Konten LR /invideo.io-DESIGN for use by Konten.md` is design inspiration (InVideo aesthetic); the Claude Code Brief overrides it where they conflict.

## Tailwind v4 setup — DO NOT add config files

Uses **Tailwind v4 via the Vite plugin** (`@tailwindcss/vite`):

- **No `tailwind.config.ts` / `tailwind.config.js`** — design tokens live in `src/index.css` inside `@theme {}`.
- **No `postcss.config.js`** — Vite plugin handles PostCSS.
- CSS entrypoint uses `@import "tailwindcss";` (not v3 directives).
- Custom utilities defined with v4's `@utility name { ... }` syntax in `src/index.css`.

### Dark-first palette (2026 rebrand)
| Token | Hex | Use |
|---|---|---|
| `konten-blue` | `#00249C` | The one brand blue — used everywhere |
| `konten-cream` | `#FDFBD4` | Rare warm accent on dark |
| `konten-black` | `#0A0A0A` | Base page bg |
| `charcoal` | `#141414` | Alternating section bg |
| `dark-gray` | `#1C1C1C` | Card/container bg |
| `border-gray` | `#2A2A2A` | Borders, dividers |
| `mid-gray` | `#A6A6A6` | Secondary text on dark |

### Typography
- `font-display` → `'New Spirit', Georgia, serif` — one big display line per section
- `font-spartan` → `'League Spartan', sans-serif` — headings, logo, key brand moments
- `font-body` / `font-inter` → `'Anton', sans-serif` — body text, UI, captions (Anton is bold/condensed; use line-height 1.55+)

New Spirit requires purchase from Monotype — Georgia is the fallback until it's hosted.

## Architecture

### Page composition pattern

Each route in `src/pages/*.tsx` composes section components from `src/components/sections/<page>/`. Sections render as full-bleed blocks — the alternating background colors ARE the section transitions. `<Nav>`, `<Closer>`, and `<LegalFooter>` mount once in `App.tsx`.

```
App.tsx (Router + Nav + routes + Closer + LegalFooter)
├── pages/Home.tsx
├── pages/About.tsx
├── pages/Services.tsx → sections/services/ServiceSpread.tsx
├── pages/Work.tsx → sections/work/WorkGallery.tsx (filter pills + polaroid grid)
├── pages/WorkDetail.tsx (slug lookup from workPlaceholders)
├── pages/Resources.tsx → sections/resources/ResourceGrid.tsx
└── pages/ResourceDetail.tsx (slug lookup from resources; renders DownloadGate for gated downloads)
```

`<Closer>` is suppressed on `/services`.

### Data-driven content

- `data/services.ts` — 6 services with `iconSlug` and `sectionBg` ('cream' | 'black'). The `collageElements` field exists on the type but is no longer rendered.
- `data/workPlaceholders.ts` — Work index + detail pages. `WorkProject` supports `heroVideo` (Mega.nz embed), `siteUrl` (iframe embed), `siteScreenshotUrl` (fallback image when site blocks iframes), `iconSlug`.
- `data/resources.ts` — `/freebies` page. `Resource` body is an array of typed blocks: `paragraph | heading | list | callout | image`. Optional `downloadFile` field triggers an email-gated download (`DownloadGate` component in `ResourceDetail.tsx`).
- `data/values.ts`, `data/team.ts` — About page.

### Form / email system

All forms POST to `/api/submit-form` (a Vercel serverless function in `api/submit-form.js`) which sends email via Nodemailer SMTP. The client wrapper is `src/lib/supabase.ts` — despite the filename it no longer uses Supabase at all, just a `fetch` wrapper. Four form types: `contact`, `discovery`, `download`, `newsletter`.

Required Vercel env vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`.

**Local dev caveat**: `npm run dev` does not serve `/api/*` routes. Use `vercel dev` to test forms locally.

### Hero section

`sections/home/Hero.tsx` renders a vertical stack (headline → orbit → subtitle → CTAs) on `bg-konten-black`. The carousel is `sections/home/HeroOrbit.jsx` — a plain JSX file (not TypeScript), self-contained RAF loop driving 8 project images in a circular orbit. Tune at the top of `HeroOrbit.jsx`: `CARD_SIZE`, `RADIUS`, `LOOP_MS`.

### Section background system

Dark-first: sections alternate `bg-konten-black` (#0A0A0A) and `bg-charcoal` (#141414). `bg-konten-blue` is used only for the footer. Cards use `bg-dark-gray` (#1C1C1C). Do not use `bg-konten-cream` on any section background.

### Routes
- `/` → Home
- `/our-story` → About page
- `/for-you` → Services/For You page  
- `/stories-weve-told` → Work gallery
- `/freebies` → Resources

### Sticker system

PNG stickers in `public/stickers/` render via `CollageElement` with a `src` prop. It injects a unique `GrainFilter` SVG (soft-light texture via `useId()`), renders at 55% size on mobile, and applies `whileHover`/`whileTap` spring animations. `Closer.tsx` has its own inline grain filter for the footer logo sticker.

### UI primitives

- **`CollageElement`** — floating stickers/illustrations in hero sections.
- **`Polaroid`** — always pair with a `<FilmMetadata>` strip above it.
- **`Clapperboard`** — inline 🎬 SVG motif; sizes 11–20px, used next to eyebrows and as bullet markers.
- **`ServiceIcon`** — 1 of 6 SVG service icons by slug.
- **`SectionTransition`** and **`ScrollReveal`** — built but not yet placed in sections.

### lucide-react quirk (v1.14)

Brand icons (Instagram, LinkedIn, TikTok, Facebook) are **not exported** from this version. Use inline SVG components (see `Closer.tsx`). Generic icons like `Menu` and `X` work fine.

## Styling conventions

- Headlines: `font-spartan font-black uppercase` at fluid `clamp(...)` sizes.
- Body/labels: `font-inter` (aliased to League Spartan — intentional).
- Eyebrows: `text-eyebrow` utility — uppercase, 500 weight, wide tracking, always paired with a small `<Clapperboard>`.
- Buttons are pill-shaped (`rounded-full`). Don't wrap `<PillButton>` in an `<a>` tag — it renders a `<button>` internally. For a linked pill, write inline `<a>` with equivalent classes.
- Two-column spreads: `lg:grid-cols-2` with `lg:[direction:rtl]` on parent + `lg:[direction:ltr]` on each child to flip sides without reordering DOM.

## Screenshot service for external sites

Sites that block iframe embedding use the WordPress mshots fallback:

```
https://s.wordpress.com/mshots/v1/{URL-encoded-site-url}?w=1200
```

Set on `siteScreenshotUrl`; `WorkDetail` renders a linked `<img>` instead of `<iframe>` when present.

## What's still not built

- **`<ScrollReveal>` placements** — component exists, not yet placed in sections.
- **`<SectionTransition>` placements** — per spec section 13.1.
- **Polish pass** — pulse animations on decorative clapperboards, mobile breakpoint pass.
