"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Clipboard, ImageUp, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropzoneProps {
  onFile: (file: File) => void;
}

const ACCEPT = "image/png,image/jpeg,image/webp,image/avif";

/** Drag & drop, click, paste and camera capture upload surface. */
export function Dropzone({ onFile }: DropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const cameraInput = useRef<HTMLInputElement>(null);

  const handle = useCallback(
    (file?: File | null) => {
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setError("Please choose an image file.");
        return;
      }
      if (file.size > 12 * 1024 * 1024) {
        setError("Image is larger than 12MB.");
        return;
      }
      setError(null);
      onFile(file);
    },
    [onFile],
  );

  // Paste anywhere on the page.
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const item = Array.from(e.clipboardData?.items ?? []).find((i) =>
        i.type.startsWith("image/"),
      );
      if (item) handle(item.getAsFile());
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [handle]);

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handle(e.dataTransfer.files?.[0]);
        }}
        onClick={() => fileInput.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload a horse photo"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") fileInput.current?.click();
        }}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-12 text-center transition-colors",
          dragging
            ? "border-amber bg-[var(--amber)]/8"
            : "border-border bg-surface hover:border-[var(--amber)]/50",
        )}
      >
        <motion.div
          animate={{ y: dragging ? -6 : 0, scale: dragging ? 1.05 : 1 }}
          className="grid h-16 w-16 place-items-center rounded-2xl gradient-ember text-[#1a0f08]"
        >
          <UploadCloud className="h-7 w-7" />
        </motion.div>
        <div>
          <p className="font-display text-lg font-semibold">
            {dragging ? "Drop to analyze" : "Drag & drop a horse photo"}
          </p>
          <p className="mt-1 text-sm text-muted">
            or click to browse · paste from clipboard · use your camera
          </p>
        </div>
        <p className="text-xs text-muted">PNG, JPG, WebP or AVIF · up to 12MB · side-on shot works best</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        <Action icon={<ImageUp className="h-4 w-4" />} label="Browse" onClick={() => fileInput.current?.click()} />
        <Action
          icon={<Camera className="h-4 w-4" />}
          label="Camera"
          onClick={() => cameraInput.current?.click()}
        />
        <Action
          icon={<Clipboard className="h-4 w-4" />}
          label="Paste (⌘V)"
          onClick={async () => {
            try {
              const items = await navigator.clipboard.read();
              for (const item of items) {
                const type = item.types.find((t) => t.startsWith("image/"));
                if (type) handle(new File([await item.getType(type)], "pasted", { type }));
              }
            } catch {
              setError("Clipboard access blocked — press ⌘V instead.");
            }
          }}
        />
      </div>

      {error && <p className="text-sm text-ember">{error}</p>}

      <input
        ref={fileInput}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => handle(e.target.files?.[0])}
      />
      <input
        ref={cameraInput}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handle(e.target.files?.[0])}
      />
    </div>
  );
}

function Action({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-2.5 text-sm text-muted transition-colors hover:text-text hover:border-[var(--amber)]/40"
    >
      {icon}
      {label}
    </button>
  );
}
