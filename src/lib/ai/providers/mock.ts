import { getBreed, getAllBreeds } from "@/lib/data/breeds";
import type { RegionImportance } from "@/lib/data/breeds.types";
import { clamp, hashString } from "@/lib/utils";
import type { AIProvider, AnalyzeInput, AnalyzeResult, BreedMatch } from "../types";

/**
 * Deterministic mock provider. Maps an image key → a stable "primary" breed so
 * the same photo always yields the same, believable result. Confidence and the
 * two runner-up matches are derived from the breed's own related list.
 */
export const mockProvider: AIProvider = {
  id: "mock",
  async analyze(input: AnalyzeInput): Promise<AnalyzeResult> {
    const breeds = getAllBreeds();
    const hash = hashString(input.imageKey + (input.fileName ?? ""));

    const primary = breeds[hash % breeds.length];

    // Confidence in a believable band, jittered per image.
    const baseConfidence = 78 + (hash % 18); // 78–95
    const topMatches: BreedMatch[] = [{ slug: primary.slug, confidence: baseConfidence }];

    const runnersUp = primary.related.slice(0, 2);
    let running = baseConfidence;
    runnersUp.forEach((slug, i) => {
      const drop = 28 + ((hash >> (i + 1)) % 14);
      running = clamp(running - drop, 4, 95);
      if (getBreed(slug)) topMatches.push({ slug, confidence: running });
    });

    // Ensure at least 3 matches.
    if (topMatches.length < 3) {
      const filler = breeds.find((b) => !topMatches.some((m) => m.slug === b.slug));
      if (filler) topMatches.push({ slug: filler.slug, confidence: clamp(running - 12, 4, 60) });
    }

    const regionImportance: RegionImportance = { ...primary.regionImportance };

    const notes = buildNotes(primary.slug, regionImportance);

    return { topMatches, regionImportance, notes, provider: "mock" };
  },
};

function buildNotes(slug: string, importance: RegionImportance): string[] {
  const ranked = (Object.entries(importance) as [keyof RegionImportance, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([region]) => region);

  const phrases: Record<string, string> = {
    head: "the head profile and muzzle shape",
    eyes: "eye placement and surrounding markings",
    neck: "neck set, crest and topline",
    chest: "chest depth and shoulder angle",
    body: "coat pattern and barrel proportions",
    legs: "limb length, bone and feathering",
    tail: "tail carriage and set",
  };

  return [
    `Strongest signal came from ${phrases[ranked[0]]}.`,
    `${phrases[ranked[1]]} and ${phrases[ranked[2]]} reinforced the match.`,
    `Overall conformation aligned closely with the ${slug.replace("-", " ")} standard.`,
  ];
}
