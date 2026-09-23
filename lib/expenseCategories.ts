export type ExpenseCategoryId =
  | "hotels"
  | "flights"
  | "groceries"
  | "utility-bills"
  | "restaurant"
  | "phone-bill"
  | "transportation"
  | "office-supplies"
  | "entertainment"
  | "medical"
  | "others";

export type ExpenseCategory = {
  id: ExpenseCategoryId;
  label: string;
  icon: string;
  /** Tailwind color token this category's chip/bar uses — alternates blue/pink. */
  tone: "accent" | "magenta";
};

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { id: "hotels", label: "Hotels", icon: "🏨", tone: "accent" },
  { id: "flights", label: "Flights", icon: "✈️", tone: "magenta" },
  { id: "groceries", label: "Groceries", icon: "🛒", tone: "accent" },
  { id: "utility-bills", label: "Utility bills", icon: "💡", tone: "magenta" },
  { id: "restaurant", label: "Restaurant", icon: "🍽️", tone: "accent" },
  { id: "phone-bill", label: "Phone bill", icon: "📱", tone: "magenta" },
  { id: "transportation", label: "Transportation", icon: "🚕", tone: "accent" },
  { id: "office-supplies", label: "Office supplies", icon: "🖇️", tone: "magenta" },
  { id: "entertainment", label: "Entertainment", icon: "🎬", tone: "accent" },
  { id: "medical", label: "Medical", icon: "💊", tone: "magenta" },
  { id: "others", label: "Others", icon: "🧾", tone: "accent" },
];

export function getCategory(id: ExpenseCategoryId): ExpenseCategory {
  return EXPENSE_CATEGORIES.find((c) => c.id === id) ?? EXPENSE_CATEGORIES[0];
}
