"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Compass, GitCompare, Heart, MapPin, ScanLine, Search } from "lucide-react";
import { getAllBreeds } from "@/lib/data/breeds";
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const PAGES = [
  { label: "Identify a horse", href: "/analyze", icon: ScanLine },
  { label: "Breed explorer", href: "/breeds", icon: Compass },
  { label: "Compare breeds", href: "/compare", icon: GitCompare },
  { label: "World map", href: "/map", icon: MapPin },
  { label: "Favorites", href: "/favorites", icon: Heart },
];

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const breeds = useMemo(() => getAllBreeds(), []);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pages = PAGES.filter((p) => p.label.toLowerCase().includes(q));
    const matched = q
      ? breeds.filter(
          (b) => b.name.toLowerCase().includes(q) || b.type.toLowerCase().includes(q),
        )
      : breeds.slice(0, 5);
    return { pages: q ? pages : PAGES, breeds: matched };
  }, [query, breeds]);

  const go = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Close search"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="glass relative w-full max-w-xl overflow-hidden rounded-lg border border-border shadow-soft"
          >
            <div className="flex items-center gap-3 border-b border-border px-5">
              <Search className="h-5 w-5 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search breeds and pages…"
                className="h-14 flex-1 bg-transparent text-text outline-none placeholder:text-muted"
              />
              <kbd className="rounded-md border border-border px-2 py-1 text-xs text-muted">esc</kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              <Group label="Pages">
                {results.pages.map((p) => (
                  <Row key={p.href} icon={<p.icon className="h-4 w-4" />} onClick={() => go(p.href)}>
                    {p.label}
                  </Row>
                ))}
              </Group>

              {results.breeds.length > 0 && (
                <Group label="Breeds">
                  {results.breeds.map((b) => (
                    <Row
                      key={b.slug}
                      icon={
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ background: b.accent }}
                        />
                      }
                      onClick={() => go(`/breeds/${b.slug}`)}
                    >
                      <span>{b.name}</span>
                      <span className="ml-2 text-xs text-muted">{b.type}</span>
                    </Row>
                  ))}
                </Group>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-1">
      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
      {children}
    </div>
  );
}

function Row({
  icon,
  children,
  onClick,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-text",
        "transition-colors hover:bg-surface-2",
      )}
    >
      <span className="grid h-7 w-7 place-items-center rounded-md bg-surface text-amber">{icon}</span>
      <span className="flex-1">{children}</span>
      <ArrowRight className="h-4 w-4 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}
