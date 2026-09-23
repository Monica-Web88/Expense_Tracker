"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TimelineStep } from "@/components/ui/TimelineStep";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const steps = [
  {
    title: "Pick a category",
    description:
      "Choose from ten built-in categories — hotels, flights, groceries, bills, and more — no free-text guessing at what bucket it belongs in.",
  },
  {
    title: "Enter the amount",
    description:
      "Add the amount, merchant, and date. It's saved instantly and shows up in your running total right away.",
  },
  {
    title: "See it reflected",
    description:
      "Your dashboard updates immediately — total spend, category breakdown, and full history, always current.",
  },
];

function StepIcon({ step }: { step: number }) {
  if (step === 0) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className="h-24 w-24">
        <rect x="20" y="30" width="80" height="60" rx="8" stroke="currentColor" strokeWidth="3" />
        <path d="M20 46H100" stroke="currentColor" strokeWidth="3" />
        <path d="M40 62L52 74L80 46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (step === 1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className="h-24 w-24">
        <rect x="24" y="24" width="72" height="72" rx="10" stroke="currentColor" strokeWidth="3" />
        <path d="M60 42V78M42 60H78" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 120" fill="none" className="h-24 w-24">
      <path d="M24 90V54L48 30L96 78V90H24Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M60 66V90" stroke="currentColor" strokeWidth="3" />
      <circle cx="60" cy="54" r="4" fill="currentColor" />
    </svg>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const triggers = steps.map((_, i) =>
        ScrollTrigger.create({
          trigger: `#step-${i}`,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        })
      );
      return () => triggers.forEach((t) => t.kill());
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (reduced || !iconRef.current) return;
    gsap.fromTo(
      iconRef.current,
      { opacity: 0, scale: 0.85, rotate: -6 },
      { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: "back.out(1.6)" }
    );
  }, [active, reduced]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="mx-auto max-w-content px-6 py-section md:px-10"
    >
      <div className="max-w-xl">
        <p className="text-sm text-muted">How it works</p>
        <h2 className="mt-3 font-display text-display-2">
          Three steps. Ten categories. Zero spreadsheets.
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_360px]">
        <div>
          {steps.map((step, i) => (
            <div id={`step-${i}`} key={step.title}>
              <TimelineStep
                index={i + 1}
                title={step.title}
                description={step.description}
                active={active === i}
              />
            </div>
          ))}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-32 flex h-64 items-center justify-center rounded-lg border border-line bg-surface text-accent">
            <div ref={iconRef}>
              <StepIcon step={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
