"use client";

import { useCallback, useRef, useState } from "react";
import { analyzeImage, type AnalyzeResult } from "@/lib/ai";
import type { AnalysisStep } from "@/lib/data/analysis-steps";

export type AnalysisPhase = "idle" | "preview" | "analyzing" | "result" | "error";

export interface AnalysisState {
  phase: AnalysisPhase;
  imageUrl: string | null;
  fileName: string | null;
  progress: number;
  stepIndex: number;
  step: AnalysisStep | null;
  result: AnalyzeResult | null;
  error: string | null;
}

const initial: AnalysisState = {
  phase: "idle",
  imageUrl: null,
  fileName: null,
  progress: 0,
  stepIndex: 0,
  step: null,
  result: null,
  error: null,
};

export function useAnalysis() {
  const [state, setState] = useState<AnalysisState>(initial);
  const abortRef = useRef<AbortController | null>(null);

  const setImage = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setState({ ...initial, phase: "preview", imageUrl: url, fileName: file.name });
  }, []);

  const clearImage = useCallback(() => {
    abortRef.current?.abort();
    setState((s) => {
      if (s.imageUrl) URL.revokeObjectURL(s.imageUrl);
      return initial;
    });
  }, []);

  const start = useCallback(async () => {
    setState((s) => {
      if (!s.imageUrl) return s;
      return { ...s, phase: "analyzing", progress: 0, stepIndex: 0, error: null };
    });

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const imageKey = `${stateRef.current.imageUrl ?? ""}`;
      const result = await analyzeImage(
        { imageKey, fileName: stateRef.current.fileName ?? undefined },
        {
          signal: controller.signal,
          onStep: (step, index) => setState((s) => ({ ...s, step, stepIndex: index })),
          onProgress: (progress) => setState((s) => ({ ...s, progress })),
        },
      );
      setState((s) => ({ ...s, phase: "result", result, progress: 1 }));
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setState((s) => ({ ...s, phase: "error", error: "Analysis failed. Please try again." }));
    }
  }, []);

  // keep a ref mirror so `start` reads the latest image without re-creating itself
  const stateRef = useRef(state);
  stateRef.current = state;

  const reset = useCallback(() => clearImage(), [clearImage]);

  return { state, setImage, clearImage, start, reset };
}
