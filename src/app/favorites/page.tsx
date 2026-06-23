"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { BreedCard } from "@/components/breed/BreedCard";
import { LinkButton } from "@/components/ui/Button";
import { getBreed } from "@/lib/data/breeds";
import { useFavorites } from "@/lib/hooks/useFavorites";

export default function FavoritesPage() {
  const { favorites, ready } = useFavorites();
  const breeds = favorites.map(getBreed).filter(Boolean);

  return (
    <Container className="py-14">
      <div className="mb-8 flex flex-col gap-2">
        <span className="label text-amber">Saved</span>
        <h1 className="font-display text-h1 font-semibold">Your favorites</h1>
        <p className="text-muted">Breeds you&apos;ve hearted, stored on this device.</p>
      </div>

      {ready && breeds.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border bg-surface py-20 text-center"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full bg-surface-2 text-ember">
            <Heart className="h-6 w-6" />
          </span>
          <p className="font-display text-lg font-semibold">No favorites yet</p>
          <p className="max-w-sm text-sm text-muted">
            Tap the heart on any breed to save it here for quick access.
          </p>
          <LinkButton href="/breeds">Explore breeds</LinkButton>
        </motion.div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {breeds.map((b, i) => b && <BreedCard key={b.slug} breed={b} index={i} />)}
        </div>
      )}
    </Container>
  );
}
