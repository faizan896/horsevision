"use client";

import {
  Activity,
  CalendarClock,
  Flag,
  Heart,
  Info,
  Palette,
  Ruler,
  Sparkles,
  Star,
  Weight,
} from "lucide-react";
import type { Breed } from "@/lib/data/breeds.types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TraitMeter } from "@/components/breed/TraitMeter";
import { formatHands, formatKg, formatYears } from "@/lib/utils";

export function BreedOverview({ breed }: { breed: Breed }) {
  const stats = [
    { icon: Flag, label: "Origin", value: breed.origin.country },
    { icon: Ruler, label: "Height", value: formatHands(breed.heightHands) },
    { icon: Weight, label: "Weight", value: formatKg(breed.weightKg) },
    { icon: CalendarClock, label: "Lifespan", value: formatYears(breed.lifespanYears) },
  ];

  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-display text-h2 font-semibold">Breed overview</h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="flex flex-col gap-1.5 p-4">
            <s.icon className="h-4 w-4 text-amber" />
            <span className="text-xs text-muted">{s.label}</span>
            <span className="font-display font-semibold">{s.value}</span>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="flex flex-col gap-4">
          <h3 className="flex items-center gap-2 font-display font-semibold">
            <Info className="h-4 w-4 text-amber" /> History & origin
          </h3>
          <p className="text-sm leading-relaxed text-muted">{breed.history}</p>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Temperament</span>
            <div className="flex flex-wrap gap-2">
              {breed.temperament.map((t) => (
                <Badge key={t} tone="sage">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                <Palette className="h-3.5 w-3.5" /> Typical colors
              </span>
              <div className="flex flex-wrap gap-1.5">
                {breed.colors.map((c) => (
                  <Badge key={c}>{c}</Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                <Activity className="h-3.5 w-3.5" /> Common uses
              </span>
              <div className="flex flex-wrap gap-1.5">
                {breed.uses.map((u) => (
                  <Badge key={u}>{u}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <h3 className="font-display font-semibold">Profile</h3>
          <TraitMeter label="Speed" value={breed.metrics.speed} />
          <TraitMeter label="Endurance" value={breed.metrics.endurance} delay={0.05} />
          <TraitMeter label="Strength" value={breed.metrics.strength} delay={0.1} />
          <TraitMeter label="Trainability" value={breed.metrics.trainability} delay={0.15} />
          <TraitMeter label="Popularity" value={breed.metrics.popularity} delay={0.2} />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 font-display font-semibold">
            <Sparkles className="h-4 w-4 text-amber" /> Interesting facts
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-muted">
            {breed.funFacts.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-amber">›</span>
                {f}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 font-display font-semibold">
            <Heart className="h-4 w-4 text-amber" /> Health considerations
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-muted">
            {breed.health.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="text-amber">›</span>
                {h}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 font-display font-semibold">
            <Star className="h-4 w-4 text-amber" /> Famous examples
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-muted">
            {breed.famous.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-amber">›</span>
                {f}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
