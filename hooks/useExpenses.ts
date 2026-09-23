"use client";

import { useEffect, useState } from "react";
import type { ExpenseCategoryId } from "@/lib/expenseCategories";

export type Expense = {
  id: string;
  category: ExpenseCategoryId;
  merchant: string;
  amount: number;
  date: string; // ISO date (yyyy-mm-dd)
};

const STORAGE_KEY = "expense-tracker:expenses";

/**
 * Expenses persist to localStorage so the dashboard is a genuinely working
 * demo across reloads. Initial state is always an empty array — matching
 * server and client on first render — and localStorage is read in an
 * effect after mount, avoiding any hydration mismatch.
 */
export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setExpenses(JSON.parse(raw));
    } catch {
      // Corrupt or inaccessible storage — start fresh rather than crash.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch {
      // Storage full or unavailable (private browsing) — fail silently.
    }
  }, [expenses, hydrated]);

  const addExpense = (expense: Omit<Expense, "id">) => {
    setExpenses((prev) => [
      { ...expense, id: crypto.randomUUID() },
      ...prev,
    ]);
  };

  const removeExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return { expenses, addExpense, removeExpense, hydrated };
}
