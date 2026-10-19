"use client";

import { PageHero } from "@/components/PageHero";
import { PLANS } from "@/lib/data";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import Link from "next/link";

export default function PostpaidPage() {
  const { language, session, changePlan, planId } = useDemo();
  const plans = PLANS.filter((p) => p.type === "postpaid");

  return (
    <div>
      <PageHero
        title={t(language, "postpaid")}
        subtitle="Monthly billed plans with higher allowances and invoice history."
        actions={
          <Link href="/account/bills" className="btn btn-primary">
            {t(language, "bills")}
          </Link>
        }
      />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2">
        {plans.map((plan) => (
          <article key={plan.id} className="panel p-5">
            <h2 className="font-display text-xl font-bold">{plan.name}</h2>
            <p className="mt-2 text-2xl font-bold">{plan.price} AFN / mo</p>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">{plan.description}</p>
            <p className="mt-3 text-sm">
              {plan.dataGb} GB · {plan.voiceMins} mins · {plan.sms} SMS
            </p>
            {session ? (
              <button
                type="button"
                className="btn btn-ink mt-5 text-sm"
                onClick={() => changePlan(plan.id)}
                disabled={planId === plan.id}
              >
                {planId === plan.id ? "Current plan" : t(language, "selectPlan")}
              </button>
            ) : (
              <Link href="/auth/login" className="btn btn-ink mt-5 text-sm">
                {t(language, "login")}
              </Link>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
