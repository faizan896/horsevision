import type { RegionImportance } from "@/lib/data/breeds.types";

export interface AnalyzeInput {
  /** object URL or data URL of the image, used for hashing in the mock */
  imageKey: string;
  fileName?: string;
}

export interface BreedMatch {
  slug: string;
  confidence: number; // 0–100
}

export interface AnalyzeResult {
  topMatches: BreedMatch[]; // ranked, length >= 3
  regionImportance: RegionImportance;
  notes: string[];
  provider: string;
}

export interface AIProvider {
  id: string;
  analyze(input: AnalyzeInput): Promise<AnalyzeResult>;
}
