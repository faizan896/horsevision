"use client";

import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { ANALYSIS_STEPS } from "@/lib/data/analysis-steps";
import { cn } from "@/lib/utils";

interface StepTimelineProps {
  currentIndex: number;
}

/** Compact, auto-scrolling list of analysis stages with live status. */
export function StepTimeline({ currentIndex }: StepTimelineProps) {
  return (
    <ul className="relative flex max-h-[420px] flex-col gap-1 overflow-hidden pr-1" aria-live="polite">
      {ANALYSIS_STEPS.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <motion.li
            key={step.id}
            animate={{
              opacity: active ? 1 : done ? 0.55 : 0.3,
              x: active ? 0 : 0,
            }}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
              active && "bg-surface-2 text-text",
              !active && "text-muted",
            )}
          >
            <span
              className={cn(
                "grid h-5 w-5 shrink-0 place-items-center rounded-full border",
                done && "border-sage bg-[var(--sage)]/15 text-sage",
                active && "border-amber text-amber",
                !done && !active && "border-border",
              )}
            >
              {done ? (
                <Check className="h-3 w-3" />
              ) : active ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : null}
            </span>
            <span className={cn(active && "font-medium")}>{step.label}</span>
          </motion.li>
        );
      })}
    </ul>
  );
}
