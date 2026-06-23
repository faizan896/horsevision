"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { getAllBreeds } from "@/lib/data/breeds";
import type { Breed } from "@/lib/data/breeds.types";

const W = 1000;
const H = 500;

function project(lat: number, lng: number) {
  return { x: ((lng + 180) / 360) * W, y: ((90 - lat) / 180) * H };
}

export default function MapPage() {
  const breeds = getAllBreeds();
  const countries = useMemo(() => {
    const map = new Map<string, Breed[]>();
    for (const b of breeds) {
      const key = b.origin.country;
      map.set(key, [...(map.get(key) ?? []), b]);
    }
    return Array.from(map.entries()).map(([country, list]) => ({
      country,
      list,
      coords: list[0].origin.coords,
    }));
  }, [breeds]);

  const [selected, setSelected] = useState<string | null>(null);
  const selectedBreeds = countries.find((c) => c.country === selected)?.list ?? [];

  return (
    <Container className="py-14">
      <div className="mb-8 flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">Origins</span>
        <h1 className="font-display text-h1 font-semibold">World map of breeds</h1>
        <p className="text-muted">Tap a glowing pin to see which breeds come from there.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card className="overflow-hidden p-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full">
            <defs>
              <radialGradient id="mapGlow" cx="50%" cy="40%" r="70%">
                <stop offset="0%" stopColor="rgba(217,98,43,0.10)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>
            <rect width={W} height={H} fill="var(--surface)" />
            <rect width={W} height={H} fill="url(#mapGlow)" />

            {/* graticule */}
            {Array.from({ length: 11 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={(i / 10) * W}
                y1={0}
                x2={(i / 10) * W}
                y2={H}
                stroke="var(--border)"
                strokeWidth={0.5}
                opacity={0.4}
              />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={(i / 5) * H}
                x2={W}
                y2={(i / 5) * H}
                stroke="var(--border)"
                strokeWidth={0.5}
                opacity={0.4}
              />
            ))}

            {/* dotted landmass hint */}
            {DOTS.map((d, i) => (
              <circle key={i} cx={d[0]} cy={d[1]} r={1.4} fill="var(--muted)" opacity={0.35} />
            ))}

            {countries.map((c, i) => {
              const { x, y } = project(c.coords[0], c.coords[1]);
              const active = selected === c.country;
              return (
                <g
                  key={c.country}
                  className="cursor-pointer"
                  onClick={() => setSelected(active ? null : c.country)}
                >
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={active ? 18 : 12}
                    fill="var(--ember)"
                    opacity={0.18}
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2 }}
                  />
                  <circle cx={x} cy={y} r={active ? 6 : 4} fill="var(--amber)" stroke="var(--bg)" strokeWidth={1.5} />
                  <text x={x} y={y - 12} textAnchor="middle" className="fill-[var(--text)] text-[11px]">
                    {c.country}
                  </text>
                </g>
              );
            })}
          </svg>
        </Card>

        <div className="flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected ?? "none"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <Card className="flex flex-col gap-3">
                <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
                  <MapPin className="h-5 w-5 text-amber" />
                  {selected ?? "Select a country"}
                </h2>
                {selected ? (
                  <div className="flex flex-col gap-2">
                    {selectedBreeds.map((b) => (
                      <Link
                        key={b.slug}
                        href={`/breeds/${b.slug}`}
                        className="flex items-center justify-between rounded-md border border-border bg-surface-2 px-4 py-3 transition-colors hover:border-[var(--amber)]/40"
                      >
                        <span className="font-medium">{b.name}</span>
                        <span className="text-xs text-muted">{b.type}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted">
                    {countries.length} origin countries · {breeds.length} breeds. Click a pin to
                    explore.
                  </p>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
}

// Sparse decorative "landmass" dots (purely aesthetic, equirectangular-ish).
const DOTS: [number, number][] = [
  [120, 150], [150, 160], [180, 140], [200, 180], [160, 200], [220, 210],
  [480, 130], [510, 150], [540, 140], [500, 180], [530, 200], [560, 170],
  [520, 250], [540, 280], [560, 300], [500, 320], [530, 340],
  [620, 160], [650, 180], [680, 150], [700, 200], [720, 230], [690, 260],
  [760, 180], [800, 200], [840, 230], [820, 280], [860, 300],
  [300, 360], [330, 380], [310, 400], [350, 420],
];
