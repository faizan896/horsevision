"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors select-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-amber text-[#fcfbf8] hover:brightness-110",
  secondary: "bg-surface-2 text-text border border-border hover:bg-surface",
  ghost: "text-muted hover:text-text hover:bg-surface-2",
  outline: "border border-border text-text hover:border-amber hover:text-amber",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, children, ...props },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={spring}
      className={cn(base, variants[variant], sizes[size], "rounded-[999px]", className)}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
});

interface LinkButtonProps extends CommonProps {
  href: string;
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: LinkButtonProps) {
  return (
    <Link href={href} className="inline-block">
      <motion.span
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={spring}
        className={cn(base, variants[variant], sizes[size], "rounded-[999px]", className)}
      >
        {children}
      </motion.span>
    </Link>
  );
}
