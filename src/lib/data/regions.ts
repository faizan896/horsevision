import type { BodyRegion } from "./breeds.types";

/** Approximate landmark positions (% of frame) for a side-on horse facing right. */
export const REGION_POINTS: Record<BodyRegion, { x: number; y: number; label: string }> = {
  head: { x: 80, y: 28, label: "Head" },
  eyes: { x: 84, y: 24, label: "Eye" },
  neck: { x: 67, y: 33, label: "Neck" },
  chest: { x: 54, y: 52, label: "Chest" },
  body: { x: 43, y: 46, label: "Barrel" },
  legs: { x: 46, y: 82, label: "Legs" },
  tail: { x: 13, y: 44, label: "Tail" },
};

export const REGION_ORDER: BodyRegion[] = ["head", "eyes", "neck", "chest", "body", "legs", "tail"];

export const REGION_LABELS: Record<BodyRegion, string> = {
  head: "Head",
  eyes: "Eyes",
  neck: "Neck",
  chest: "Chest",
  body: "Body",
  legs: "Legs",
  tail: "Tail",
};
