"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HorseSilhouette } from "./HorseSilhouette";
import { ParticleField } from "./ParticleField";
import { ease } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28">
      <ParticleField className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ember)]/10 blur-[120px]" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col items-start gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Badge tone="amber">
              <Sparkles className="h-3.5 w-3.5" /> Explainable equine AI
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="font-display text-display font-semibold leading-[1.02]"
          >
            Know the breed.
            <br />
            <span className="text-gradient">See the reason.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="max-w-md text-lg text-muted"
          >
            Upload a photo and HorseVision identifies the breed in seconds — then shows you the
            exact features that drove the verdict. Built for owners, vets, breeders and enthusiasts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3"
          >
            <LinkButton href="/analyze" size="lg">
              Identify a horse <ArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton href="/breeds" size="lg" variant="secondary">
              Explore breeds
            </LinkButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-muted"
          >
            No sign-up · Works on mobile · Free to try
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          <div className="absolute inset-0 animate-float">
            <div className="glass h-full w-full rounded-[32px] border border-border p-6 shadow-soft">
              <HorseSilhouette />
            </div>
          </div>
          <div className="absolute -bottom-4 -right-2 glass rounded-2xl border border-border px-4 py-3 shadow-soft">
            <p className="text-xs text-muted">Predicted breed</p>
            <p className="font-display text-lg font-semibold text-text">Arabian · 93%</p>
          </div>
          <div className="absolute -left-3 top-8 glass rounded-2xl border border-border px-4 py-3 shadow-soft">
            <p className="text-xs text-muted">Face importance</p>
            <p className="font-display text-lg font-semibold text-amber">95%</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
