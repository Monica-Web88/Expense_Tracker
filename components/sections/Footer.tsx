import Link from "next/link";

export function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-content px-6 py-section md:px-10">
      <div className="rule pt-14">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-display-2">Built solo, end to end.</h2>
            <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted">
              Design, motion, and the component system underneath it —
              planned, built, and documented by one person.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center justify-center rounded bg-fg px-5 py-3 text-[0.95rem] font-medium text-bg transition-opacity duration-300 ease-soft hover:opacity-85"
            >
              Get in touch
            </a>
            <Link
              href="/components"
              className="inline-flex items-center justify-center rounded border border-line px-5 py-3 text-[0.95rem] font-medium text-fg transition-colors duration-300 ease-soft hover:border-fg"
            >
              View components
            </Link>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-2 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <span>Expense Tracker — a portfolio case study.</span>
          <span>Next.js · Tailwind · GSAP ScrollTrigger</span>
        </div>
      </div>
    </footer>
  );
}
