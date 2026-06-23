"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TESTIMONIALS } from "@/lib/data/content";
import { fadeUp, stagger } from "@/lib/motion";

export function Testimonials() {
  return (
    <section className="py-32">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Loved by the paddock" title="What early users say" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-4 md:grid-cols-2"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-7 shadow-soft"
            >
              <Quote className="h-6 w-6 text-amber" />
              <blockquote className="text-lg leading-relaxed text-text">“{t.quote}”</blockquote>
              <figcaption className="mt-1 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-surface-2 text-sm font-semibold text-amber">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-medium">{t.name}</span>
                  <span className="block text-xs text-muted">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
