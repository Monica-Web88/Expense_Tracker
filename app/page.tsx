"use client";

import { Nav } from "@/components/Nav";
import { ExpenseForm } from "@/components/dashboard/ExpenseForm";
import { ExpenseList } from "@/components/dashboard/ExpenseList";
import { CategoryBreakdown } from "@/components/dashboard/CategoryBreakdown";
import { useExpenses } from "@/hooks/useExpenses";

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function isThisMonth(iso: string) {
  const d = new Date(iso + "T00:00:00");
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

export default function DashboardPage() {
  const { expenses, addExpense, removeExpense, hydrated } = useExpenses();

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const monthTotal = expenses
    .filter((e) => isThisMonth(e.date))
    .reduce((sum, e) => sum + e.amount, 0);
  const largest = expenses.reduce(
    (max, e) => (e.amount > max ? e.amount : max),
    0
  );

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-content px-6 pb-section pt-32 md:px-10">
        <p className="text-sm text-muted">Add Expenses</p>
        <h1 className="mt-3 font-display text-display-2">Your expenses.</h1>
        <p className="mt-4 max-w-prose text-[1.05rem] leading-relaxed text-muted">
          Everything here is real — entries save to your browser&apos;s local
          storage, so your list persists on reload.
        </p>

        {/* Summary cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-line bg-surface p-5">
            <span className="text-sm text-muted">Total tracked</span>
            <span className="mt-1 block font-display text-h1 tabular-nums">
              {formatCurrency(total)}
            </span>
          </div>
          <div className="rounded-lg border-2 border-accent bg-surface p-5">
            <span className="text-sm text-muted">This month</span>
            <span className="mt-1 block font-display text-h1 tabular-nums text-accent">
              {formatCurrency(monthTotal)}
            </span>
          </div>
          <div className="rounded-lg border-2 border-magenta bg-surface p-5">
            <span className="text-sm text-muted">Largest single expense</span>
            <span className="mt-1 block font-display text-h1 tabular-nums text-magenta">
              {formatCurrency(largest)}
            </span>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[380px_1fr]">
          <div className="flex flex-col gap-8">
            <ExpenseForm onAdd={addExpense} />
            <div className="rounded-lg border border-line bg-surface p-6">
              <h3 className="font-display text-h2">By category</h3>
              <div className="mt-5">
                <CategoryBreakdown expenses={expenses} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display text-h2">History</h3>
            <div className="mt-5">
              {hydrated ? (
                <ExpenseList expenses={expenses} onRemove={removeExpense} />
              ) : (
                <p className="text-sm text-muted">Loading your expenses…</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
