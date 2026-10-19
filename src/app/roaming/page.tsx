"use client";

import { PageHero } from "@/components/PageHero";
import { StatusBadge } from "@/components/StatusBadge";
import { ROAMING_PACKS } from "@/lib/data";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";

export default function RoamingPage() {
  const { language, activatedRoaming, activateRoaming } = useDemo();

  return (
    <div>
      <PageHero
        title={t(language, "roaming")}
        subtitle="Pick a destination pack and activate for travel. UI demo only."
      />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-3">
        {ROAMING_PACKS.map((pack) => {
          const on = activatedRoaming.includes(pack.id);
          return (
            <article key={pack.id} className="panel p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-display text-lg font-bold">{pack.name}</h2>
                {on ? <StatusBadge status="active" /> : null}
              </div>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[var(--amber-deep)]">
                {pack.region}
              </p>
              <p className="mt-3 text-2xl font-bold">{pack.price} AFN</p>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">{pack.description}</p>
              <p className="mt-2 text-sm">
                {pack.dataGb} GB · {pack.days} days
              </p>
              <button
                type="button"
                className="btn btn-ink mt-5 w-full text-sm"
                disabled={on}
                onClick={() => activateRoaming(pack.id)}
              >
                {on ? "Activated" : t(language, "activate")}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
