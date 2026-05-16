# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server (port 5173)
npm run build    # Type-check (tsc -b) then production build to dist/
npm run lint     # ESLint over the project
npm run preview  # Preview the built dist/ locally
```

There are no tests configured. Production build runs the TypeScript project references first — a `tsc -b` failure stops the build.

## Source of truth

`~/Downloads/KONTEN_BUILD_SPEC_v4.md` is the design and content brief that drives this site (Konten LR — a creative agency in Monrovia, Liberia). When asked to add or change pages/sections, copy, or visual rules, treat the spec as authoritative and prefer matching its section numbering (e.g. "section 8.3" = the Studio Statement on the home page).

## Tailwind v4 setup — DO NOT add config files

This project uses **Tailwind v4 via the Vite plugin** (`@tailwindcss/vite`). The setup is intentionally non-standard for v3 muscle memory:

- **No `tailwind.config.ts` / `tailwind.config.js`** — design tokens live in `src/index.css` inside the `@theme {}` block.
- **No `postcss.config.js`** — the Vite plugin handles PostCSS.
- The CSS entrypoint uses `@import "tailwindcss";` (NOT the v3 `@tailwind base/components/utilities` directives).
- Custom utilities (e.g. `font-anton`, `text-display-xl`, `text-eyebrow`) are defined with v4's `@utility name { ... }` syntax in `src/index.css`. To add a new utility, add it there — do not invent class names that aren't declared.
- Color tokens declared as `--color-konten-blue: #00249C` automatically become `bg-konten-blue` / `text-konten-blue` / `border-konten-blue` utilities (v4 behavior). The palette is exactly three colors: `konten-blue` (#00249C), `konten-cream` (#FDFBD4), `konten-black` (#0A0A0A).

A previous attempt mis-wired this (added a v3-style config), so the constraint above is load-bearing.

## Architecture

### Page composition pattern

Each route in `src/pages/*.tsx` is a thin shell that composes section components from `src/components/sections/<page>/`. Sections render as full-bleed `<section>` blocks with no padding between them — the alternating background colors (cream → black → cream → blue) ARE the section transitions. The global `<Nav>`, `<Closer>`, and `<LegalFooter>` are mounted once in `App.tsx` and render on every route.

```
App.tsx (Router + Nav + routes + Closer + LegalFooter)
├── pages/Home.tsx
├── pages/About.tsx
├── pages/Services.tsx → sections/services/ServiceSpread.tsx (driven by data/services.ts)
├── pages/Work.tsx → sections/work/WorkGallery.tsx (filter pills + polaroid grid)
├── pages/WorkDetail.tsx (slug lookup from workPlaceholders; renders hero, fact file, brief, gallery/platform, stats, CTA)
├── pages/Resources.tsx → sections/resources/ResourceGrid.tsx (driven by data/resources.ts)
└── pages/ResourceDetail.tsx (slug lookup from resources)
```

`<Closer>` is suppressed on `/services` (the Services page has its own bottom CTA).

### Data-driven content

- `data/services.ts` — 6 services. Each `Service` carries copy, an `iconSlug`, and a `sectionBg` ('cream' | 'black') that controls background alternation. The `collageElements` field still exists on the type but is no longer rendered by `ServiceSpread` — it was removed.
- `data/values.ts`, `data/team.ts` — feed the About page's value cards and team grid.
- `data/workPlaceholders.ts` — feeds both the Work index page gallery and the `/work/:slug` detail page (looked up by `slug`). The `WorkProject` type includes optional `siteUrl` (triggers "THE PLATFORM." section with iframe/screenshot embed), `siteScreenshotUrl` (static fallback image when a site blocks iframes via `X-Frame-Options`), and `iconSlug` (explicit icon override on the gallery card — only shows icon treatment when this field is set).
- `data/resources.ts` — feeds the `/freebies` page and `/freebies/:slug` detail page. Each `Resource` has a `slug`, `type` ('article' | 'cheat-sheet' | 'white-paper'), and a `body` array of typed blocks (`paragraph`, `heading`, `list`, `callout`).

### Section background system

Every section is one of three "modes" (`cream`, `black`, `blue`) determined by props or data. Each mode dictates background color, body text color, and accent color (always blue on cream/black; always cream on blue). Don't introduce mid-tones or off-palette colors.

### Sticker system

PNG stickers live in `public/stickers/` and are rendered via `CollageElement` with a `src` prop. When `src` is provided the component switches to PNG mode: it injects a `GrainFilter` SVG (soft-light paper texture) and applies it via CSS `filter: url(#...) drop-shadow(...)`. Key behaviors:

- `hideBelow` defaults to `'never'` for stickers (visible on all screen sizes) and `'md'` for SVG illustrations.
- On mobile (`window.innerWidth < 768`) the sticker renders at 55% of the specified `size`.
- `whileHover` / `whileTap` spring animations are active on stickers for tactile feel.
- Each `CollageElement` generates its own unique grain filter ID via `useId()` — filters don't collide.

The `Closer.tsx` footer has its own inline grain filter and logo sticker (not via `CollageElement`) because it's a static, non-parallax placement.

Available stickers in `public/stickers/`: `always-on.png`, `b-roll.png`, `camera.png`, `clapperboard.png`, `cut.png`, `film-reel.png`, `logo.png`, `on-air.png`, `rec.png`, `slr-camera.png`, `studio-mic.png`, `take-01.png`, `tell-your-story.png`.

### Client logos

`public/logos/` contains seven client logo JPGs (`undp.jpg`, `gfc.jpg`, `ags.jpg`, `sos.jpg`, `embassy.jpg`, `sappimah.jpg`, `yocel.jpg`) rendered in a marquee via `components/sections/home/ClientLogos.tsx`.

### UI primitives

`src/components/ui/` holds small reusable pieces:

- **`CollageElement`** — floating decorative elements (PNG stickers or SVG illustrations) in hero sections. Takes `type`, `src`, `position`, `rotation`, `parallaxStrength`, `scale`, `size`, `anim`, `delay`, `hideBelow`.
- **`Polaroid`** — white-framed photo container. Always pair with a `<FilmMetadata>` strip *above* it. This metadata + polaroid combo is the recurring editorial motif.
- **`Clapperboard`** — recurring 🎬 inline SVG motif. Used next to eyebrows, as bullet markers, in card corners. Sizes 12–20px.
- **`SectionTransition`** — scroll-driven icon that scales 0.4 → 4 → 0.4 across a section boundary. Built but not yet placed — see spec section 13.1 for the per-page mapping.
- **`ServiceIcon`** — renders 1 of 6 line-style SVG service icons by slug. Used at 280px in service headers, smaller inline.
- **`ScrollReveal`** — built but not yet placed in sections.

### lucide-react quirk (v1.14)

`lucide-react` is pinned at `^1.14.0`. **Brand icons (Instagram, Linkedin, TikTok, Twitter, Facebook) are NOT exported.** Write inline SVG components instead (see `Closer.tsx`). Generic glyphs like `Menu` and `X` work fine.

## Styling conventions

- Hero/headline type uses **League Spartan** (mapped to `font-spartan`, weight 900, all caps) at fluid `clamp(...)` sizes. Use `text-display-lg` / `text-display-xl` utilities or write `text-[clamp(...)]` inline.
- Body type is also League Spartan (mapped to `font-inter` for historic reasons — the CSS variable alias is intentional). Eyebrows are `text-eyebrow` (uppercase 500 weight, wide tracking) — usually paired with a small Clapperboard.
- Two-column "spreads" use `lg:grid-cols-2` with `lg:[direction:rtl]` on the parent + `lg:[direction:ltr]` on each child to flip text/collage sides without reordering DOM. See `ServiceSpread` and `ProjectSpread`.
- Buttons are pill-shaped (`rounded-full`). Use `<PillButton>` and pass `variant` (outline/filled) and `tone` (dark/light). **Do not wrap `<PillButton>` in an `<a>` tag** — it renders a `<button>` internally, which makes nesting invalid. For a link that looks like a pill button, write a plain `<a>` with equivalent classes instead.

## What's not built yet (per spec section 15)

- **Step 10 — Supabase wiring**: `lib/supabase.ts`, env vars, `contact_submissions` and `discovery_requests` tables, Edge Function for Resend email. The two forms (`sections/home/ContactForm.tsx` and `sections/services/DiscoveryForm.tsx`) currently `console.log` and show a toast.
- **Step 11 — Form submissions** end-to-end.
- **Step 12 — Polish pass**: `<ScrollReveal>` placements, `<SectionTransition>` placements per spec section 13.1, pulse animations on decorative clapperboards, mobile breakpoint pass.

When picking up work, check the build order in spec section 15 to see what stage the project is at.

## Screenshot service for external sites

Sites that block iframe embedding via `X-Frame-Options: SAMEORIGIN` (e.g. `ardliberia.org`) use the WordPress mshots service as a static screenshot fallback:

```
https://s.wordpress.com/mshots/v1/{URL-encoded-site-url}?w=1200
```

Set this on the project's `siteScreenshotUrl` field. The `WorkDetail` platform section automatically uses a `<img>` (linked to the live URL) instead of an `<iframe>` when this field is present.
