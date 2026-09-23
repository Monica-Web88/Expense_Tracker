import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, id, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full rounded border border-line bg-bg px-3.5 py-2.5 text-[0.95rem] text-fg placeholder:text-muted transition-colors duration-300 focus:border-accent",
          className
        )}
        {...props}
      />
    </div>
  );
}
