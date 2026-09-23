import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/** Base surface for grouped content. No drop shadow — separation comes from the hairline border. */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-line bg-surface p-6 transition-colors duration-300",
        className
      )}
      {...props}
    />
  );
}
