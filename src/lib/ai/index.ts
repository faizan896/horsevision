import { ANALYSIS_DURATION_MS, ANALYSIS_STEPS, type AnalysisStep } from "@/lib/data/analysis-steps";
import { mockProvider } from "./providers/mock";
import { openaiProvider } from "./providers/openai";
import type { AIProvider, AnalyzeInput, AnalyzeResult } from "./types";

const PROVIDERS: Record<string, AIProvider> = {
  mock: mockProvider,
  openai: openaiProvider,
};

/** Selects the active provider from env, defaulting to the deterministic mock. */
export function getProvider(): AIProvider {
  const id = process.env.NEXT_PUBLIC_AI_PROVIDER ?? "mock";
  return PROVIDERS[id] ?? mockProvider;
}

export interface AnalyzeOptions {
  onStep?: (step: AnalysisStep, index: number, total: number) => void;
  onProgress?: (progress: number) => void;
  /** override total animation time (ms) */
  durationMs?: number;
  signal?: AbortSignal;
}

const wait = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(t);
      reject(new DOMException("aborted", "AbortError"));
    });
  });

/**
 * Drives the staged analysis animation while the provider does its work, then
 * returns the result. The UI subscribes via callbacks and never talks to a
 * provider directly.
 */
export async function analyzeImage(
  input: AnalyzeInput,
  options: AnalyzeOptions = {},
): Promise<AnalyzeResult> {
  const { onStep, onProgress, signal } = options;
  const total = options.durationMs ?? ANALYSIS_DURATION_MS;
  const weightSum = ANALYSIS_STEPS.reduce((acc, s) => acc + s.weight, 0);

  const provider = getProvider();
  const resultPromise = provider.analyze(input);

  let elapsed = 0;
  for (let i = 0; i < ANALYSIS_STEPS.length; i += 1) {
    const step = ANALYSIS_STEPS[i];
    onStep?.(step, i, ANALYSIS_STEPS.length);
    const stepMs = (step.weight / weightSum) * total;

    const chunks = 6;
    for (let c = 0; c < chunks; c += 1) {
      await wait(stepMs / chunks, signal);
      elapsed += stepMs / chunks;
      onProgress?.(Math.min(0.99, elapsed / total));
    }
  }

  onProgress?.(1);
  return resultPromise;
}

export type { AnalyzeResult, AnalyzeInput } from "./types";
