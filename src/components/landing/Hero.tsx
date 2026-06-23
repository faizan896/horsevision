"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";
import { ease } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative pt-24 pb-28 sm:pt-32 sm:pb-36">
      <Container className="grid items-center gap-16 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
        <div className="flex flex-col items-start gap-7">
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
            <span className="italic text-amber">See the reason.</span>
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
            className="flex flex-wrap items-center gap-3 pt-2"
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
            className="label text-muted"
          >
            no sign-up · works on mobile · free to try
          </motion.p>
        </div>

        <motion.figure
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="plate overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=900&q=80&auto=format&fit=crop"
              alt="A grey horse at a gallop"
              className="plate-img aspect-[4/5] w-full object-cover"
            />
          </div>

          <figcaption className="mt-4 flex items-center justify-between text-muted">
            <span className="italic">every horse tells a story</span>
            <span className="label">plate i</span>
          </figcaption>
        </motion.figure>
      </Container>
    </section>
  );
}
