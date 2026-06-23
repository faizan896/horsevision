"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  glass?: boolean;
}

export function Card({ children, className, interactive, glass }: CardProps) {
  return (
    <motion.div
      whileHover={interactive ? { y: -4 } : undefined}
      transition={spring}
      className={cn(
        "rounded-lg border border-border p-6 shadow-soft",
        glass ? "glass" : "bg-surface",
        interactive && "cursor-pointer hover:border-[var(--amber)]/40",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
