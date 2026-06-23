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
        <div className="plate relative h-48 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={breed.image}
            alt={`${breed.name} horse`}
            loading="lazy"
            className="plate-img h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
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
