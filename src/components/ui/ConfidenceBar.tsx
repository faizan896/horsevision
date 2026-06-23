"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ConfidenceBarProps {
  value: number; // 0–100
  delay?: number;
  className?: string;
  tone?: "ember" | "sage" | "muted";
}

const tones = {
  ember: "gradient-ember",
  sage: "bg-sage",
  muted: "bg-border",
};

export function ConfidenceBar({ value, delay = 0, className, tone = "ember" }: ConfidenceBarProps) {
  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-full bg-surface-2", className)}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className={cn("h-full rounded-full", tones[tone])}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
      />
    </div>
  );
}
