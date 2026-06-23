"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { BreedCard } from "@/components/breed/BreedCard";
import { getAllBreeds, BREED_TYPES } from "@/lib/data/breeds";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type SortKey = "popularity" | "name" | "height";

export default function BreedsPage() {
  const breeds = getAllBreeds();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("popularity");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = breeds.filter((b) => {
      const matchesQ =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.origin.country.toLowerCase().includes(q) ||
        b.uses.some((u) => u.toLowerCase().includes(q));
      const matchesType = !type || b.type === type;
      return matchesQ && matchesType;
    });
    list = [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "height") return b.heightHands[1] - a.heightHands[1];
      return b.metrics.popularity - a.metrics.popularity;
    });
    return list;
  }, [breeds, query, type, sort]);

  const types = useMemo(
    () => BREED_TYPES.filter((t) => breeds.some((b) => b.type === t)),
    [breeds],
  );

  return (
    <Container className="py-14">
      <div className="mb-8 flex flex-col gap-2">
        <span className="label text-amber">Encyclopedia</span>
        <h1 className="font-display text-h1 font-semibold">Breed explorer</h1>
        <p className="text-muted">Search and filter every breed in the HorseVision database.</p>
      </div>

      <div className="sticky top-16 z-30 -mx-2 mb-8 flex flex-col gap-4 rounded-lg glass border border-border p-4">
        <div className="flex items-center gap-3 rounded-md border border-border bg-surface px-4">
          <Search className="h-5 w-5 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, country or use…"
            className="h-11 flex-1 bg-transparent outline-none placeholder:text-muted"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Chip active={!type} onClick={() => setType(null)}>
            All
          </Chip>
          {types.map((t) => (
            <Chip key={t} active={type === t} onClick={() => setType(t)}>
              {t}
            </Chip>
          ))}
          <div className="ml-auto flex items-center gap-2 text-sm text-muted">
            <SlidersHorizontal className="h-4 w-4" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-md border border-border bg-surface px-3 py-2 text-text outline-none"
            >
              <option value="popularity">Most popular</option>
              <option value="name">Name (A–Z)</option>
              <option value="height">Tallest</option>
            </select>
          </div>
        </div>
      </div>

      <p className="mb-4 text-sm text-muted">{filtered.length} breeds</p>

      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b, i) => (
          <BreedCard key={b.slug} breed={b} index={i} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-muted">No breeds match your filters.</p>
      )}
    </Container>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition-colors",
        active
          ? "border-amber bg-[var(--amber)]/12 text-amber"
          : "border-border text-muted hover:text-text",
      )}
    >
      {children}
    </button>
  );
}
