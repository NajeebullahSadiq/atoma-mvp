"use client";

import { PLANS } from "@/lib/data";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import Link from "next/link";

export default function HomePage() {
  const { language, banners } = useDemo();
  const featured = PLANS.filter((p) => p.featured).slice(0, 3);
  const activeBanners = banners.filter((b) => b.active);

  return (
    <div>
      <section className="relative min-h-[88vh] overflow-hidden hero-plane text-[var(--sand)]">
        <div className="network-dots absolute inset-0 opacity-50" aria-hidden />
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <path
            d="M0 520 L180 420 L320 480 L480 300 L640 390 L820 220 L980 340 L1200 180 L1200 800 L0 800 Z"
            fill="rgba(244,162,97,0.25)"
          />
          <path
            d="M0 600 L220 500 L400 560 L560 410 L760 470 L960 320 L1200 400 L1200 800 L0 800 Z"
            fill="rgba(7,59,76,0.35)"
          />
          <circle cx="860" cy="210" r="6" fill="#F4A261" />
          <circle cx="920" cy="260" r="4" fill="#fff" />
          <circle cx="780" cy="280" r="3" fill="#fff" />
          <line x1="860" y1="210" x2="920" y2="260" stroke="#F4A261" strokeWidth="1.5" />
          <line x1="860" y1="210" x2="780" y2="280" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
        </svg>

        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 sm:px-6 sm:pb-24">
          <p className="font-display animate-fade-up text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl">
            ATOMA
          </p>
          <h1 className="mt-4 max-w-xl animate-fade-up font-display text-2xl font-semibold sm:text-3xl [animation-delay:100ms]">
            {t(language, "heroHeadline")}
          </h1>
          <p className="mt-3 max-w-lg animate-fade-up text-base text-[rgba(250,246,241,0.85)] sm:text-lg [animation-delay:180ms]">
            {t(language, "heroSupport")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-slide-in [animation-delay:260ms]">
            <Link href="/plans" className="btn btn-primary">
              {t(language, "ctaPlans")}
            </Link>
            <Link href="/account/recharge" className="btn btn-secondary border-white/40 text-white hover:bg-white/10">
              {t(language, "ctaRecharge")}
            </Link>
            <Link href="/account" className="btn btn-secondary border-white/40 text-white hover:bg-white/10">
              {t(language, "ctaAccount")}
            </Link>
          </div>
        </div>
      </section>

      {activeBanners.length ? (
        <section className="border-b border-[rgba(7,59,76,0.08)] bg-[var(--stone)]">
          <div className="mx-auto flex max-w-6xl gap-4 overflow-x-auto px-4 py-4 sm:px-6">
            {activeBanners.map((b) => (
              <div key={b.id} className="min-w-[240px] flex-1 animate-fade-in">
                <p className="font-display text-sm font-bold text-[var(--ink)]">{b.title}</p>
                <p className="text-sm text-[var(--ink-soft)]">{b.body}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] sm:text-3xl">
              Featured plans
            </h2>
            <p className="mt-2 text-[var(--ink-soft)]">Prepaid, postpaid, and fiber highlights.</p>
          </div>
          <Link href="/plans" className="btn btn-secondary text-sm">
            {t(language, "viewAll")}
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((plan, i) => (
            <article
              key={plan.id}
              className="panel p-5 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--amber-deep)]">
                {plan.type}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold">{plan.name}</h3>
              <p className="mt-1 text-2xl font-bold text-[var(--ink)]">
                {plan.price} <span className="text-sm font-semibold">AFN</span>
              </p>
              <p className="mt-3 text-sm text-[var(--ink-soft)]">{plan.description}</p>
              <Link href="/plans" className="btn btn-ink mt-5 w-full text-sm">
                {t(language, "selectPlan")}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--ink)] text-[var(--sand)]">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {[
            { href: "/account/recharge", title: t(language, "recharge"), desc: "Top up prepaid in seconds." },
            { href: "/pay", title: t(language, "pay"), desc: "Wallet send & top-up demo." },
            { href: "/stores", title: t(language, "findStore"), desc: "Locate ATOMA retail points." },
            { href: "/auth/login", title: t(language, "account"), desc: "Self-care dashboard & SIM tools." },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <h3 className="font-display text-lg font-bold text-[var(--amber)]">{item.title}</h3>
              <p className="mt-2 text-sm text-white/75">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
