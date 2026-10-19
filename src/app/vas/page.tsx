"use client";

import { PageHero } from "@/components/PageHero";
import { StatusBadge } from "@/components/StatusBadge";
import { VAS_LIST } from "@/lib/data";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";

export default function VasPage() {
  const { language, activatedVAS, toggleVAS } = useDemo();

  return (
    <div>
      <PageHero
        title={t(language, "vas")}
        subtitle="Activate or deactivate value-added services. Demo toggles update instantly."
      />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2">
        {VAS_LIST.map((item) => {
          const on = activatedVAS.includes(item.id);
          return (
            <article key={item.id} className="panel flex items-start justify-between gap-4 p-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg font-bold">{item.name}</h2>
                  <StatusBadge status={on ? "active" : "inactive"} />
                </div>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">{item.description}</p>
                <p className="mt-2 text-sm font-semibold">{item.price} AFN / mo</p>
              </div>
              <button
                type="button"
                className={`btn text-sm ${on ? "btn-secondary" : "btn-primary"}`}
                onClick={() => toggleVAS(item.id)}
              >
                {on ? t(language, "deactivate") : t(language, "activate")}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
