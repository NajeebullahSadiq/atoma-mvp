"use client";

import { PageHero } from "@/components/PageHero";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";

export default function AppPage() {
  const { language, showNotice } = useDemo();

  return (
    <div>
      <PageHero
        title={t(language, "app")}
        subtitle="Manage balance, plans, and ATOMA Pay from your phone. Download links are demo stubs."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="panel grid gap-8 p-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold">ATOMA on mobile</h2>
            <ul className="mt-4 space-y-2 text-sm text-[var(--ink-soft)]">
              <li>Recharge and pay bills</li>
              <li>Track usage in real time (demo charts)</li>
              <li>Chat support shortcuts</li>
              <li>Store locator offline cache (mock)</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => showNotice("Demo: App Store link opened.", "info")}
              >
                {t(language, "downloadApp")} · iOS
              </button>
              <button
                type="button"
                className="btn btn-ink"
                onClick={() => showNotice("Demo: Play Store link opened.", "info")}
              >
                {t(language, "downloadApp")} · Android
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(160deg,var(--ink),var(--ink-soft))] p-6 text-[var(--sand)]">
            <div className="network-dots absolute inset-0 opacity-40" />
            <div className="relative">
              <p className="font-display text-3xl font-bold">ATOMA</p>
              <p className="mt-3 text-sm text-white/80">Self-care · Pay · Coverage</p>
              <div className="mt-8 space-y-3">
                <div className="rounded-xl bg-white/10 p-3 text-sm">Balance · 450 AFN</div>
                <div className="rounded-xl bg-white/10 p-3 text-sm">Data left · 6.5 GB</div>
                <div className="rounded-xl bg-[var(--amber)] p-3 text-sm font-semibold text-[var(--ink)]">
                  Quick recharge
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
