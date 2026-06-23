"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";
import { ease } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24">
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col items-start gap-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-display text-lg italic text-amber"
          >
            equine intelligence, explained
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="font-display text-display font-semibold leading-[0.98]"
          >
            Know the breed.
            <br />
            <span className="italic text-gradient">See the reason.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="max-w-md text-lg leading-relaxed text-muted"
          >
            Upload a photograph and HorseVision identifies the breed in seconds — then shows you the
            exact features that drove the verdict. Made for owners, vets, breeders and enthusiasts.
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
            <LinkButton href="/breeds" size="lg" variant="outline">
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

        {/* Vintage plate hero — Whistlejacket, George Stubbs, 1762 (public domain) */}
        <motion.figure
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="plate overflow-hidden rounded-sm p-3">
            <div className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=900&q=80&auto=format&fit=crop"
                alt="Whistlejacket, a rearing chestnut horse, painted by George Stubbs in 1762"
                className="plate-img aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>

          <figcaption className="mt-3 flex items-center justify-between text-xs italic text-muted">
            <span>“Whistlejacket” · George Stubbs, 1762</span>
            <span className="not-italic">Arabian / Thoroughbred</span>
          </figcaption>

          <div className="absolute -left-5 top-6 hidden rounded-sm border border-border bg-surface px-4 py-3 shadow-soft sm:block">
            <p className="text-xs text-muted">Predicted breed</p>
            <p className="font-display text-base font-semibold">Arabian · 93%</p>
          </div>
          <div className="absolute -right-4 bottom-16 hidden rounded-sm border border-border bg-surface px-4 py-3 shadow-soft sm:block">
            <p className="text-xs text-muted">Face importance</p>
            <p className="font-display text-base font-semibold text-amber">95%</p>
          </div>
        </motion.figure>
      </Container>
    </section>
  );
}
