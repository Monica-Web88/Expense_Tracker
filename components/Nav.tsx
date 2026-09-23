"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const tabs = [
  { href: "/home", label: "Home" },
  { href: "/", label: "Add Expenses" },
  { href: "/components", label: "Component Library" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-line bg-bg/80 px-6 py-5 backdrop-blur-md md:px-10">
      <Link href="/home" className="flex items-center gap-2 font-display text-lg tracking-tight">
        <span className="h-2.5 w-2.5 rounded-full brand-gradient" aria-hidden="true" />
        Expense Tracker
      </Link>
      <div className="flex items-center gap-3">
        <nav aria-label="Primary" className="hidden items-center gap-1 rounded-pill border border-line p-1 md:flex">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-pill px-4 py-2 text-sm font-medium transition-colors duration-300",
                  isActive
                    ? "bg-fg text-bg"
                    : "text-muted hover:text-fg"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
