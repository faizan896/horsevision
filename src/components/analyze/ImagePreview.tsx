"use client";

import { motion } from "framer-motion";
import { RefreshCw, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ImagePreviewProps {
  imageUrl: string;
  fileName: string | null;
  onAnalyze: () => void;
  onChange: () => void;
  onRemove: () => void;
}

export function ImagePreview({ imageUrl, fileName, onAnalyze, onChange, onRemove }: ImagePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col gap-5"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-black shadow-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={fileName ?? "Selected horse"} className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="truncate text-sm text-white/80">{fileName}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg" onClick={onAnalyze}>
          <Sparkles className="h-4 w-4" /> Analyze breed
        </Button>
        <Button size="lg" variant="secondary" onClick={onChange}>
          <RefreshCw className="h-4 w-4" /> Change
        </Button>
        <Button size="lg" variant="ghost" onClick={onRemove}>
          <Trash2 className="h-4 w-4" /> Remove
        </Button>
      </div>

      <p className="text-sm text-muted">
        Tip: a clear, side-on photo with the whole horse in frame gives the most confident result.
      </p>
    </motion.div>
  );
}
