"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Signature animated horse silhouette. The outline "draws" itself on mount and
 * a soft gradient fill fades in. Used as the hero centrepiece.
 */
export function HorseSilhouette({ className }: { className?: string }) {
  const path =
    "M40 250 C 60 210, 70 190, 110 185 C 130 150, 150 120, 205 110 C 215 80, 235 70, 250 92 C 262 78, 280 80, 286 96 C 300 96, 318 104, 322 128 C 360 140, 372 168, 360 205 C 352 232, 360 250, 372 270 L 350 270 C 340 248, 332 240, 322 240 C 312 250, 300 262, 300 285 L 280 285 C 282 262, 290 250, 296 240 C 270 246, 230 246, 200 236 C 196 252, 196 270, 206 288 L 186 288 C 178 270, 176 252, 178 236 C 150 226, 128 226, 110 232 C 104 252, 104 272, 116 290 L 96 290 C 88 272, 86 252, 92 232 C 70 226, 52 212, 40 250 Z";

  return (
    <svg
      viewBox="0 0 400 320"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Stylised horse silhouette"
    >
      <defs>
        <linearGradient id="horseFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--ember)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--amber)" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="horseStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--amber)" />
          <stop offset="100%" stopColor="var(--ember)" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d={path}
        fill="url(#horseFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.16 }}
        transition={{ duration: 1.6, delay: 1 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="url(#horseStroke)"
        strokeWidth={2.5}
        strokeLinejoin="round"
        filter="url(#soft)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: "easeInOut" }}
      />
    </svg>
  );
}
