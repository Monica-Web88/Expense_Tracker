"use client";

import { useState, type FormEvent } from "react";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { EXPENSE_CATEGORIES, type ExpenseCategoryId } from "@/lib/expenseCategories";
import type { Expense } from "@/hooks/useExpenses";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function ExpenseForm({
  onAdd,
}: {
  onAdd: (expense: Omit<Expense, "id">) => void;
}) {
  const [category, setCategory] = useState<ExpenseCategoryId>(EXPENSE_CATEGORIES[0].id);
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(today());
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const numericAmount = Number(amount);

    if (!merchant.trim()) {
      setError("Add a merchant or description.");
      return;
    }
    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }

    onAdd({ category, merchant: merchant.trim(), amount: numericAmount, date });
    setMerchant("");
    setAmount("");
    setDate(today());
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-6">
      <div>
        <h3 className="font-display text-h2">Add an expense</h3>
        <p className="mt-1 text-sm text-muted">
          Saved instantly and reflected in your totals below.
        </p>
      </div>

      <Select
        id="category"
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value as ExpenseCategoryId)}
      >
        {EXPENSE_CATEGORIES.map((c) => (
          <option key={c.id} value={c.id}>
            {c.icon} {c.label}
          </option>
        ))}
      </Select>

      <Input
        id="merchant"
        label="Merchant / description"
        placeholder="e.g. Marriott, Uber, Trader Joe's"
        value={merchant}
        onChange={(e) => setMerchant(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          id="amount"
          label="Amount"
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          id="date"
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {error && <p className="text-sm text-magenta">{error}</p>}

      <Button type="submit" className="brand-gradient text-white">
        Add expense
      </Button>
    </form>
  );
}
