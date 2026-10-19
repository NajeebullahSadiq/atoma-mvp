"use client";

import { PLANS, getPlanById } from "@/lib/data";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import { useState } from "react";

export default function AccountPlansPage() {
  const { language, planId, changePlan } = useDemo();
  const current = getPlanById(planId);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const pending = pendingId ? getPlanById(pendingId) : null;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Plan management</h1>
      <div className="panel mt-6 p-5">
        <p className="text-sm font-semibold text-[var(--ink-soft)]">{t(language, "currentPlan")}</p>
        <p className="mt-1 font-display text-2xl font-bold">{current?.name}</p>
        <p className="mt-1 text-sm">{current?.price} AFN · {current?.type}</p>
      </div>

      <h2 className="mt-8 font-display text-xl font-bold">Change plan</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {PLANS.filter((p) => p.id !== planId).map((plan) => (
          <article key={plan.id} className="panel flex items-center justify-between gap-3 p-4">
            <div>
              <p className="font-semibold">{plan.name}</p>
              <p className="text-sm text-[var(--ink-soft)]">
                {plan.price} AFN · {plan.type}
              </p>
            </div>
            <button type="button" className="btn btn-ink text-sm" onClick={() => setPendingId(plan.id)}>
              {plan.price > (current?.price ?? 0) ? "Upgrade" : "Downgrade"}
            </button>
          </article>
        ))}
      </div>

      {pending ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(7,59,76,0.45)] p-4">
          <div className="panel max-w-md p-6 animate-fade-up">
            <h3 className="font-display text-xl font-bold">{t(language, "confirm")}</h3>
            <p className="mt-3 text-sm text-[var(--ink-soft)]">
              Switch from <strong>{current?.name}</strong> to <strong>{pending.name}</strong>?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                className="btn btn-primary flex-1"
                onClick={() => {
                  changePlan(pending.id);
                  setPendingId(null);
                }}
              >
                {t(language, "confirm")}
              </button>
              <button type="button" className="btn btn-secondary flex-1" onClick={() => setPendingId(null)}>
                {t(language, "cancel")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
