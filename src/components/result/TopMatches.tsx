"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { BreedMatch } from "@/lib/ai/types";
import { getBreed } from "@/lib/data/breeds";
import { ConfidenceBar } from "@/components/ui/ConfidenceBar";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";

export function TopMatches({ matches }: { matches: BreedMatch[] }) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-display text-h2 font-semibold">Top matches</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {matches.slice(0, 3).map((m, i) => {
          const breed = getBreed(m.slug);
          if (!breed) return null;
          return (
            <motion.div
              key={m.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col gap-3 rounded-lg border p-5 ${
                i === 0 ? "border-[var(--amber)]/50 bg-surface-2" : "border-border bg-surface"
              }`}
            >
              {i === 0 && (
                <span className="absolute right-4 top-4 rounded-full bg-[var(--amber)]/15 px-2.5 py-1 text-xs font-medium text-amber">
                  Best match
                </span>
              )}
              <span className="text-xs text-muted">#{i + 1}</span>
              <Link href={`/breeds/${breed.slug}`} className="group flex items-center gap-1.5">
                <h3 className="font-display text-lg font-semibold group-hover:text-amber">
                  {breed.name}
                </h3>
                <ArrowUpRight className="h-4 w-4 text-muted transition-colors group-hover:text-amber" />
              </Link>
              <p className="font-display text-3xl font-semibold text-gradient">
                <AnimatedNumber value={m.confidence} suffix="%" />
              </p>
              <ConfidenceBar value={m.confidence} tone={i === 0 ? "ember" : "muted"} />
              <p className="text-xs text-muted">{breed.type} · {breed.origin.country}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
