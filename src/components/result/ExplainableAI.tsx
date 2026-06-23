"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { BodyRegion, RegionImportance } from "@/lib/data/breeds.types";
import { REGION_LABELS, REGION_ORDER } from "@/lib/data/regions";
import { HorseRegionDiagram } from "@/components/shared/HorseRegionDiagram";
import { Card } from "@/components/ui/Card";

interface ExplainableAIProps {
  importance: RegionImportance;
  notes: string[];
}

const WHY: Record<BodyRegion, string> = {
  head: "Profile shape, muzzle and forehead width are highly breed-distinctive.",
  eyes: "Eye placement, size and surrounding markings help separate look-alikes.",
  neck: "Neck length, crest and how it ties into the shoulder is a strong cue.",
  chest: "Chest depth and shoulder angle indicate build and breed group.",
  body: "Coat colour, pattern and barrel proportions narrow the candidates.",
  legs: "Bone, cannon length and any feathering distinguish draught from light breeds.",
  tail: "Tail set and carriage are characteristic of several breeds.",
};

export function ExplainableAI({ importance, notes }: ExplainableAIProps) {
  const [hover, setHover] = useState<BodyRegion | null>(null);

  const ranked = (Object.entries(importance) as [BodyRegion, number][]).sort(
    (a, b) => b[1] - a[1],
  );

  return (
    <section className="flex flex-col gap-6">
      <div>
        <span className="label text-amber">
          Explainable AI
        </span>
        <h2 className="mt-1 font-display text-h2 font-semibold">Why this verdict</h2>
        <p className="mt-1 max-w-xl text-muted">
          Hover a region to see how much it contributed. Warmer, larger blobs drove the prediction
          more strongly.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="grid place-items-center">
          <div className="aspect-[5/4] w-full max-w-md">
            <HorseRegionDiagram importance={importance} activeRegion={hover} onHover={setHover} />
          </div>
        </Card>

        <div className="flex flex-col gap-3">
          {ranked.map(([region, value], i) => (
            <motion.button
              key={region}
              onMouseEnter={() => setHover(region)}
              onMouseLeave={() => setHover(null)}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-lg border p-4 text-left transition-colors ${
                hover === region ? "border-amber bg-surface-2" : "border-border bg-surface"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{REGION_LABELS[region]}</span>
                <span className="tabular font-display text-lg font-semibold text-amber">
                  {value}%
                </span>
              </div>
              <div className="my-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                <motion.div
                  className="h-full rounded-full gradient-ember"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.05 }}
                />
              </div>
              <p className="text-xs leading-relaxed text-muted">{WHY[region]}</p>
            </motion.button>
          ))}
        </div>
      </div>

      <Card glass className="border-[var(--amber)]/30">
        <h3 className="mb-2 font-display font-semibold">Model reasoning</h3>
        <ul className="flex flex-col gap-1.5 text-sm text-muted">
          {notes.map((n) => (
            <li key={n} className="flex gap-2">
              <span className="text-amber">›</span>
              {n}
            </li>
          ))}
        </ul>
      </Card>

      {/* keep region order referenced for a11y/diagram parity */}
      <span className="sr-only">{REGION_ORDER.join(", ")}</span>
    </section>
  );
}
