"use client";

import { LANG_LABELS, t, type Lang } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/plans", key: "plans" },
  { href: "/prepaid", key: "prepaid" },
  { href: "/postpaid", key: "postpaid" },
  { href: "/shop", key: "shop" },
  { href: "/stores", key: "stores" },
  { href: "/coverage", key: "coverage" },
  { href: "/help", key: "help" },
] as const;

export function SiteHeader() {
  const { language, setLanguage, session, logout, profile } = useDemo();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  // Local mount gate avoids parent localStorage hydrate racing ahead of this tree.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const uiLang: Lang = mounted ? language : "en";
  const uiSession = mounted ? session : null;

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(7,59,76,0.08)] bg-[rgba(250,246,241,0.92)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-[var(--ink)]">
          ATOMA
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                pathname.startsWith(item.href)
                  ? "bg-[var(--ink)] text-[var(--sand)]"
                  : "text-[var(--ink-soft)] hover:bg-[var(--stone)]"
              }`}
            >
              {t(uiLang, item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-[rgba(7,59,76,0.12)] p-0.5 text-xs font-bold">
            {(Object.keys(LANG_LABELS) as Lang[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`rounded-full px-2 py-1 ${
                  lang === "fa" || lang === "ps" ? "font-bahij" : ""
                } ${
                  uiLang === lang ? "bg-[var(--amber)] text-[var(--ink)]" : "text-[var(--ink-soft)]"
                }`}
              >
                {LANG_LABELS[lang]}
              </button>
            ))}
          </div>

          {uiSession ? (
            <div className="relative">
              <button
                type="button"
                className="btn btn-ink !px-3 !py-1.5 text-sm"
                onClick={() => setMenu((v) => !v)}
              >
                {profile.name.split(" ")[0]}
              </button>
              {menu ? (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[rgba(7,59,76,0.1)] bg-white p-2 shadow-lg animate-fade-in">
                  <Link
                    href="/account"
                    className="block rounded-lg px-3 py-2 text-sm font-semibold hover:bg-[var(--stone)]"
                    onClick={() => setMenu(false)}
                  >
                    {t(uiLang, "dashboard")}
                  </Link>
                  <Link
                    href="/account/profile"
                    className="block rounded-lg px-3 py-2 text-sm font-semibold hover:bg-[var(--stone)]"
                    onClick={() => setMenu(false)}
                  >
                    {t(uiLang, "profile")}
                  </Link>
                  {uiSession.role === "admin" ? (
                    <Link
                      href="/admin"
                      className="block rounded-lg px-3 py-2 text-sm font-semibold hover:bg-[var(--stone)]"
                      onClick={() => setMenu(false)}
                    >
                      {t(uiLang, "admin")}
                    </Link>
                  ) : null}
                  <button
                    type="button"
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-[var(--danger)] hover:bg-[var(--stone)]"
                    onClick={() => {
                      setMenu(false);
                      logout();
                    }}
                  >
                    {t(uiLang, "logout")}
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <Link href="/auth/login" className="btn btn-primary !px-3 !py-1.5 text-sm">
              {t(uiLang, "login")}
            </Link>
          )}

          <button
            type="button"
            className="btn btn-secondary !px-3 !py-1.5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[rgba(7,59,76,0.08)] bg-[var(--sand)] px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-[var(--stone)]"
                onClick={() => setOpen(false)}
              >
                {t(uiLang, item.key)}
              </Link>
            ))}
            <Link href="/pay" className="rounded-lg px-3 py-2 text-sm font-semibold" onClick={() => setOpen(false)}>
              {t(uiLang, "pay")}
            </Link>
            <Link href="/vas" className="rounded-lg px-3 py-2 text-sm font-semibold" onClick={() => setOpen(false)}>
              {t(uiLang, "vas")}
            </Link>
            <Link href="/roaming" className="rounded-lg px-3 py-2 text-sm font-semibold" onClick={() => setOpen(false)}>
              {t(uiLang, "roaming")}
            </Link>
            <Link href="/app" className="rounded-lg px-3 py-2 text-sm font-semibold" onClick={() => setOpen(false)}>
              {t(uiLang, "app")}
            </Link>
            <Link href="/finance" className="rounded-lg px-3 py-2 text-sm font-semibold" onClick={() => setOpen(false)}>
              {t(uiLang, "finance")}
            </Link>
            <Link href="/support/tickets" className="rounded-lg px-3 py-2 text-sm font-semibold" onClick={() => setOpen(false)}>
              {t(uiLang, "tickets")}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
