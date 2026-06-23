"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, MapPin } from "lucide-react";
import type { Breed } from "@/lib/data/breeds.types";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { formatHands } from "@/lib/utils";
import { spring } from "@/lib/motion";
import { Badge } from "@/components/ui/Badge";

export function BreedCard({ breed, index = 0 }: { breed: Breed; index?: number }) {
  const { has, toggle } = useFavorites();
  const favorite = has(breed.slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...spring, delay: Math.min(index * 0.04, 0.3) }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-lg border border-border bg-surface shadow-soft"
    >
      <Link href={`/breeds/${breed.slug}`} className="block">
        <div
          className="relative h-40 overflow-hidden"
          style={{
            background: `radial-gradient(120% 120% at 70% 10%, ${breed.accent}33, transparent 60%), linear-gradient(160deg, var(--surface-2), var(--surface))`,
          }}
        >
          <BreedGlyph accent={breed.accent} />
          <div className="absolute left-4 top-4">
            <Badge tone="outline">{breed.type}</Badge>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-5">
          <h3 className="font-display text-lg font-semibold">{breed.name}</h3>
          <p className="line-clamp-2 text-sm text-muted">{breed.tagline}</p>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {breed.origin.country}
            </span>
            <span className="tabular">{formatHands(breed.heightHands)}</span>
          </div>
        </div>
      </Link>

      <button
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        onClick={() => toggle(breed.slug)}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass border border-border text-muted transition-colors hover:text-ember"
      >
        <motion.span animate={{ scale: favorite ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
          <Heart className="h-4 w-4" fill={favorite ? "var(--ember)" : "none"} stroke={favorite ? "var(--ember)" : "currentColor"} />
        </motion.span>
      </button>
    </motion.div>
  );
}

function BreedGlyph({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 140" className="absolute inset-0 h-full w-full opacity-70">
      <path
        d="M30 120 C 35 96, 42 84, 64 80 C 70 60, 84 48, 110 44 C 114 30, 126 26, 132 38 C 142 32, 154 36, 154 48 C 168 52, 174 68, 166 88 C 160 104, 166 114, 172 124 L 156 124 C 150 108, 144 104, 134 104 C 126 110, 120 118, 120 128 L 106 128 C 108 116, 114 108, 122 104 C 104 108, 80 108, 64 102 C 62 112, 64 122, 70 130 L 56 130 C 50 120, 48 110, 52 100 C 40 96, 34 104, 30 120 Z"
        fill={accent}
        opacity="0.35"
      />
    </svg>
  );
}
