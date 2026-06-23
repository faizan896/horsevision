"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getAllBreeds } from "@/lib/data/breeds";

export function SupportedBreeds() {
  const breeds = getAllBreeds();
  const row = [...breeds, ...breeds]; // duplicate for seamless marquee

  return (
    <section className="py-32">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Supported breeds"
          title="A growing equine encyclopedia"
          subtitle="From desert hotbloods to gentle draught giants — each with history, traits, origin maps and galleries."
        />
      </Container>

      <div className="relative mt-2 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent" />
        <div className="flex w-max gap-3 animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
          {row.map((b, i) => (
            <Link
              key={`${b.slug}-${i}`}
              href={`/breeds/${b.slug}`}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface px-5 py-3 text-sm transition-colors hover:border-[var(--amber)]/50"
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: b.accent }} />
              {b.name}
              <span className="text-xs text-muted">{b.type}</span>
            </Link>
          ))}
        </div>
      </div>

      <Container className="mt-10 flex justify-center">
        <Link
          href="/breeds"
          className="inline-flex items-center gap-2 text-sm font-medium text-amber hover:underline"
        >
          Browse the full explorer <ArrowRight className="h-4 w-4" />
        </Link>
      </Container>

      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </section>
  );
}
