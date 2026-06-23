"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { BodyRegion } from "@/lib/data/breeds.types";
import { REGION_POINTS, REGION_ORDER } from "@/lib/data/regions";

interface ScanOverlayProps {
  layer?: "scan" | "landmarks" | "heatmap" | "rank";
  activeRegion?: BodyRegion;
  /** how far through the landmark phase we are, to reveal points progressively */
  revealedRegions: BodyRegion[];
}

/** Animated analysis overlay: scan line + landmark points + heatmap. */
export function ScanOverlay({ layer, activeRegion, revealedRegions }: ScanOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
      {/* corner reticle */}
      <Reticle />

      {/* sweeping scan line */}
      <div className="absolute inset-0">
        <div className="absolute left-0 right-0 h-24 animate-scan-sweep bg-gradient-to-b from-transparent via-[var(--amber)]/25 to-transparent" />
        <div className="absolute inset-0 animate-scan-sweep">
          <div className="h-[2px] w-full bg-[var(--amber)] shadow-[0_0_12px_var(--amber)]" />
        </div>
      </div>

      {/* grid wash */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(var(--amber) 1px, transparent 1px), linear-gradient(90deg, var(--amber) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(circle at center, black, transparent 75%)",
        }}
      />

      {/* heatmap blobs */}
      <AnimatePresence>
        {layer === "heatmap" &&
          REGION_ORDER.map((region) => {
            const p = REGION_POINTS[region];
            return (
              <motion.div
                key={`heat-${region}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.55, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  background: `radial-gradient(circle, rgba(217,98,43,0.7), transparent 70%)`,
                  mixBlendMode: "screen",
                }}
              />
            );
          })}
      </AnimatePresence>

      {/* landmark points */}
      <AnimatePresence>
        {revealedRegions.map((region) => {
          const p = REGION_POINTS[region];
          const isActive = region === activeRegion;
          return (
            <motion.div
              key={`pt-${region}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              {isActive && (
                <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-[var(--amber)]/40" />
              )}
              <span className="relative block h-2.5 w-2.5 rounded-full bg-[var(--amber)] shadow-[0_0_10px_var(--amber)]" />
              {isActive && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-medium text-amber backdrop-blur">
                  {p.label}
                </span>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function Reticle() {
  const corner = "absolute h-6 w-6 border-amber/70";
  return (
    <>
      <span className={`${corner} left-3 top-3 border-l-2 border-t-2 rounded-tl`} />
      <span className={`${corner} right-3 top-3 border-r-2 border-t-2 rounded-tr`} />
      <span className={`${corner} bottom-3 left-3 border-b-2 border-l-2 rounded-bl`} />
      <span className={`${corner} bottom-3 right-3 border-b-2 border-r-2 rounded-br`} />
    </>
  );
}
