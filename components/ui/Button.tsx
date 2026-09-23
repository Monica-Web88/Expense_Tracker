import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
};

const variants = {
  primary: "bg-fg text-bg hover:opacity-85",
  secondary: "bg-transparent text-fg border border-line hover:border-fg",
  ghost: "bg-transparent text-fg hover:bg-surface",
};

const sizes = {
  sm: "text-sm px-4 py-2",
  md: "text-[0.95rem] px-5 py-3",
};

/** Primary interactive control. One radius, one motion curve, three variants. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded font-medium transition-all duration-300 ease-soft disabled:opacity-40 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
