"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { HOW_IT_WORKS } from "@/lib/data/content";
import { fadeUp, stagger } from "@/lib/motion";

export function HowItWorks() {
  return (
    <section className="py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="How it works" title="From photo to explained verdict in three steps" />

        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative grid gap-6 md:grid-cols-3"
        >
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
          {HOW_IT_WORKS.map((s) => (
            <motion.li
              key={s.step}
              variants={fadeUp}
              className="relative flex flex-col gap-3 rounded-lg border border-border bg-surface p-6"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full gradient-ember font-display text-lg font-semibold text-[#fbf6ec]">
                {s.step}
              </span>
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-muted">{s.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
