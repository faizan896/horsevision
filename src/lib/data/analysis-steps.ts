import type { BodyRegion } from "./breeds.types";

export interface AnalysisStep {
  id: string;
  label: string;
  /** relative duration weight; total is normalised at runtime */
  weight: number;
  /** body region to highlight during this step, if any */
  region?: BodyRegion;
  /** which visual layer to emphasise */
  layer?: "scan" | "landmarks" | "heatmap" | "rank";
}

export const ANALYSIS_STEPS: AnalysisStep[] = [
  { id: "upload", label: "Uploading", weight: 1.2, layer: "scan" },
  { id: "prepare", label: "Preparing image", weight: 1, layer: "scan" },
  { id: "detect", label: "Detecting horse", weight: 1.2, layer: "scan" },
  { id: "background", label: "Removing background", weight: 1, layer: "scan" },
  { id: "landmarks", label: "Finding body landmarks", weight: 1.4, layer: "landmarks" },
  { id: "head", label: "Scanning head shape", weight: 1, region: "head", layer: "landmarks" },
  { id: "eyes", label: "Scanning eyes", weight: 0.8, region: "eyes", layer: "landmarks" },
  { id: "neck", label: "Scanning neck", weight: 0.9, region: "neck", layer: "landmarks" },
  { id: "chest", label: "Scanning chest", weight: 0.9, region: "chest", layer: "landmarks" },
  { id: "legs", label: "Scanning legs", weight: 1, region: "legs", layer: "landmarks" },
  { id: "tail", label: "Scanning tail", weight: 0.8, region: "tail", layer: "landmarks" },
  { id: "coat", label: "Analyzing coat pattern", weight: 1.2, region: "body", layer: "heatmap" },
  { id: "ratios", label: "Measuring body ratios", weight: 1.1, region: "body", layer: "heatmap" },
  { id: "compare", label: "Comparing against breed database", weight: 1.4, layer: "rank" },
  { id: "rank", label: "Ranking possible breeds", weight: 1.1, layer: "rank" },
  { id: "confidence", label: "Calculating confidence", weight: 1, layer: "rank" },
  { id: "report", label: "Preparing report", weight: 1, layer: "rank" },
];

/** total ms the staged sequence should take (mock) */
export const ANALYSIS_DURATION_MS = 6400;
