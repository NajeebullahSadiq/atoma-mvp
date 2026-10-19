"use client";

import { getPlanById } from "@/lib/data";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import Link from "next/link";

export default function AccountDashboard() {
  const { language, profile, balance, planId, usage } = useDemo();
  const plan = getPlanById(planId);
  const month = usage["30d"];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">
        {t(language, "welcomeBack")}, {profile.name}
      </h1>
      <p className="mt-1 text-[var(--ink-soft)]">{profile.mobile}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="panel bg-[var(--ink)] p-5 text-[var(--sand)]">
          <p className="text-sm text-[var(--amber)]">{t(language, "balance")}</p>
          <p className="mt-2 font-display text-3xl font-bold">{balance} AFN</p>
        </div>
        <div className="panel p-5">
          <p className="text-sm font-semibold text-[var(--ink-soft)]">{t(language, "currentPlan")}</p>
          <p className="mt-2 font-display text-xl font-bold">{plan?.name ?? planId}</p>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">{plan?.price} AFN</p>
        </div>
        <div className="panel p-5">
          <p className="text-sm font-semibold text-[var(--ink-soft)]">{t(language, "usage")} (30d)</p>
          <p className="mt-2 text-sm">
            Data {month.dataUsedGb}/{month.dataTotalGb} GB
          </p>
          <div className="usage-bar mt-2">
            <span style={{ width: `${(month.dataUsedGb / month.dataTotalGb) * 100}%` }} />
          </div>
        </div>
      </div>

      <h2 className="mt-10 font-display text-xl font-bold">{t(language, "quickActions")}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { href: "/account/recharge", key: "recharge" },
          { href: "/account/bills", key: "bills" },
          { href: "/account/plans", key: "plans" },
          { href: "/account/complaints", key: "complaints" },
        ].map((a) => (
          <Link key={a.href} href={a.href} className="btn btn-secondary justify-start">
            {t(language, a.key)}
          </Link>
        ))}
      </div>
    </div>
  );
}
