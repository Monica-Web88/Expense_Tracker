"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="relative flex h-8 w-14 items-center rounded-pill border border-line bg-surface px-1 transition-colors duration-300"
    >
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full bg-fg text-bg transition-transform duration-300 ease-soft"
        style={{ transform: isDark ? "translateX(22px)" : "translateX(0px)" }}
      >
        {isDark ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M21 12.8A9 9 0 1111.2 3a7.2 7.2 0 009.8 9.8z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="4.5" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
            </g>
          </svg>
        )}
      </span>
    </button>
  );
}
