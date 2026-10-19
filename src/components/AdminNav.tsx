"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS: { href: string; label: string; exact?: boolean }[] = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/banners", label: "Banners" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/moderation", label: "Tickets & Complaints" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <nav className="flex gap-2 overflow-x-auto">
        {LINKS.map((link) => {
          const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold ${
                active ? "bg-[var(--ink)] text-[var(--sand)]" : "bg-[var(--stone)]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <span className="rounded-full bg-[var(--amber)] px-3 py-1 text-xs font-bold text-[var(--ink)]">
        Role: Admin
      </span>
    </div>
  );
}
