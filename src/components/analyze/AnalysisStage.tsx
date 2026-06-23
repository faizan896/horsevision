"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { ANALYSIS_STEPS } from "@/lib/data/analysis-steps";
import type { BodyRegion } from "@/lib/data/breeds.types";
import type { AnalysisState } from "@/lib/hooks/useAnalysis";
import { ScanOverlay } from "./ScanOverlay";
import { StepTimeline } from "./StepTimeline";

export function AnalysisStage({ state }: { state: AnalysisState }) {
  const { imageUrl, progress, stepIndex, step } = state;

  const revealedRegions = useMemo(() => {
    const regions: BodyRegion[] = [];
    for (let i = 0; i <= stepIndex && i < ANALYSIS_STEPS.length; i += 1) {
      const r = ANALYSIS_STEPS[i].region;
      if (r && !regions.includes(r)) regions.push(r);
    }
    return regions;
  }, [stepIndex]);

  const pct = Math.round(progress * 100);

  return (
    <Container className="py-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          layout
          className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-black shadow-soft"
        >
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="Horse being analyzed" className="h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/20" />
          <ScanOverlay layer={step?.layer} activeRegion={step?.region} revealedRegions={revealedRegions} />

          {/* live status chip */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-lg glass border border-border px-4 py-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber" />
            </span>
            <span className="flex-1 text-sm font-medium">{step?.label ?? "Starting…"}</span>
            <span className="tabular font-display text-sm font-semibold text-amber">{pct}%</span>
          </div>
        </motion.div>

        <div className="flex flex-col gap-5">
          <div>
            <h2 className="font-display text-h2 font-semibold">Analyzing your horse</h2>
            <p className="mt-1 text-sm text-muted">
              Detecting conformation, coat and proportions, then matching against the breed database.
            </p>
          </div>

          {/* progress rail */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
            <motion.div
              className="h-full rounded-full gradient-ember"
              animate={{ width: `${pct}%` }}
              transition={{ ease: "linear", duration: 0.2 }}
            />
          </div>

          <div className="rounded-lg border border-border bg-surface p-4">
            <StepTimeline currentIndex={stepIndex} />
          </div>
        </div>
      </div>
    </Container>
  );
}
