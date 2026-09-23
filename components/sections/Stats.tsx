"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const stats = [
  { end: 12, prefix: "", suffix: "s", decimals: 0, label: "Average time to log one expense", accent: "accent" as const },
  { end: 2100, prefix: "$", suffix: "", decimals: 0, label: "Average tracked per user, per month", accent: "magenta" as const },
  { end: 6, prefix: "", suffix: " hrs", decimals: 0, label: "Time saved vs. spreadsheets, monthly", accent: "accent" as const },
  { end: 98.4, prefix: "", suffix: "%", decimals: 1, label: "Expenses categorized correctly on entry", accent: "magenta" as const },
];

export function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      stats.forEach((stat, i) => {
        const el = valueRefs.current[i];
        if (!el) return;

        if (reduced) {
          el.textContent = `${stat.prefix}${stat.end.toFixed(stat.decimals)}${stat.suffix}`;
          return;
        }

        const counter = { value: 0 };
        gsap.to(counter, {
          value: stat.end,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            el.textContent = `${stat.prefix}${counter.value.toFixed(stat.decimals)}${stat.suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="results"
      ref={sectionRef}
      className="mx-auto max-w-content px-6 py-section md:px-10"
    >
      <div className="max-w-xl">
        <p className="text-sm text-muted">Results</p>
        <h2 className="mt-3 font-display text-display-2">
          What changes when logging an expense takes seconds.
        </h2>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              "border-t-2 pt-6",
              stat.accent === "accent" ? "border-accent" : "border-magenta"
            )}
          >
            <span
              ref={(el) => {
                valueRefs.current[i] = el;
              }}
              className="block font-display text-stat tabular-nums"
            >
              {stat.prefix}0{stat.suffix}
            </span>
            <span className="mt-2 block text-[0.95rem] text-muted">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
