"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FEATURES } from "@/lib/data/content";
import { stagger, fadeUp } from "@/lib/motion";

export function FeatureGrid() {
  return (
    <section className="py-32">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Why HorseVision"
          title="A breed identifier that shows its work"
          subtitle="Most tools give you a guess. HorseVision gives you a verdict, the runners-up, and the reasoning behind both."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group rounded-lg border border-border bg-surface p-6 shadow-soft transition-colors hover:border-[var(--amber)]/40"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-md bg-surface-2 text-amber transition-colors group-hover:bg-[var(--amber)]/15">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
