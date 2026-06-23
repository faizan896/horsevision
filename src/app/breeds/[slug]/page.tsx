import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, GitCompare, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { TraitMeter } from "@/components/breed/TraitMeter";
import { BreedCard } from "@/components/breed/BreedCard";
import { Timeline } from "@/components/breed/Timeline";
import { getAllBreeds, getBreed, getRelated } from "@/lib/data/breeds";
import { formatHands, formatKg, formatYears } from "@/lib/utils";

export function generateStaticParams() {
  return getAllBreeds().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const breed = getBreed(slug);
  if (!breed) return { title: "Breed not found" };
  return {
    title: breed.name,
    description: `${breed.name}: ${breed.tagline} Origin, history, temperament, traits and more.`,
  };
}

export default async function BreedDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const breed = getBreed(slug);
  if (!breed) notFound();
  const related = getRelated(slug);

  const facts = [
    { label: "Type", value: breed.type },
    { label: "Origin", value: breed.origin.country },
    { label: "Height", value: formatHands(breed.heightHands) },
    { label: "Weight", value: formatKg(breed.weightKg) },
    { label: "Lifespan", value: formatYears(breed.lifespanYears) },
  ];

  return (
    <Container className="py-12">
      <Link href="/breeds" className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-text">
        <ArrowLeft className="h-4 w-4" /> All breeds
      </Link>

      {/* hero */}
      <section className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <figure className="plate aspect-[4/3] overflow-hidden rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={breed.image}
            alt={`${breed.name} horse`}
            className="plate-img h-full w-full object-cover"
          />
        </figure>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge tone="amber">{breed.type}</Badge>
            <Badge>
              <MapPin className="h-3 w-3" /> {breed.origin.country}
            </Badge>
          </div>
          <h1 className="font-display text-display font-semibold leading-none">{breed.name}</h1>
          <p className="text-lg text-muted">{breed.tagline}</p>

          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="rounded-md border border-border bg-surface p-3">
                <p className="text-xs text-muted">{f.label}</p>
                <p className="font-display font-semibold">{f.value}</p>
              </div>
            ))}
          </div>

          <Link
            href={`/compare?a=${breed.slug}`}
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-surface-2 px-4 py-2 text-sm hover:text-amber"
          >
            <GitCompare className="h-4 w-4" /> Compare with another breed
          </Link>
        </div>
      </section>

      {/* body */}
      <section className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="flex flex-col gap-4">
          <h2 className="font-display text-h2 font-semibold">History</h2>
          <p className="text-sm leading-relaxed text-muted">{breed.history}</p>
          <div className="flex flex-wrap gap-2">
            {breed.temperament.map((t) => (
              <Badge key={t} tone="sage">
                {t}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <h3 className="font-display font-semibold">Profile</h3>
          <TraitMeter label="Speed" value={breed.metrics.speed} />
          <TraitMeter label="Endurance" value={breed.metrics.endurance} delay={0.05} />
          <TraitMeter label="Strength" value={breed.metrics.strength} delay={0.1} />
          <TraitMeter label="Trainability" value={breed.metrics.trainability} delay={0.15} />
        </Card>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 font-display font-semibold">Timeline</h3>
          <Timeline items={breed.timeline} />
        </Card>
        <div className="grid gap-6">
          <Card>
            <h3 className="mb-3 font-display font-semibold">Fun facts</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted">
              {breed.funFacts.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-amber">›</span>
                  {f}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="mb-3 font-display font-semibold">Health</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted">
              {breed.health.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="text-amber">›</span>
                  {h}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 font-display text-h2 font-semibold">Related breeds</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <BreedCard key={r.slug} breed={r} index={i} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
