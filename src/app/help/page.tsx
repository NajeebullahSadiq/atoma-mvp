"use client";

import { PageHero } from "@/components/PageHero";
import { FAQS } from "@/lib/data";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import { useMemo, useState } from "react";

export default function HelpPage() {
  const { language } = useDemo();
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id ?? null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return FAQS;
    return FAQS.filter(
      (f) =>
        f.question.toLowerCase().includes(term) ||
        f.answer.toLowerCase().includes(term) ||
        f.category.toLowerCase().includes(term),
    );
  }, [q]);

  return (
    <div>
      <PageHero title={t(language, "help")} subtitle="Search FAQs or expand answers below." />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <input
          className="input mb-6"
          placeholder={t(language, "search")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-[var(--ink-soft)]">{t(language, "noResults")}</p>
          ) : (
            filtered.map((faq) => {
              const open = openId === faq.id;
              return (
                <div key={faq.id} className="panel overflow-hidden">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                    onClick={() => setOpenId(open ? null : faq.id)}
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--amber-deep)]">
                        {faq.category}
                      </p>
                      <p className="mt-1 font-semibold">{faq.question}</p>
                    </div>
                    <span className="text-xl">{open ? "−" : "+"}</span>
                  </button>
                  {open ? (
                    <div className="border-t border-[rgba(7,59,76,0.08)] px-4 py-3 text-sm text-[var(--ink-soft)] animate-fade-in">
                      {faq.answer}
                    </div>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
