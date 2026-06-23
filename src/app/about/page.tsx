import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { SUPPORTED_STATS } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "About & accuracy",
  description: "How HorseVision works, how accurate it is, and what's on the roadmap.",
};

const ROADMAP = [
  { phase: "Now", items: ["Breed identification", "Explainable heatmaps", "Breed encyclopedia"] },
  { phase: "Next", items: ["Coat colour recognition", "Age estimation", "Body condition score"] },
  { phase: "Later", items: ["Multiple-horse detection", "Pedigree suggestions", "Stable dashboard"] },
];

const PROVIDERS = ["OpenAI Vision", "Gemini Vision", "Claude Vision", "PyTorch", "TensorFlow", "ONNX", "HuggingFace"];

export default function AboutPage() {
  return (
    <Container className="flex flex-col gap-16 py-14">
      <header className="flex max-w-2xl flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">About</span>
        <h1 className="font-display text-h1 font-semibold">Breed identification you can interrogate</h1>
        <p className="text-lg text-muted">
          HorseVision pairs computer vision with a transparent, region-by-region explanation. We
          believe a useful prediction is one you can question — so every verdict shows its work.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {SUPPORTED_STATS.map((s) => (
          <Card key={s.label} className="flex flex-col gap-1.5">
            <p className="font-display text-4xl font-semibold text-gradient">
              <AnimatedNumber value={s.value} suffix={s.suffix} />
            </p>
            <p className="text-sm text-muted">{s.label}</p>
          </Card>
        ))}
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-display text-h2 font-semibold">Roadmap</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {ROADMAP.map((r) => (
            <Card key={r.phase} className="flex flex-col gap-3">
              <span className="w-fit rounded-full bg-[var(--amber)]/12 px-3 py-1 text-xs font-medium text-amber">
                {r.phase}
              </span>
              <ul className="flex flex-col gap-2 text-sm text-muted">
                {r.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="text-amber">›</span>
                    {it}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-h2 font-semibold">Provider-agnostic by design</h2>
        <p className="max-w-2xl text-muted">
          The vision layer sits behind a single interface. This preview runs a deterministic mock
          model; any of these can be dropped in with no UI changes:
        </p>
        <div className="flex flex-wrap gap-2">
          {PROVIDERS.map((p) => (
            <span key={p} className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted">
              {p}
            </span>
          ))}
        </div>
      </section>
    </Container>
  );
}
