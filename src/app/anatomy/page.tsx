"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { HorseRegionDiagram } from "@/components/shared/HorseRegionDiagram";
import type { BodyRegion } from "@/lib/data/breeds.types";
import { REGION_LABELS, REGION_ORDER } from "@/lib/data/regions";

const ANATOMY: Record<BodyRegion, { title: string; body: string; cue: string }> = {
  head: {
    title: "Head & muzzle",
    body: "Profile shape — straight, convex (Roman) or concave (dished) — is one of the most breed-defining traits. The Arabian's dished face is a classic example.",
    cue: "Look for: forehead width, jaw depth, muzzle fineness.",
  },
  eyes: {
    title: "Eyes",
    body: "Set on the side of the head for near-360° vision. Size, placement and surrounding markings (like the Appaloosa's white sclera) help tell breeds apart.",
    cue: "Look for: eye size, expression, white sclera, mottling.",
  },
  neck: {
    title: "Neck & crest",
    body: "Length and how the neck ties into the shoulder shape both movement and silhouette. Baroque breeds show a high, arched, crested neck.",
    cue: "Look for: arch, crest, length, set onto the shoulder.",
  },
  chest: {
    title: "Chest & shoulder",
    body: "Depth of the chest and angle of the shoulder relate to stride length, lung capacity and pulling power.",
    cue: "Look for: depth, breadth, shoulder slope.",
  },
  body: {
    title: "Barrel & back",
    body: "The barrel houses the ribcage; back length and topline affect carrying ability and gait. Coat colour and pattern are read here too.",
    cue: "Look for: rib spring, back length, coat pattern.",
  },
  legs: {
    title: "Legs & hooves",
    body: "Bone density, cannon length and feathering separate refined hotbloods from heavy draughts. Striped hooves are an Appaloosa trait.",
    cue: "Look for: bone, feather, hoof shape and markings.",
  },
  tail: {
    title: "Tail",
    body: "Set and carriage are breed cues — Arabians carry a high 'flag', while draughts often have a lower-set, fuller dock.",
    cue: "Look for: set height, carriage, thickness.",
  },
};

export default function AnatomyPage() {
  const [region, setRegion] = useState<BodyRegion>("head");

  return (
    <Container className="py-14">
      <div className="mb-8 flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">Learn</span>
        <h1 className="font-display text-h1 font-semibold">Horse anatomy</h1>
        <p className="max-w-xl text-muted">
          The same body regions our AI scans. Hover or tap a point to learn what each tells you — a
          handy primer for beginners.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card className="grid place-items-center">
          <div className="aspect-[5/4] w-full max-w-lg">
            <HorseRegionDiagram
              importance={Object.fromEntries(REGION_ORDER.map((r) => [r, 50])) as Record<BodyRegion, number>}
              activeRegion={region}
              onHover={(r) => r && setRegion(r)}
              heat={false}
            />
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {REGION_ORDER.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  region === r
                    ? "border-amber bg-[var(--amber)]/12 text-amber"
                    : "border-border text-muted hover:text-text"
                }`}
              >
                {REGION_LABELS[r]}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={region}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="flex flex-col gap-3">
                <h2 className="font-display text-xl font-semibold">{ANATOMY[region].title}</h2>
                <p className="text-sm leading-relaxed text-muted">{ANATOMY[region].body}</p>
                <p className="rounded-md bg-surface-2 px-3 py-2 text-xs text-amber">
                  {ANATOMY[region].cue}
                </p>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
}
