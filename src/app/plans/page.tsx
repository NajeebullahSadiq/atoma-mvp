"use client";

import { PageHero } from "@/components/PageHero";
import { PLANS, type PlanType } from "@/lib/data";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function PlansPage() {
  const { language, session, changePlan, planId } = useDemo();
  const [tab, setTab] = useState<PlanType>("prepaid");
  const [compare, setCompare] = useState<string[]>([]);

  const list = useMemo(() => PLANS.filter((p) => p.type === tab), [tab]);

  function toggleCompare(id: string) {
    setCompare((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev,
    );
  }

  const compared = PLANS.filter((p) => compare.includes(p.id));

  return (
    <div>
      <PageHero
        title={t(language, "plans")}
        subtitle="Compare prepaid, postpaid, and fiber — select to apply on your demo account."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {(["prepaid", "postpaid", "fiber"] as PlanType[]).map((type) => (
            <button
              key={type}
              type="button"
              className="tab"
              data-active={tab === type}
              onClick={() => setTab(type)}
            >
              {t(language, type === "fiber" ? "fiber" : type)}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((plan) => (
            <article key={plan.id} className="panel flex flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-display text-xl font-bold">{plan.name}</h2>
                {planId === plan.id ? (
                  <span className="text-xs font-bold text-[var(--success)]">Current</span>
                ) : null}
              </div>
              <p className="mt-2 text-3xl font-bold">
                {plan.price}
                <span className="text-sm font-semibold"> AFN</span>
              </p>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">{plan.description}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {plan.type !== "fiber" ? (
                  <>
                    <li>{plan.dataGb} GB data</li>
                    <li>{plan.voiceMins} mins voice</li>
                    <li>{plan.sms} SMS</li>
                  </>
                ) : (
                  <li>Unlimited fair-use · {plan.validityDays} days billing</li>
                )}
                <li>{plan.validityDays}-day cycle</li>
              </ul>
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                <label className="flex items-center gap-2 text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={compare.includes(plan.id)}
                    onChange={() => toggleCompare(plan.id)}
                  />
                  {t(language, "compare")}
                </label>
                {session ? (
                  <button
                    type="button"
                    className="btn btn-ink ml-auto text-sm"
                    onClick={() => changePlan(plan.id)}
                    disabled={planId === plan.id}
                  >
                    {t(language, "selectPlan")}
                  </button>
                ) : (
                  <Link href="/auth/login" className="btn btn-ink ml-auto text-sm">
                    {t(language, "login")}
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        {compared.length >= 2 ? (
          <div className="panel mt-10 overflow-x-auto p-5 animate-fade-up">
            <h3 className="font-display text-lg font-bold">{t(language, "compare")}</h3>
            <table className="mt-4 w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-[rgba(7,59,76,0.1)]">
                  <th className="py-2">Feature</th>
                  {compared.map((p) => (
                    <th key={p.id} className="py-2">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">Price</td>
                  {compared.map((p) => (
                    <td key={p.id}>{p.price} AFN</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2">Data</td>
                  {compared.map((p) => (
                    <td key={p.id}>{p.type === "fiber" ? "Unlimited*" : `${p.dataGb} GB`}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2">Voice</td>
                  {compared.map((p) => (
                    <td key={p.id}>{p.type === "fiber" ? "—" : `${p.voiceMins} mins`}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}
