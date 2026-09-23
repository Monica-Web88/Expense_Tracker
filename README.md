# Expense Tracker

A scroll-driven marketing page in front of a genuinely working expense
dashboard — built as a portfolio piece. Blue and pink on a white base
(with a dark mode toggle), a documented component library, and a real
add-an-expense flow with ten built-in categories.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · GSAP +
ScrollTrigger · deployed on Vercel.

## Live Deployed App
https://expense-tracker-monica.vercel.app/

## Getting started

```bash
npm install
npm run dev
```

- [http://localhost:3000](http://localhost:3000) — opens directly to the working expense tracker (Add Expenses)
- [http://localhost:3000/home](http://localhost:3000/home) — the scroll-driven marketing story page
- [http://localhost:3000/components](http://localhost:3000/components) — the component library showcase

```bash
npm run build   # production build
npm run start   # serve the production build
```

## The working dashboard

`/` (the default page on load) is a real app, not a mockup:

- **Add an expense** — pick from ten categories (Hotels, Flights, Groceries,
  Utility bills, Restaurant, Phone bill, Transportation, Office supplies,
  Entertainment, Medical), enter an amount, merchant, and date.
- **Live totals** — total tracked, this month's total, and largest single
  expense update immediately on add or delete.
- **Category breakdown** — a live bar chart of spend by category.
- **History** — every entry, newest first, with delete.
- **Persistence** — entries save to `localStorage`, so the list survives a
  reload. Nothing is sent to a server, and no account is required.

## What's on the marketing page

- **Pinned hero** — headline and copy cross-fade through three beats while a
  product mockup stays pinned in view.
- **Scroll-synced counters** — results section numbers count up as they
  enter the viewport.
- **Morphing step visuals** — the three-step flow swaps an icon in and out
  (crossfade + scale + rotate) as the active step changes.
- **Horizontal scroll-jacked row** — the capabilities section turns vertical
  scroll into horizontal movement across a shelf of cards.
- **Parallax depth** — two soft background shapes drift at a different speed
  than the foreground behind the case-study section.
- **Scroll-progress UI** — a thin top progress bar plus a side dot-nav.

## Component library

`/components` renders the primitives everything is built from, in isolation:
`Button`, `Badge`, `Card`, `StatCard`, `TimelineStep`, `Select`, and `Input`,
plus the color tokens they draw from.

```
app/
  page.tsx                the working expense tracker (default route)
  home/page.tsx           the scroll-driven marketing story page
  components/page.tsx     component showcase
  layout.tsx, globals.css
components/
  ui/                Button, Badge, Card, StatCard, TimelineStep, Select, Input
  sections/          Hero, Stats, HowItWorks, FeatureScroll, CaseStudy, Footer
  dashboard/         ExpenseForm, ExpenseList, CategoryBreakdown
  providers/         ThemeProvider (light/dark)
  Nav.tsx, ScrollProgress.tsx, ThemeToggle.tsx
hooks/
  useExpenses.ts     localStorage-backed expense state
  useReducedMotion.ts
lib/
  expenseCategories.ts   the 10 category definitions
  utils.ts               cn() class-merge helper
```

## Design tokens

Every color is a CSS custom property in `app/globals.css`:

- `--color-bg` / `--color-surface` / `--color-fg` / `--color-muted` / `--color-line`
- `--color-accent` — primary blue
- `--color-magenta` — secondary pink, used sparingly (this-month total,
  largest-expense card, category bars) so it reads as an accent, not a second
  primary color
- White background and blue-as-primary is the **default** light theme;
  toggling dark mode swaps every token at once via a `.dark` class on `<html>`

Type scale, spacing, and radius are likewise defined once in
`tailwind.config.ts` instead of repeated per component.

## Accessibility & performance

- Every scroll animation checks `prefers-reduced-motion` and falls back to a
  static, fully-visible layout.
- Pinned and scroll-jacked sections are desktop-only; mobile gets normal
  stacked sections.
- The category picker is a real `<select>`, not a custom listbox — full
  keyboard and screen-reader support for free.
- Visible focus rings (`:focus-visible`) throughout.
- Fonts load via `next/font`, self-hosted with no layout shift.

## Before publishing

- [ ] Replace the placeholder GitHub link in `Nav.tsx` with your real repo URL.
- [ ] Record a 20–30s screen capture of the scroll experience *and* the
      dashboard in action for your portfolio listing / GitHub README.
- [ ] Point a custom domain at the Vercel deployment.
- [ ] Run a Lighthouse pass after deploying.
