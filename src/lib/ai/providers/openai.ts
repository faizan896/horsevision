import type { AIProvider, AnalyzeInput, AnalyzeResult } from "../types";

/**
 * STUB — illustrates how a real vision provider slots behind the same interface.
 * Implement `analyze()` by sending the image to the OpenAI Vision API and mapping
 * its structured response onto AnalyzeResult. No UI change is required to switch.
 */
export const openaiProvider: AIProvider = {
  id: "openai",
  async analyze(_input: AnalyzeInput): Promise<AnalyzeResult> {
    throw new Error(
      "openaiProvider is a stub. Add OPENAI_API_KEY and implement analyze() to enable.",
    );
  },
};
