"use client";

import { useState } from "react";
import { Check, Copy, Download, Link2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { generateShareCard, downloadDataUrl, type ShareCardData } from "@/lib/share";
import { useApp } from "@/components/layout/Providers";

interface ShareActionsProps {
  data: ShareCardData;
  onReset: () => void;
}

export function ShareActions({ data, onReset }: ShareActionsProps) {
  const { cue } = useApp();
  const [copied, setCopied] = useState<"link" | "summary" | null>(null);
  const [busy, setBusy] = useState(false);

  const copy = async (kind: "link" | "summary") => {
    const text =
      kind === "link"
        ? typeof window !== "undefined"
          ? window.location.href
          : ""
        : `HorseVision identified this horse as a ${data.breedName} (${Math.round(
            data.confidence,
          )}% confidence) — a ${data.type} from ${data.origin}.`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      cue("click");
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* ignore */
    }
  };

  const download = async () => {
    setBusy(true);
    try {
      const url = await generateShareCard(data);
      downloadDataUrl(url, `horsevision-${data.breedName.toLowerCase().replace(/\s+/g, "-")}.png`);
      cue("success");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button onClick={download} disabled={busy}>
        {busy ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        Download share card
      </Button>
      <Button variant="secondary" onClick={() => copy("link")}>
        {copied === "link" ? <Check className="h-4 w-4 text-sage" /> : <Link2 className="h-4 w-4" />}
        Copy link
      </Button>
      <Button variant="secondary" onClick={() => copy("summary")}>
        {copied === "summary" ? <Check className="h-4 w-4 text-sage" /> : <Copy className="h-4 w-4" />}
        Copy summary
      </Button>
      <Button variant="ghost" onClick={onReset}>
        <RefreshCw className="h-4 w-4" /> Try another
      </Button>
    </div>
  );
}
