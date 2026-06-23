"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import type { AnalyzeResult } from "@/lib/ai/types";
import { getBreed } from "@/lib/data/breeds";
import { TopMatches } from "./TopMatches";
import { BreedOverview } from "./BreedOverview";
import { ExplainableAI } from "./ExplainableAI";
import { SimilarBreeds } from "./SimilarBreeds";
import { ShareActions } from "./ShareActions";

interface ResultViewProps {
  result: AnalyzeResult;
  imageUrl: string | null;
  onReset: () => void;
}

export function ResultView({ result, imageUrl, onReset }: ResultViewProps) {
  const primary = getBreed(result.topMatches[0].slug);
  if (!primary) return null;
  const confidence = result.topMatches[0].confidence;

  return (
    <Container className="flex flex-col gap-16 py-10">
      {/* hero verdict */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-black shadow-soft">
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt={primary.name} className="h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute left-4 top-4">
            <Badge tone="amber">
              <Sparkles className="h-3.5 w-3.5" /> {result.provider} model
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="label text-amber">
            Most likely breed
          </span>
          <h1 className="font-display text-display font-semibold leading-none">{primary.name}</h1>
          <p className="text-lg text-muted">{primary.tagline}</p>

          <div className="flex items-end gap-4">
            <div>
              <p className="font-display text-6xl font-semibold text-gradient">
                <AnimatedNumber value={confidence} suffix="%" />
              </p>
              <p className="text-sm text-muted">confidence</p>
            </div>
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge>{primary.type}</Badge>
              <Badge>{primary.origin.country}</Badge>
            </div>
          </div>

          <div className="mt-2">
            <ShareActions
              data={{
                breedName: primary.name,
                confidence,
                type: primary.type,
                origin: primary.origin.country,
                imageUrl,
              }}
              onReset={onReset}
            />
          </div>
        </div>
      </motion.section>

      <TopMatches matches={result.topMatches} />
      <ExplainableAI importance={result.regionImportance} notes={result.notes} />
      <BreedOverview breed={primary} />
      <SimilarBreeds breed={primary} />
    </Container>
  );
}
