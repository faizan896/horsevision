"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Dropzone } from "@/components/analyze/Dropzone";
import { ImagePreview } from "@/components/analyze/ImagePreview";
import { AnalysisStage } from "@/components/analyze/AnalysisStage";
import { ResultView } from "@/components/result/ResultView";
import { Button } from "@/components/ui/Button";
import { useAnalysis } from "@/lib/hooks/useAnalysis";

export default function AnalyzePage() {
  const { state, setImage, clearImage, start, reset } = useAnalysis();

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[680px] -translate-x-1/2 rounded-full bg-[var(--ember)]/8 blur-[120px]" />

      <AnimatePresence mode="wait">
        {(state.phase === "idle" || state.phase === "preview") && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            <Container className="py-14">
              <div className="mx-auto max-w-2xl">
                <div className="mb-8 text-center">
                  <h1 className="font-display text-h1 font-semibold">Identify a horse</h1>
                  <p className="mt-2 text-muted">
                    Upload a photo and watch HorseVision analyze the breed — then see exactly why.
                  </p>
                </div>

                {state.phase === "idle" ? (
                  <Dropzone onFile={setImage} />
                ) : (
                  state.imageUrl && (
                    <ImagePreview
                      imageUrl={state.imageUrl}
                      fileName={state.fileName}
                      onAnalyze={start}
                      onChange={clearImage}
                      onRemove={clearImage}
                    />
                  )
                )}
              </div>
            </Container>
          </motion.div>
        )}

        {state.phase === "analyzing" && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AnalysisStage state={state} />
          </motion.div>
        )}

        {state.phase === "result" && state.result && (
          <motion.div key="result" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <ResultView result={state.result} imageUrl={state.imageUrl} onReset={reset} />
          </motion.div>
        )}

        {state.phase === "error" && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Container className="py-24">
              <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--ember)]/15 text-ember">
                  <AlertTriangle className="h-6 w-6" />
                </span>
                <h2 className="font-display text-h2 font-semibold">Something went wrong</h2>
                <p className="text-muted">{state.error}</p>
                <Button onClick={reset}>Start over</Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
