import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "accent" | "positive";
};

const tones = {
  neutral: "bg-surface text-muted border-line",
  accent: "bg-accent/10 text-accent border-accent/20",
  positive: "bg-positive/10 text-positive border-positive/20",
};

/** Small status/category label. Sentence case, never all-caps. */
export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
