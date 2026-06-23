"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GitCompare } from "lucide-react";
import type { Breed } from "@/lib/data/breeds.types";
import { getRelated } from "@/lib/data/breeds";
import { Card } from "@/components/ui/Card";
import { ConfidenceBar } from "@/components/ui/ConfidenceBar";

/** Crude but plausible similarity from shared metrics + type. */
function similarity(a: Breed, b: Breed): number {
  const keys = ["speed", "endurance", "strength", "trainability"] as const;
  const diff =
    keys.reduce((acc, k) => acc + Math.abs(a.metrics[k] - b.metrics[k]), 0) / keys.length;
  const typeBonus = a.type === b.type ? 12 : 0;
  return Math.round(Math.max(40, Math.min(96, 100 - diff + typeBonus)));
}

function difference(a: Breed, b: Breed): string {
  if (a.type !== b.type) return `Different group — ${b.type.toLowerCase()} vs ${a.type.toLowerCase()}.`;
  if (Math.abs(a.metrics.strength - b.metrics.strength) > 20)
    return b.metrics.strength > a.metrics.strength ? "Heavier, more powerful build." : "Lighter, more refined build.";
  if (Math.abs(a.heightHands[1] - b.heightHands[1]) > 1)
    return b.heightHands[1] > a.heightHands[1] ? "Typically taller." : "Typically smaller.";
  return `Shares the ${b.type.toLowerCase()} type with subtle conformation differences.`;
}

export function SimilarBreeds({ breed }: { breed: Breed }) {
  const related = getRelated(breed.slug);
  if (related.length === 0) return null;

  return (
    <section className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-h2 font-semibold">Visually similar breeds</h2>
        <p className="mt-1 text-muted">Often confused with the {breed.name} — here&apos;s how they differ.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {related.map((r, i) => {
          const sim = similarity(breed, r);
          return (
            <motion.div
              key={r.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card interactive className="flex h-full flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Link href={`/breeds/${r.slug}`} className="font-display font-semibold hover:text-amber">
                    {r.name}
                  </Link>
                  <span className="h-3 w-3 rounded-full" style={{ background: r.accent }} />
                </div>
                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs text-muted">
                    <span>Similarity</span>
                    <span className="tabular font-medium text-amber">{sim}%</span>
                  </div>
                  <ConfidenceBar value={sim} tone="ember" />
                </div>
                <p className="flex-1 text-xs leading-relaxed text-muted">{difference(breed, r)}</p>
                <Link
                  href={`/compare?a=${breed.slug}&b=${r.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-amber hover:underline"
                >
                  <GitCompare className="h-3.5 w-3.5" /> Quick compare
                </Link>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
