"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const features = [
  {
    tag: "Categories",
    title: "Ten categories, built in",
    body: "Hotels, flights, groceries, bills, restaurants, and more — every expense has a home from the first entry.",
  },
  {
    tag: "Totals",
    title: "A running total that never lags",
    body: "The dashboard total updates the instant you save an entry — no end-of-month reconciliation required.",
  },
  {
    tag: "Breakdown",
    title: "See where the money actually goes",
    body: "A live category breakdown shows spend by type, so patterns show up before the bill does.",
  },
  {
    tag: "History",
    title: "Every entry, easy to find",
    body: "Filter and scan your full expense history instead of scrolling through a bank statement.",
  },
  {
    tag: "Local-first",
    title: "Your data stays on your device",
    body: "Entries save straight to your browser — nothing to sync, no account required to try it.",
  },
];

export function FeatureScroll() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced || typeof window === "undefined" || window.innerWidth < 768) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: runwayRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 0.6,
          pin: true,
        },
      });
    }, runwayRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="capabilities" aria-label="Capabilities" ref={runwayRef} className="relative">
      <div className="px-6 pt-section md:px-10">
        <p className="text-sm text-muted">Capabilities</p>
        <h2 className="mt-3 font-display text-display-2">
          Built for how people actually track spend.
        </h2>
      </div>
      <div className="mt-14 overflow-hidden pb-section md:overflow-visible">
        <div
          ref={trackRef}
          className="flex w-max gap-6 px-6 md:px-10 overflow-x-auto md:overflow-visible no-scrollbar"
        >
          {features.map((feature) => (
            <Card key={feature.title} className="w-[300px] shrink-0 md:w-[340px]">
              <Badge>{feature.tag}</Badge>
              <h3 className="mt-4 text-h2 font-display">{feature.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                {feature.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
