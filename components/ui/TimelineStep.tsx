import { cn } from "@/lib/utils";

type TimelineStepProps = {
  index: number;
  title: string;
  description: string;
  active?: boolean;
  className?: string;
};

/**
 * One entry in a numbered sequence. Numbering is used here deliberately —
 * this content is a genuine ordered process (steps 1 → 3), not decoration.
 */
export function TimelineStep({
  index,
  title,
  description,
  active = false,
  className,
}: TimelineStepProps) {
  return (
    <div className={cn("flex gap-5", className)}>
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors duration-300",
            active
              ? "border-accent bg-accent text-accent-fg"
              : "border-line text-muted"
          )}
        >
          {index}
        </span>
        <span className="mt-1 w-px flex-1 bg-line" />
      </div>
      <div className="pb-10">
        <h3 className={cn("text-h2 font-display transition-colors duration-300", active ? "text-fg" : "text-muted")}>
          {title}
        </h3>
        <p className="mt-2 max-w-prose text-[0.95rem] leading-relaxed text-muted">
          {description}
        </p>
      </div>
    </div>
  );
}
