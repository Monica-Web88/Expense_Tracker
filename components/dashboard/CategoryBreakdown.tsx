"use client";

import { EXPENSE_CATEGORIES } from "@/lib/expenseCategories";
import type { Expense } from "@/hooks/useExpenses";

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function CategoryBreakdown({ expenses }: { expenses: Expense[] }) {
  const totals = EXPENSE_CATEGORIES.map((category) => ({
    category,
    total: expenses
      .filter((e) => e.category === category.id)
      .reduce((sum, e) => sum + e.amount, 0),
  })).filter((row) => row.total > 0);

  const max = Math.max(...totals.map((row) => row.total), 1);

  if (totals.length === 0) {
    return (
      <p className="text-sm text-muted">
        Add an expense to see your category breakdown.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {totals
        .sort((a, b) => b.total - a.total)
        .map((row) => (
          <div key={row.category.id}>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span aria-hidden="true">{row.category.icon}</span>
                {row.category.label}
              </span>
              <span className="tabular-nums text-muted">{formatCurrency(row.total)}</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-pill bg-line">
              <div
                className="h-full rounded-pill transition-all duration-500 ease-soft"
                style={{
                  width: `${(row.total / max) * 100}%`,
                  backgroundColor:
                    row.category.tone === "accent"
                      ? "rgb(var(--color-accent))"
                      : "rgb(var(--color-magenta))",
                }}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
