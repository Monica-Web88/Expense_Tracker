import { Badge } from "@/components/ui/Badge";
import { ParallaxField } from "@/components/sections/ParallaxField";

const decisions = [
  {
    q: "Why pin the hero instead of a normal fade-in?",
    a: "The product's whole pitch is speed — a pinned section lets the headline resolve through three short beats while one mockup stays put, so attention never has to jump between a scrolling image and scrolling text.",
  },
  {
    q: "Why GSAP + ScrollTrigger over Framer Motion?",
    a: "Framer's scroll hooks are built around single elements tracking their own progress. This page needed one master timeline — pin, counter, and horizontal track all reading from the same scroll position — which is what ScrollTrigger's timeline model is built for.",
  },
  {
    q: "Why localStorage instead of a backend?",
    a: "The dashboard is a genuinely working demo, not a mockup — entries persist across reloads via localStorage, so it's usable without standing up a database for a portfolio piece.",
  },
  {
    q: "What got cut?",
    a: "An early draft had a scroll-jacked section on every screen. Only one earned it — the capabilities row, where horizontal movement actually matches the content. Everywhere else, restraint reads better than more motion.",
  },
];

export function CaseStudy() {
  return (
    <section id="case-study" className="relative mx-auto max-w-content px-6 py-section md:px-10">
      <ParallaxField />
      <div className="max-w-xl">
        <Badge>Process notes</Badge>
        <h2 className="mt-4 font-display text-display-2">
          The decisions behind the build.
        </h2>
        <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
          Expense Tracker is a portfolio piece: a scroll-driven marketing page
          in front of a genuinely working expense dashboard, built to show
          how a real interactive experience and a maintained component
          system fit together in one codebase.
        </p>
      </div>

      <dl className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
        {decisions.map((item) => (
          <div key={item.q} className="border-t border-line pt-6">
            <dt className="text-[1.05rem] font-medium">{item.q}</dt>
            <dd className="mt-2 text-[0.95rem] leading-relaxed text-muted">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
