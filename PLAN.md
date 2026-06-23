# HorseVision — Product & Architecture Plan

AI that identifies horse breeds from a photo, then explains *why*. A premium,
dark-by-default, mobile-first consumer product. This document is the source of
truth for the build; code follows the decisions made here.

---

## 1. Product pillars

1. **Cinematic, not generic.** The journey from upload → prediction is the product.
   No spinners. A staged, animated "AI is looking at your horse" sequence.
2. **Explainable.** Every prediction shows a body heatmap and per-region importance.
3. **Deep, browsable knowledge.** A real breed encyclopedia (explorer, detail pages,
   compare, anatomy, world map) so the app has value beyond a single upload.
4. **Provider-agnostic AI.** A clean `AIProvider` interface. Ships with a `mock`
   provider; OpenAI / Gemini / Claude / ONNX drop in with no UI changes.

---

## 2. Sitemap

```
/                       Landing (hero, features, how-it-works, breeds, accuracy, FAQ)
/analyze                Upload + cinematic analysis + result (single-page state machine)
/breeds                 Breed Explorer (search, filters, grid)
/breeds/[slug]          Breed Detail (gallery, history, traits, map, related)
/compare                Compare two breeds side by side
/anatomy                Interactive horse anatomy diagram
/map                    Interactive world map of breed origins
/favorites              Saved breeds (localStorage)
/about                  Story, model accuracy, roadmap
  (admin/*)             Optional future: analytics, uploads, model versions
```

Global overlays available on every route: **Command palette / search** (⌘K),
**Share sheet**, **Sound toggle**, **Theme toggle**.

---

## 3. Core user flow (the hero loop)

```
Landing ──tap "Identify a horse"──▶ /analyze (idle)
   /analyze idle ──drop / click / paste / camera──▶ preview
   preview ──confirm──▶ ANALYZING (staged sequence, ~6s)
   ANALYZING ──complete──▶ RESULT
   RESULT ──▶ share card · explore breed · try another · compare
```

`/analyze` is a **state machine**: `idle → preview → analyzing → result → error`.
State lives in a `useAnalysis` hook; the AI call goes through `analyzeImage()` in
the service layer so the UI never knows which provider answered.

---

## 4. Analysis sequence (the centerpiece)

18 steps, weighted durations, driven by a single `ANALYSIS_STEPS` config so timing,
copy, and the active body-region highlight stay in sync:

```
Uploading · Preparing Image · Detecting Horse · Removing Background ·
Finding Body Landmarks · Scanning Head · Scanning Eyes · Scanning Neck ·
Scanning Chest · Scanning Legs · Scanning Tail · Analyzing Coat Pattern ·
Measuring Body Ratios · Comparing Against Breed Database ·
Ranking Possible Breeds · Calculating Confidence · Preparing Report · Done
```

Visual layers over the uploaded image:
- animated **scan line** sweeping top→bottom,
- **feature landmark points** that pop in on the relevant step,
- a soft **heatmap** that fades in during coat/ratio steps,
- a **progress rail** with smoothly interpolated % and the current step label.

All of it respects `prefers-reduced-motion` (collapses to a calm fade + bar).

---

## 5. Design system

### Color (dark, warm — never pure black)
Tokens are CSS variables in `globals.css`, surfaced to Tailwind via `theme.extend`.

| Token        | Value                | Use                              |
|--------------|----------------------|----------------------------------|
| `--bg`       | `#100C0A` (warm ink) | app background                   |
| `--surface`  | `#1A1411`            | cards                            |
| `--surface-2`| `#241B16`            | raised cards / inputs            |
| `--border`   | `#3A2C23`            | hairlines                        |
| `--text`     | `#F5EDE6`            | primary text                     |
| `--muted`    | `#B7A697`            | secondary text                   |
| `--amber`    | `#E9A23B`            | primary accent (saddle amber)    |
| `--ember`    | `#D9622B`            | secondary accent / gradients     |
| `--sage`     | `#9CB380`            | success / positive confidence    |
| `--ring`     | `#E9A23B66`          | focus ring                       |

Signature gradient: `--ember → --amber` (135°). Light mode is supported via a
`.light` class override but dark is the default.

### Typography
- Display / headings: **Clash-style geometric** → using `Sora` (variable) as the
  premium, ownable display face.
- Body / UI: **Inter** (variable).
- Numerals in confidence/ratios: tabular figures.

Scale (clamp-based, fluid):
`display 3.2–5rem · h1 2.2–3rem · h2 1.6–2rem · h3 1.25rem · body 1rem · small .875 · mono-num`.

### Spacing / radius / shadow
8pt grid. Radii: `sm 10 · md 16 · lg 24 · pill 999`. Shadows are soft, warm-tinted,
low-opacity (no harsh black). Glass surfaces use `backdrop-blur` + 1px inner border.

### Motion system (Framer Motion)
Central `lib/motion.ts` exports reusable variants + a shared spring:
- `spring = { type: "spring", stiffness: 320, damping: 30 }`
- `fadeUp`, `stagger`, `scaleIn`, `revealOnScroll` (whileInView, `once: true`).
- Number counters via `useCountUp`. Hover lifts are 2–4px + subtle scale 1.02.
- Everything gated by a `useReducedMotion` check.

---

## 6. Component hierarchy

```
app/
  layout.tsx                 fonts, theme, providers, command palette mount
  page.tsx                   Landing
  analyze/page.tsx           Hero loop state machine
  breeds/page.tsx            Explorer
  breeds/[slug]/page.tsx     Detail
  compare/page.tsx · anatomy/page.tsx · map/page.tsx · favorites/page.tsx · about/page.tsx

components/
  ui/        Button Badge Card ProgressBar ConfidenceBar Tag Skeleton Tooltip Modal
  layout/    Navbar Footer Container ThemeToggle SoundToggle CommandPalette
  landing/   Hero HorseSilhouette ParticleField FeatureGrid HowItWorks
             SupportedBreeds AccuracyBlock Testimonials Faq Cta
  analyze/   Dropzone ImagePreview AnalysisStage ScanOverlay StepTimeline
             HeatmapLayer LandmarkPoints
  result/    ResultHero BreedVerdict TopMatches BreedOverview ExplainableAI
             SimilarBreeds ShareCard
  breed/     BreedCard BreedFilters BreedGallery OriginMap TraitMeter Timeline
  shared/    SectionHeading AnimatedNumber Reveal Marquee EmptyState
```

```
lib/
  ai/        types.ts · index.ts (analyzeImage) · providers/mock.ts · providers/openai.ts(stub)
  data/      breeds.ts · breeds.types.ts · analysis-steps.ts · testimonials.ts · faqs.ts
  hooks/     useAnalysis · useFavorites · useCountUp · useReducedMotionSafe · useCommandPalette
  motion.ts · utils.ts (cn, formatters) · share.ts (card export)
```

---

## 7. Data model (breed)

```ts
type Breed = {
  slug; name; origin: { country; countryCode; coords:[lat,lng] };
  type: "Warmblood"|"Coldblood"|"Pony"|"Draft"|"Hotblood"|"Gaited";
  heightHands:[min,max]; weightKg:[min,max]; lifespanYears:[min,max];
  colors:string[]; uses:string[]; temperament:string[];
  speed; endurance; strength; popularity;        // 0–100 for charts/compare
  history; funFacts:string[]; health:string[]; famous:string[];
  related:string[];                               // slugs
  // explainability defaults used when mock provider returns this breed
  regionImportance: { head; eyes; neck; chest; body; legs; tail }; // 0–100
};
```

Ship ~12 well-known breeds for a believable encyclopedia (Arabian, Thoroughbred,
Friesian, Andalusian, Akhal-Teke, Appaloosa, Clydesdale, Shire, Mustang,
Quarter Horse, Shetland Pony, Lipizzaner).

---

## 8. AI layer (provider-agnostic)

```ts
interface AIProvider { id; analyze(input: AnalyzeInput): Promise<AnalyzeResult>; }
analyzeImage(file, { onStep })  // picks provider from env, drives step callbacks
```

`AnalyzeResult` = `{ topMatches: {breed, confidence}[], regionImportance, notes }`.
Mock provider deterministically maps an image hash → a breed so demos feel "real"
and stable. Swapping to OpenAI Vision = implement one `analyze()` method.

---

## 9. Accessibility & performance

- Keyboard: full tab order, visible focus ring, ⌘K palette, ESC closes overlays.
- ARIA labels on icon buttons; `aria-live` on analysis status; alt text on images.
- `prefers-reduced-motion` honored everywhere; high-contrast via theme tokens.
- `next/image`, route-level code splitting, lazy/`whileInView` sections, font-display swap.
- Target Lighthouse ≥ 95 across the board.

---

## 10. Implementation roadmap

- **Phase 1 (this pass):** scaffold + design system + AI/data layer + landing +
  upload/analysis/result hero loop. ← shipping now
- **Phase 2:** Breed Explorer + detail pages + favorites + command search.
- **Phase 3:** Compare, anatomy, world map, share-card PNG export, sound pack.
- **Phase 4:** Real vision provider, plus future ML features (age, color, BCS, pose…).

---

## 11. Folder discipline

Reusable UI is dumb and prop-driven; data lives in `lib/data`; side-effects and
state live in `lib/hooks`; animations centralized in `lib/motion.ts`; the AI
boundary is the only place that knows about providers. No business logic in pages —
pages compose sections.
