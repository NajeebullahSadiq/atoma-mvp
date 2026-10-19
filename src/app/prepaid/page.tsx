"use client";

import { PageHero } from "@/components/PageHero";
import { PLANS } from "@/lib/data";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import Link from "next/link";

export default function PrepaidPage() {
  const { language, session, changePlan, planId } = useDemo();
  const plans = PLANS.filter((p) => p.type === "prepaid");

  return (
    <div>
      <PageHero
        title={t(language, "prepaid")}
        subtitle="Pay-as-you-go bundles with clear data, voice, and SMS allowances."
        actions={
          <Link href="/account/recharge" className="btn btn-primary">
            {t(language, "ctaRecharge")}
          </Link>
        }
      />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.id} className="panel p-5">
            <h2 className="font-display text-xl font-bold">{plan.name}</h2>
            <p className="mt-2 text-2xl font-bold">{plan.price} AFN</p>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">
              {plan.dataGb} GB · {plan.voiceMins} mins · {plan.sms} SMS
            </p>
            {session ? (
              <button
                type="button"
                className="btn btn-ink mt-5 w-full text-sm"
                onClick={() => changePlan(plan.id)}
                disabled={planId === plan.id}
              >
                {planId === plan.id ? "Current plan" : t(language, "selectPlan")}
              </button>
            ) : (
              <Link href="/auth/login" className="btn btn-ink mt-5 w-full text-sm">
                {t(language, "login")}
              </Link>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
