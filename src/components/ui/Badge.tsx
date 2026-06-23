import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "amber" | "sage" | "outline";
}

const tones = {
  default: "bg-surface-2 text-muted border border-border",
  amber: "bg-[var(--amber)]/12 text-amber border border-[var(--amber)]/30",
  sage: "bg-[var(--sage)]/12 text-sage border border-[var(--sage)]/30",
  outline: "border border-border text-muted",
};

export function Badge({ children, className, tone = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
