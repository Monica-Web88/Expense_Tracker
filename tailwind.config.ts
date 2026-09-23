import type { Config } from "tailwindcss";

/**
 * Expense Tracker design tokens
 * ----------------------
 * Colors are exposed as CSS custom properties (see app/globals.css) so
 * light/dark mode is a token swap, not a duplicated palette. Every color
 * used in the UI should resolve to one of these — no hardcoded hex values
 * in components.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        fg: "rgb(var(--color-fg) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-fg": "rgb(var(--color-accent-fg) / <alpha-value>)",
        magenta: "rgb(var(--color-magenta) / <alpha-value>)",
        "magenta-fg": "rgb(var(--color-magenta-fg) / <alpha-value>)",
        positive: "rgb(var(--color-positive) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid type scale — clamps between mobile and desktop sizes.
        "display-1": ["clamp(2.75rem, 2rem + 3.5vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(2.1rem, 1.6rem + 2.2vw, 3.6rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        h1: ["clamp(1.9rem, 1.6rem + 1.2vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        h2: ["clamp(1.5rem, 1.3rem + 0.8vw, 2rem)", { lineHeight: "1.2" }],
        stat: ["clamp(2.5rem, 1.9rem + 2.6vw, 4.25rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "10px",
        lg: "16px",
        xl: "24px",
        pill: "999px",
      },
      spacing: {
        section: "clamp(4rem, 3rem + 5vw, 8rem)",
      },
      maxWidth: {
        content: "1180px",
        prose: "62ch",
      },
      transitionTimingFunction: {
        pin: "cubic-bezier(0.65, 0, 0.35, 1)",
        soft: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
