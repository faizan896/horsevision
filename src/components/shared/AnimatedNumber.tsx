"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedNumber({ value, suffix = "", decimals = 0, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const current = useCountUp(value, inView);

  return (
    <span ref={ref} className={cn("tabular", className)}>
      {current.toFixed(decimals)}
      {suffix}
    </span>
  );
}
