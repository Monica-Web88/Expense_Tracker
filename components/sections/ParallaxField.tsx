"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Two soft shapes drifting at different speeds than the foreground content
 * as the page scrolls past. Purely decorative — aria-hidden, and skipped
 * entirely under reduced motion.
 */
export function ParallaxField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const shapeARef = useRef<HTMLDivElement>(null);
  const shapeBRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(shapeARef.current, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: fieldRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(shapeBRef.current, {
        y: 90,
        ease: "none",
        scrollTrigger: {
          trigger: fieldRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, fieldRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={fieldRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        ref={shapeARef}
        className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-accent/[0.06] blur-2xl"
      />
      <div
        ref={shapeBRef}
        className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-accent/[0.05] blur-3xl"
      />
    </div>
  );
}
