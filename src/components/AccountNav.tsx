"use client";

import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS: { href: string; key: string; exact?: boolean }[] = [
  { href: "/account", key: "dashboard", exact: true },
  { href: "/account/profile", key: "profile" },
  { href: "/account/sim", key: "SIM" },
  { href: "/account/usage", key: "usage" },
  { href: "/account/recharge", key: "recharge" },
  { href: "/account/bills", key: "bills" },
  { href: "/account/plans", key: "plans" },
  { href: "/account/complaints", key: "complaints" },
];

export function AccountNav() {
  const { language } = useDemo();
  const pathname = usePathname();

  return (
    <nav className="mb-6 flex gap-2 overflow-x-auto pb-1">
      {LINKS.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href);
        const label = link.key === "SIM" ? "SIM" : t(language, link.key);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold ${
              active ? "bg-[var(--ink)] text-[var(--sand)]" : "bg-[var(--stone)] text-[var(--ink)]"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
