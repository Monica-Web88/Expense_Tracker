"use client";

import { Badge } from "@/components/ui/Badge";
import { getCategory } from "@/lib/expenseCategories";
import type { Expense } from "@/hooks/useExpenses";

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ExpenseList({
  expenses,
  onRemove,
}: {
  expenses: Expense[];
  onRemove: (id: string) => void;
}) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line p-10 text-center">
        <p className="text-sm text-muted">
          No expenses yet — add your first one to see it here.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {expenses.map((expense) => {
        const category = getCategory(expense.category);
        return (
          <li
            key={expense.id}
            className="flex items-center justify-between gap-4 rounded-lg border border-line bg-surface px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full text-base"
                style={{
                  backgroundColor:
                    category.tone === "accent"
                      ? "rgb(var(--color-accent) / 0.12)"
                      : "rgb(var(--color-magenta) / 0.12)",
                }}
                aria-hidden="true"
              >
                {category.icon}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{expense.merchant}</span>
                <div className="mt-0.5 flex items-center gap-2">
                  <Badge tone={category.tone === "accent" ? "accent" : "neutral"}>
                    {category.label}
                  </Badge>
                  <span className="text-xs text-muted">{formatDate(expense.date)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="tabular-nums font-medium">{formatCurrency(expense.amount)}</span>
              <button
                onClick={() => onRemove(expense.id)}
                aria-label={`Delete ${expense.merchant}`}
                className="text-muted transition-colors hover:text-magenta"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M4 6H16M8 6V4.5C8 4 8.4 3.5 9 3.5H11C11.6 3.5 12 4 12 4.5V6M6 6L6.6 15C6.65 15.8 7.3 16.5 8.1 16.5H11.9C12.7 16.5 13.35 15.8 13.4 15L14 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
