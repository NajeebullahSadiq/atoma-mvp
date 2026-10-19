"use client";

import { useDemo } from "@/lib/store";
import Link from "next/link";

export default function AdminDashboard() {
  const { tickets, complaints, orders, banners, contentPages, session } = useDemo();

  const cards = [
    { label: "Open tickets", value: tickets.filter((t) => t.status === "Open").length, href: "/admin/moderation" },
    { label: "Complaints", value: complaints.length, href: "/admin/moderation" },
    { label: "Orders", value: orders.length, href: "/shop" },
    { label: "Active banners", value: banners.filter((b) => b.active).length, href: "/admin/banners" },
    { label: "CMS pages", value: contentPages.length, href: "/admin/content" },
    { label: "All tickets", value: tickets.length, href: "/admin/moderation" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Admin dashboard</h1>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">
        Signed in as {session?.mobile} · demo counts from local state
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="panel p-5 transition hover:-translate-y-0.5">
            <p className="text-sm font-semibold text-[var(--ink-soft)]">{c.label}</p>
            <p className="mt-2 font-display text-3xl font-bold">{c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
