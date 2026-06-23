"use client";

import { Container } from "@/components/layout/Container";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { Reveal } from "@/components/shared/Reveal";
import { SUPPORTED_STATS } from "@/lib/data/content";

export function AccuracyBlock() {
  return (
    <section className="py-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-xl border border-border bg-surface p-10 shadow-soft sm:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--amber)]/10 blur-3xl" />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="flex flex-col gap-4">
              <span className="label text-amber">
                Accuracy you can interrogate
              </span>
              <h2 className="font-display text-h2 font-semibold">
                Calibrated confidence, never a black box
              </h2>
              <p className="max-w-md text-muted">
                Every prediction reports a confidence score, the top three candidates, and a
                per-region importance breakdown — so you can judge the verdict, not just trust it.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {SUPPORTED_STATS.map((s) => (
                <div key={s.label} className="rounded-lg border border-border bg-surface-2 p-6">
                  <p className="font-display text-4xl font-semibold text-gradient">
                    <AnimatedNumber value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-sm text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
