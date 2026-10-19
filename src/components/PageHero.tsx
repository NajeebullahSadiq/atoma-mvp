import type { ReactNode } from "react";

export function PageHero({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[rgba(7,59,76,0.08)] bg-[linear-gradient(135deg,var(--ink)_0%,var(--ink-soft)_55%,#3d5a4c_100%)] text-[var(--sand)]">
      <div className="network-dots absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="font-display animate-fade-up text-3xl font-bold sm:text-4xl">{title}</h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl animate-fade-up text-base text-[rgba(250,246,241,0.85)] [animation-delay:80ms] sm:text-lg">
            {subtitle}
          </p>
        ) : null}
        {actions ? <div className="mt-6 flex flex-wrap gap-3 animate-slide-in">{actions}</div> : null}
      </div>
    </section>
  );
}
