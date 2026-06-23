/**
 * Tiny class-name combiner (no clsx/tailwind-merge dependency needed for this scope).
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function range(min: number, max: number): string {
  return min === max ? `${min}` : `${min}–${max}`;
}

export function formatHands([min, max]: [number, number]): string {
  return `${range(min, max)} hh`;
}

export function formatKg([min, max]: [number, number]): string {
  return `${range(min, max)} kg`;
}

export function formatYears([min, max]: [number, number]): string {
  return `${range(min, max)} yrs`;
}

/** Deterministic 32-bit hash so the mock AI returns a stable breed per image. */
export function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function clamp(value: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, value));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
