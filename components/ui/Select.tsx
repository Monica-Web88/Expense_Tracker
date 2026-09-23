import { cn } from "@/lib/utils";
import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

/**
 * A native <select>, styled to match the rest of the library, rather than a
 * custom listbox — keeps full keyboard and screen-reader behavior for free.
 */
export function Select({ label, id, className, children, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={cn(
            "w-full appearance-none rounded border border-line bg-bg px-3.5 py-2.5 pr-9 text-[0.95rem] text-fg transition-colors duration-300 focus:border-accent",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
