# 🐴 HorseVision

AI that identifies horse breeds from a photo — and **explains why**. A premium,
dark-by-default, mobile-first product built with Next.js 15, TypeScript, Tailwind
and Framer Motion.

> This repository is **Phase 1**: the full design system, AI/data architecture,
> landing page, and the cinematic **upload → analysis → explained result** loop,
> plus a working breed encyclopedia (explorer, detail, compare, anatomy, world
> map, favorites). The AI runs on a deterministic **mock provider** so it works
> with zero setup; real vision models drop in behind one interface.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build (23 routes, 12 static breed pages)
npm run typecheck    # strict TS, no errors
npm start            # serve the production build
```

Requires Node 18.18+ (Node 22 recommended).

## What's inside

| Route            | What it is                                                        |
|------------------|-------------------------------------------------------------------|
| `/`              | Landing: animated hero, particles, features, how-it-works, breeds, accuracy, testimonials, FAQ |
| `/analyze`       | The hero loop — drag/drop/paste/camera upload → 17-stage cinematic analysis (scan lines, landmarks, heatmap) → explained result |
| `/breeds`        | Breed explorer with search, type filters and sorting              |
| `/breeds/[slug]` | Breed detail: history, timeline, traits, facts, health, related   |
| `/compare`       | Side-by-side breed comparison with animated trait bars            |
| `/anatomy`       | Interactive horse anatomy diagram                                 |
| `/map`           | World map of breed origins with animated pins                     |
| `/favorites`     | Saved breeds (localStorage)                                       |
| `/about`         | Accuracy, roadmap, provider-agnostic design                       |

Global: ⌘K command palette / search, theme toggle, sound toggle (off by default,
Web-Audio cues), reduced-motion support, skip-link, ARIA labelling.

## Architecture

```
src/
  app/                 routes (App Router) — pages only compose sections
  components/
    ui/                dumb, reusable primitives (Button, Badge, Card, ConfidenceBar)
    layout/            Navbar, Footer, SiteShell, CommandPalette, Providers (theme/sound)
    landing/           hero + marketing sections
    analyze/           Dropzone, ImagePreview, ScanOverlay, StepTimeline, AnalysisStage
    result/            ResultView, TopMatches, ExplainableAI, BreedOverview, SimilarBreeds, ShareActions
    breed/             BreedCard, TraitMeter, Timeline
    shared/            Reveal, AnimatedNumber, SectionHeading, HorseRegionDiagram
  lib/
    ai/                provider-agnostic AI boundary (types, index, providers/mock, providers/openai stub)
    data/              breeds dataset, analysis-steps, regions, marketing content
    hooks/             useAnalysis, useFavorites, useCountUp
    motion.ts          shared Framer Motion variants + spring
    utils.ts           cn, formatters, deterministic hash
    share.ts           canvas share-card PNG export
```

See **PLAN.md** for the full product plan: sitemap, user flow, component
hierarchy, color & type systems, animation system and roadmap.

## Swapping in a real AI provider

The UI never talks to a model directly — it calls `analyzeImage()` in
`src/lib/ai/index.ts`, which drives the staged animation and delegates to the
active `AIProvider`. To use OpenAI / Gemini / Claude Vision (or ONNX / PyTorch /
TF served behind an API):

1. Implement `analyze()` in a provider (see `src/lib/ai/providers/openai.ts`).
2. Register it in the `PROVIDERS` map in `index.ts`.
3. Set `NEXT_PUBLIC_AI_PROVIDER=openai` (see `.env.example`).

No component changes required.

## Design system

Dark, warm palette (never pure black) driven by CSS variables in
`globals.css`, surfaced to Tailwind. Display type **Sora**, UI type **Inter**
(loaded via `<link>` with a full system fallback so the app builds offline). All
motion is centralized in `lib/motion.ts` and respects `prefers-reduced-motion`.

## Deploy

Zero-config on **Vercel** — import the repo and deploy. `next build` is clean.

## Notes

- Breed content is editorial mock data — accurate enough to feel real, structured
  for cards, detail pages and compare.
- The mock provider maps each image to a stable breed via a hash, so demos are
  deterministic and repeatable.
