"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type StoryStop = { id: string; label: string };

export function ScrollProgress({ stops }: { stops: StoryStop[] }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(stops[0]?.id);
  const reduced = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const barTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (!barRef.current) return;
        // Reduced motion: snap instead of relying on the ticker easing.
        gsap.set(barRef.current, { scaleX: self.progress });
      },
    });

    const sectionTriggers = stops.map((stop) =>
      ScrollTrigger.create({
        trigger: `#${stop.id}`,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActive(stop.id);
        },
      })
    );

    return () => {
      barTrigger.kill();
      sectionTriggers.forEach((t) => t.kill());
    };
  }, [stops]);

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-line/60">
        <div
          ref={barRef}
          className="h-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Side dot-nav — hidden on mobile, where the story reads top to bottom */}
      <nav
        aria-label="Story progress"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex"
      >
        {stops.map((stop) => {
          const isActive = stop.id === active;
          return (
            <a
              key={stop.id}
              href={`#${stop.id}`}
              className="group flex items-center gap-3"
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={cn(
                  "text-xs text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap",
                  isActive && "opacity-100 text-fg"
                )}
              >
                {stop.label}
              </span>
              <span
                className={cn(
                  "block h-2 w-2 rounded-full border border-fg/30 transition-all duration-300 ease-soft",
                  isActive ? "scale-125 bg-accent border-accent" : "bg-transparent"
                )}
              />
            </a>
          );
        })}
      </nav>
    </>
  );
}
