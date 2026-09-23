import { cn } from "@/lib/utils";

type StatCardProps = {
  value: string;
  label: string;
  detail?: string;
  className?: string;
};

/**
 * Displays one large number with a supporting label. The counting
 * animation itself lives in the section that uses this (see
 * components/sections/Stats.tsx) — this component only renders whatever
 * value it's given, so it stays reusable outside a scroll context too.
 */
export function StatCard({ value, label, detail, className }: StatCardProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="font-display text-stat tabular-nums">{value}</span>
      <span className="text-[0.95rem] text-fg">{label}</span>
      {detail && <span className="text-sm text-muted">{detail}</span>}
    </div>
  );
}
