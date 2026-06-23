"use client";

import { motion } from "framer-motion";
import type { BodyRegion, RegionImportance } from "@/lib/data/breeds.types";
import { REGION_POINTS } from "@/lib/data/regions";

const HORSE_PATH =
  "M40 250 C 60 210, 70 190, 110 185 C 130 150, 150 120, 205 110 C 215 80, 235 70, 250 92 C 262 78, 280 80, 286 96 C 300 96, 318 104, 322 128 C 360 140, 372 168, 360 205 C 352 232, 360 250, 372 270 L 350 270 C 340 248, 332 240, 322 240 C 312 250, 300 262, 300 285 L 280 285 C 282 262, 290 250, 296 240 C 270 246, 230 246, 200 236 C 196 252, 196 270, 206 288 L 186 288 C 178 270, 176 252, 178 236 C 150 226, 128 226, 110 232 C 104 252, 104 272, 116 290 L 96 290 C 88 272, 86 252, 92 232 C 70 226, 52 212, 40 250 Z";

interface HorseRegionDiagramProps {
  importance?: Partial<RegionImportance>;
  activeRegion?: BodyRegion | null;
  onHover?: (region: BodyRegion | null) => void;
  /** show importance heat blobs */
  heat?: boolean;
}

/** Reusable side-on horse with interactive body-region hotspots. */
export function HorseRegionDiagram({
  importance,
  activeRegion,
  onHover,
  heat = true,
}: HorseRegionDiagramProps) {
  return (
    <svg viewBox="0 0 400 320" className="h-full w-full" role="img" aria-label="Horse body regions">
      <defs>
        <linearGradient id="hrdFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--surface-2)" />
          <stop offset="100%" stopColor="var(--surface)" />
        </linearGradient>
      </defs>

      <path d={HORSE_PATH} fill="url(#hrdFill)" stroke="var(--border)" strokeWidth={1.5} />

      {(Object.keys(REGION_POINTS) as BodyRegion[]).map((region) => {
        const p = REGION_POINTS[region];
        const cx = (p.x / 100) * 400;
        const cy = (p.y / 100) * 320;
        const val = importance?.[region] ?? 0;
        const active = activeRegion === region;
        const radius = heat ? 14 + (val / 100) * 30 : 16;

        return (
          <g
            key={region}
            onMouseEnter={() => onHover?.(region)}
            onMouseLeave={() => onHover?.(null)}
            className="cursor-pointer"
          >
            {heat && val > 0 && (
              <motion.circle
                cx={cx}
                cy={cy}
                initial={{ r: 0, opacity: 0 }}
                animate={{ r: radius, opacity: 0.35 + (val / 100) * 0.45 }}
                transition={{ duration: 0.8 }}
                fill="var(--ember)"
                style={{ mixBlendMode: "screen", filter: "blur(4px)" }}
              />
            )}
            <motion.circle
              cx={cx}
              cy={cy}
              r={active ? 8 : 5}
              fill={active ? "var(--amber)" : "var(--text)"}
              stroke="var(--bg)"
              strokeWidth={2}
              animate={{ scale: active ? 1.1 : 1 }}
            />
            {active && (
              <text
                x={cx}
                y={cy - 16}
                textAnchor="middle"
                className="fill-[var(--amber)] text-[11px] font-semibold"
              >
                {p.label}
                {importance?.[region] != null ? ` · ${importance[region]}%` : ""}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
