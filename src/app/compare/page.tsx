"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getAllBreeds, getBreed } from "@/lib/data/breeds";
import type { Breed } from "@/lib/data/breeds.types";
import { formatHands, formatKg, formatYears } from "@/lib/utils";

function CompareInner() {
  const params = useSearchParams();
  const breeds = getAllBreeds();
  const [a, setA] = useState(params.get("a") ?? "arabian");
  const [b, setB] = useState(params.get("b") ?? "friesian");

  const ba = getBreed(a)!;
  const bb = getBreed(b)!;

  const metrics = useMemo(
    () =>
      [
        { key: "speed", label: "Speed" },
        { key: "endurance", label: "Endurance" },
        { key: "strength", label: "Strength" },
        { key: "trainability", label: "Trainability" },
        { key: "popularity", label: "Popularity" },
      ] as const,
    [],
  );

  return (
    <Container className="py-14">
      <div className="mb-8 flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">Compare</span>
        <h1 className="font-display text-h1 font-semibold">Breed vs breed</h1>
        <p className="text-muted">Put any two breeds side by side across the traits that matter.</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <Selector value={a} onChange={setA} breeds={breeds} accent={ba.accent} />
        <button
          onClick={() => {
            setA(b);
            setB(a);
          }}
          className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-border bg-surface-2 text-amber transition-transform hover:rotate-180"
          aria-label="Swap breeds"
        >
          <ArrowLeftRight className="h-5 w-5" />
        </button>
        <Selector value={b} onChange={setB} breeds={breeds} accent={bb.accent} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <BreedHead breed={ba} />
        <BreedHead breed={bb} />
      </div>

      <Card className="mt-6 flex flex-col gap-6">
        <h2 className="font-display text-h2 font-semibold">Performance profile</h2>
        {metrics.map((m) => {
          const va = ba.metrics[m.key];
          const vb = bb.metrics[m.key];
          return (
            <div key={m.key} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="flex justify-end">
                <Bar value={va} align="right" highlight={va >= vb} />
              </div>
              <span className="w-28 text-center text-sm text-muted">{m.label}</span>
              <div className="flex justify-start">
                <Bar value={vb} align="left" highlight={vb >= va} />
              </div>
            </div>
          );
        })}
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <SpecCard breed={ba} />
        <SpecCard breed={bb} />
      </div>
    </Container>
  );
}

function Selector({
  value,
  onChange,
  breeds,
  accent,
}: {
  value: string;
  onChange: (v: string) => void;
  breeds: Breed[];
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4">
      <span className="h-3 w-3 rounded-full" style={{ background: accent }} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 flex-1 bg-transparent font-display font-semibold outline-none"
      >
        {breeds.map((b) => (
          <option key={b.slug} value={b.slug}>
            {b.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function BreedHead({ breed }: { breed: Breed }) {
  return (
    <Card
      className="flex flex-col gap-2"
      glass
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">{breed.name}</h3>
        <Badge tone="outline">{breed.type}</Badge>
      </div>
      <p className="text-sm text-muted">{breed.tagline}</p>
    </Card>
  );
}

function Bar({
  value,
  align,
  highlight,
}: {
  value: number;
  align: "left" | "right";
  highlight: boolean;
}) {
  return (
    <div className="flex w-full items-center gap-2" style={{ flexDirection: align === "right" ? "row-reverse" : "row" }}>
      <span className="tabular w-8 text-center text-sm font-medium">{value}</span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className={highlight ? "h-full rounded-full gradient-ember" : "h-full rounded-full bg-border"}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginLeft: align === "right" ? "auto" : 0 }}
        />
      </div>
    </div>
  );
}

function SpecCard({ breed }: { breed: Breed }) {
  const specs = [
    { label: "Height", value: formatHands(breed.heightHands) },
    { label: "Weight", value: formatKg(breed.weightKg) },
    { label: "Lifespan", value: formatYears(breed.lifespanYears) },
    { label: "Origin", value: breed.origin.country },
    { label: "Uses", value: breed.uses.slice(0, 3).join(", ") },
  ];
  return (
    <Card className="flex flex-col gap-3">
      <h3 className="font-display font-semibold">{breed.name}</h3>
      <dl className="flex flex-col gap-2 text-sm">
        {specs.map((s) => (
          <div key={s.label} className="flex justify-between gap-4 border-b border-border pb-2 last:border-0">
            <dt className="text-muted">{s.label}</dt>
            <dd className="text-right font-medium">{s.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<Container className="py-14 text-muted">Loading…</Container>}>
      <CompareInner />
    </Suspense>
  );
}
