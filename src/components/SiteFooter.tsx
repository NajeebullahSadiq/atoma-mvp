"use client";

import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import Link from "next/link";

export function SiteFooter() {
  const { language, resetDemo } = useDemo();

  return (
    <footer className="mt-auto border-t border-[rgba(7,59,76,0.1)] bg-[var(--ink)] text-[var(--sand)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-bold">ATOMA</p>
          <p className="mt-2 text-sm text-[rgba(250,246,241,0.75)]">
            Mountain-signal telecom for Afghanistan. Demo UI only.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--amber)]">Explore</p>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/plans">{t(language, "plans")}</Link>
            <Link href="/shop">{t(language, "shop")}</Link>
            <Link href="/coverage">{t(language, "coverage")}</Link>
            <Link href="/stores">{t(language, "stores")}</Link>
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--amber)]">Services</p>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/pay">{t(language, "pay")}</Link>
            <Link href="/vas">{t(language, "vas")}</Link>
            <Link href="/roaming">{t(language, "roaming")}</Link>
            <Link href="/app">{t(language, "app")}</Link>
            <Link href="/finance">{t(language, "finance")}</Link>
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--amber)]">Support</p>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/help">{t(language, "help")}</Link>
            <Link href="/support/tickets">{t(language, "tickets")}</Link>
            <Link href="/account">{t(language, "account")}</Link>
            <Link href="/admin">{t(language, "admin")}</Link>
            <button type="button" onClick={resetDemo} className="text-left text-[var(--amber)]">
              Reset demo data
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60">
        © 2026 ATOMA Demo — not a live telecom service.
      </div>
    </footer>
  );
}
