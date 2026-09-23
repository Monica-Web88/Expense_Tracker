import { Nav } from "@/components/Nav";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { TimelineStep } from "@/components/ui/TimelineStep";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { EXPENSE_CATEGORIES } from "@/lib/expenseCategories";

const tokens = [
  { name: "bg", desc: "Page background" },
  { name: "surface", desc: "Card / raised surface" },
  { name: "fg", desc: "Primary text" },
  { name: "muted", desc: "Secondary text" },
  { name: "line", desc: "Hairline borders" },
  { name: "accent", desc: "Primary interactive (blue)" },
  { name: "magenta", desc: "Secondary accent (pink)" },
];

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-14">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">
        <div>
          <h2 className="font-display text-h2">{title}</h2>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            {description}
          </p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function ComponentsPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-content px-6 pb-section pt-32 md:px-10">
        <p className="text-sm text-muted">Component library</p>
        <h1 className="mt-3 font-display text-display-2">
          The set Expense Tracker is built from.
        </h1>
        <p className="mt-5 max-w-prose text-[1.05rem] leading-relaxed text-muted">
          Every surface on the marketing page and the dashboard — the hero
          mockup, the stat grid, the expense form, the category dropdown —
          is assembled from this same small set of primitives, sharing one
          spacing, radius, and color scale defined in{" "}
          <code className="rounded bg-surface px-1.5 py-0.5 text-[0.85em]">
            tailwind.config.ts
          </code>
          .
        </p>

        <Section
          title="Color tokens"
          description="CSS custom properties swapped wholesale by the dark-mode toggle. Components never reference a raw hex value."
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {tokens.map((t) => (
              <div key={t.name} className="flex flex-col gap-2">
                <div
                  className="h-16 w-full rounded border border-line"
                  style={{ backgroundColor: `rgb(var(--color-${t.name}))` }}
                />
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Button"
          description="Three variants, two sizes. One radius and one easing curve across all of them."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </Section>

        <Section
          title="Badge"
          description="Status and category labels. Sentence case only — no tracked-out caps."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="accent">Accent</Badge>
            <Badge tone="positive">Positive</Badge>
          </div>
        </Section>

        <Section
          title="Card"
          description="The base grouping surface. Separation comes from the hairline border, never a drop shadow."
        >
          <div className="grid max-w-sm grid-cols-1 gap-4">
            <Card>
              <p className="text-sm font-medium">Card title</p>
              <p className="mt-1 text-sm text-muted">
                Supporting copy sits inside the same padding scale used
                everywhere else.
              </p>
            </Card>
          </div>
        </Section>

        <Section
          title="StatCard"
          description="Large number with a supporting label. Powers the scroll-synced counters on the story page."
        >
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <StatCard value="99.2%" label="Categorization accuracy" />
            <StatCard value="$2.4M" label="Spend reconciled / month" />
          </div>
        </Section>

        <Section
          title="Select"
          description="Native <select>, styled to match — full keyboard and screen-reader behavior for free. Powers the category dropdown on the dashboard."
        >
          <div className="max-w-xs">
            <Select id="showcase-category" label="Category">
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.label}
                </option>
              ))}
            </Select>
          </div>
        </Section>

        <Section
          title="Input"
          description="Text, number, and date fields share one border, radius, and focus state."
        >
          <div className="grid max-w-md grid-cols-2 gap-4">
            <Input id="showcase-amount" label="Amount" type="number" placeholder="0.00" />
            <Input id="showcase-date" label="Date" type="date" />
          </div>
        </Section>

        <Section
          title="TimelineStep"
          description="One entry in a genuine numbered sequence — used for the how-it-works process, not decoration."
        >
          <div className="max-w-md">
            <TimelineStep
              index={1}
              title="Capture"
              description="Every transaction streams in the moment it's authorized."
              active
            />
            <TimelineStep
              index={2}
              title="Classify"
              description="Category and budget match resolve in under three seconds."
            />
          </div>
        </Section>
      </main>
    </>
  );
}
