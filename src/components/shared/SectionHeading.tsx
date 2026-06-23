import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="label text-amber">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-h2 max-w-2xl text-text">{title}</h2>
      {subtitle && <p className="max-w-xl text-muted">{subtitle}</p>}
    </Reveal>
  );
}
