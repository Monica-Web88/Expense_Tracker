"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/Badge";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const phases = [
  {
    kicker: "The problem",
    headline: "Receipts pile up. Spreadsheets fall behind.",
    copy: "Hotel folios, flight confirmations, lunch receipts — tracked by hand, they're always a week behind what actually happened.",
  },
  {
    kicker: "The shift",
    headline: "Log an expense in one dropdown, from any device.",
    copy: "Pick a category, enter the amount, and it's categorized, totaled, and ready to report — no spreadsheet required.",
  },
  {
    kicker: "The outcome",
    headline: "A running total that's always already up to date.",
    copy: "Every trip, bill, and meal rolls into one dashboard the moment it happens, not the moment you remember to log it.",
  },
];

export function Hero() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    setIsDesktop(query.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  const showPinnedStory = isDesktop && !reduced;

  useLayoutEffect(() => {
    if (!showPinnedStory) {
      setActivePhase(0);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // A single ScrollTrigger maps scroll progress straight to one active
      // phase index — exactly one phase is ever visible at a time, so
      // there's no window where two crossfading phases show through each
      // other (the "ghosting" a scrubbed tween crossfade can produce).
      ScrollTrigger.create({
        trigger: runwayRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".hero-pin",
        onUpdate: (self) => {
          const index = Math.min(
            phases.length - 1,
            Math.floor(self.progress * phases.length)
          );
          setActivePhase((prev) => (prev === index ? prev : index));
        },
      });
    }, runwayRef);

    return () => ctx.revert();
  }, [showPinnedStory]);

  const mockRows = [
    { icon: "🏨", name: "Marriott · 2 nights", tag: "Hotels", amount: "$412.00" },
    { icon: "✈️", name: "Delta · Flight 2210", tag: "Flights", amount: "$612.40" },
    { icon: "🍽️", name: "Olive Garden", tag: "Restaurant", amount: "$58.20" },
  ];

  return (
    <section id="hero" aria-label="Introduction">
      <div ref={runwayRef} className="pin-runway relative">
        <div className="hero-pin flex min-h-screen flex-col justify-center gap-14 px-6 pt-24 md:h-screen md:px-10 md:pt-16 lg:flex-row lg:items-center lg:gap-10">
          {/* Text column */}
          <div className="relative flex-1 md:max-w-xl">
            <Badge tone="accent">Expense tracking, simplified</Badge>
            <div className="relative mt-6 min-h-[360px] sm:min-h-[320px] md:min-h-[280px]">
              {phases.map((phase, i) => {
                const isActive = showPinnedStory ? i === activePhase : i === 0;
                return (
                  <div
                    key={phase.headline}
                    className={cn(
                      "transition-all duration-300 ease-soft",
                      showPinnedStory
                        ? "absolute inset-0"
                        : i === 0
                          ? "static"
                          : "absolute inset-0",
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "pointer-events-none opacity-0 translate-y-2"
                    )}
                    aria-hidden={!isActive}
                  >
                    <p className="text-sm text-muted">{phase.kicker}</p>
                    <h1 className="mt-3 font-display text-display-2">
                      {phase.headline}
                    </h1>
                    <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-muted">
                      {phase.copy}
                    </p>
                  </div>
                );
              })}
            </div>
            <a
              href="/"
              className="mt-14 inline-flex items-center gap-2 rounded-pill brand-gradient px-6 py-3 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90"
            >
              Add your first expense
            </a>
          </div>

          {/* Mockup column */}
          <div className="flex flex-1 items-center justify-center">
            <div
              ref={mockupRef}
              className="w-full max-w-sm rounded-xl border border-line bg-surface p-5"
            >
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="text-sm font-medium">Recent expenses</span>
                <Badge tone="accent">This month</Badge>
              </div>
              <ul className="mt-4 flex flex-col gap-3">
                {mockRows.map((row) => (
                  <li
                    key={row.name}
                    className="flex items-center justify-between rounded-md border border-line px-3 py-2.5 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span aria-hidden="true">{row.icon}</span>
                      <div className="flex flex-col">
                        <span className="font-medium">{row.name}</span>
                        <span className="text-xs text-muted">{row.tag}</span>
                      </div>
                    </div>
                    <span className="tabular-nums">{row.amount}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between rounded-md brand-gradient px-3 py-2.5 text-sm font-medium text-white">
                <span>Total this month</span>
                <span className="tabular-nums">$1,082.60</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
