"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";
import { ease } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden">
      {/* full-bleed cinematic photograph */}
      <img
        src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1600&q=80&auto=format&fit=crop"
        alt="A pale horse at a gallop in dark woodland"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(18,19,13,0.62) 0%, rgba(18,19,13,0.28) 30%, rgba(18,19,13,0.86) 78%, rgba(18,19,13,0.96) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(18,19,13,0.7) 0%, rgba(18,19,13,0.25) 45%, transparent 70%)",
        }}
      />

      <Container className="relative z-10 pb-24 pt-40 sm:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="label text-[var(--ivory)]/80"
        >
          ethereal spirits of the plains
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.08 }}
          className="mt-5 max-w-3xl font-display text-[clamp(3.4rem,9vw,7rem)] font-medium leading-[0.92] text-[#f6f1e6]"
          style={{ textShadow: "0 2px 30px rgba(0,0,0,0.65)" }}
        >
          Know the breed.
          <br />
          <span className="italic">See the reason.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.16 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-[#e7e0d0]/85"
          style={{ textShadow: "0 1px 16px rgba(0,0,0,0.6)" }}
        >
          Upload a photograph and HorseVision identifies the breed in seconds — then reveals the
          exact features that drove the verdict. An explainable, museum-grade study of the horse.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.24 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <LinkButton href="/analyze" size="lg">
            Begin a reading <ArrowRight className="h-4 w-4" />
          </LinkButton>
          <LinkButton href="/breeds" size="lg" variant="outline">
            Enter the archive
          </LinkButton>
        </motion.div>
      </Container>
    </section>
  );
}
