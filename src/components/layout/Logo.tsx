import { cn } from "@/lib/utils";

/** Compact HorseVision mark — a stylised horse head inside a viewfinder. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn(className)} role="img" aria-label="HorseVision logo">
      <defs>
        <linearGradient id="logoG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--amber)" />
          <stop offset="100%" stopColor="var(--ember)" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="37" height="37" rx="11" fill="var(--surface-2)" stroke="url(#logoG)" strokeWidth="1.5" />
      <path
        d="M14 28 C 13 22, 14 18, 18 15 C 19 12, 22 11, 23 14 C 25 13, 27 14, 27 16 C 29 17, 30 19, 29 22 C 28 25, 29 27, 30 29 L 26 29 C 25 26, 24 25, 22 25 C 20 26, 19 28, 19 30 L 16 30 C 16 27, 17 25, 19 24 C 17 24, 15 25, 14 28 Z"
        fill="url(#logoG)"
      />
      <circle cx="24.5" cy="17.5" r="1.1" fill="var(--surface-2)" />
    </svg>
  );
}
