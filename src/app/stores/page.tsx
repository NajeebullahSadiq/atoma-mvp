"use client";

import { PageHero } from "@/components/PageHero";
import { STORES } from "@/lib/data";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import { useMemo, useState } from "react";

export default function StoresPage() {
  const { language } = useDemo();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("all");

  const cities = useMemo(
    () => ["all", ...Array.from(new Set(STORES.map((s) => s.city)))],
    [],
  );

  const filtered = STORES.filter((s) => {
    const matchCity = city === "all" || s.city === city;
    const matchQ =
      !q ||
      `${s.name} ${s.address} ${s.city}`.toLowerCase().includes(q.toLowerCase());
    return matchCity && matchQ;
  });

  return (
    <div>
      <PageHero title={t(language, "stores")} subtitle="Search and filter ATOMA retail points." />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            className="input"
            placeholder={t(language, "search")}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select className="input sm:max-w-xs" value={city} onChange={(e) => setCity(e.target.value)}>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All cities" : c}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <p className="text-[var(--ink-soft)]">{t(language, "noResults")}</p>
            ) : (
              filtered.map((store) => (
                <article key={store.id} className="panel p-4">
                  <h2 className="font-display text-lg font-bold">{store.name}</h2>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">
                    {store.address}, {store.city}
                  </p>
                  <p className="mt-2 text-sm">
                    {store.phone} · {store.hours}
                  </p>
                </article>
              ))
            )}
          </div>
          <div className="panel relative min-h-[320px] overflow-hidden p-0">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#d8e4e8,#e6d9cb)]" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 320" aria-hidden>
              <rect width="400" height="320" fill="transparent" />
              {[
                [80, 90],
                [200, 140],
                [300, 80],
                [150, 220],
                [280, 200],
              ].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="8" fill="#F4A261" />
                  <circle cx={x} cy={y} r="16" fill="none" stroke="#073B4C" strokeWidth="1.5" opacity="0.4" />
                </g>
              ))}
              <path
                d="M40 260 C120 200, 180 280, 260 210 S360 240, 380 180"
                fill="none"
                stroke="#073B4C"
                strokeWidth="2"
                opacity="0.35"
              />
            </svg>
            <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--ink)]">
              Map placeholder · {filtered.length} stores
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
