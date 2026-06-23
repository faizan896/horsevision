"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";

export function Cta() {
  return (
    <section className="py-32">
      <Container>
        <Reveal className="relative overflow-hidden rounded-xl border border-border p-12 text-center shadow-soft sm:p-16">
          <div className="absolute inset-0 -z-10 gradient-ember opacity-[0.14]" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--ember)]/20 blur-[100px]" />
          <h2 className="mx-auto max-w-2xl font-display text-h1 font-semibold">
            Point your camera at a horse. We&apos;ll do the rest.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Try the cinematic analysis now — no account, no setup, results in seconds.
          </p>
          <div className="mt-8 flex justify-center">
            <LinkButton href="/analyze" size="lg">
              Identify a horse <ArrowRight className="h-4 w-4" />
            </LinkButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
