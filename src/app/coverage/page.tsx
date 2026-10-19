"use client";

import { PageHero } from "@/components/PageHero";
import { StatusBadge } from "@/components/StatusBadge";
import { COVERAGE_REGIONS } from "@/lib/data";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import { useState } from "react";

export default function CoveragePage() {
  const { language } = useDemo();
  const [regionId, setRegionId] = useState(COVERAGE_REGIONS[0].id);
  const region = COVERAGE_REGIONS.find((r) => r.id === regionId) ?? COVERAGE_REGIONS[0];

  return (
    <div>
      <PageHero
        title={t(language, "coverage")}
        subtitle="Select a region to view illustrative coverage status."
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2">
        <div className="panel p-6">
          <label className="label">{t(language, "region")}</label>
          <select
            className="input"
            value={regionId}
            onChange={(e) => setRegionId(e.target.value)}
          >
            {COVERAGE_REGIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
          <div className="mt-6">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-2xl font-bold">{region.name}</h2>
              <StatusBadge status={region.status} />
            </div>
            <p className="mt-3 text-sm text-[var(--ink-soft)]">{region.notes}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {region.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[var(--stone)] px-3 py-1 text-xs font-bold text-[var(--ink)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="panel relative min-h-[280px] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(244,162,97,0.35),transparent_40%),linear-gradient(160deg,#0a4f66,#073b4c)]" />
          <div className="network-dots absolute inset-0 opacity-40" />
          <div className="relative flex h-full flex-col justify-end p-6 text-[var(--sand)]">
            <p className="font-display text-xl font-bold">Signal map · {region.name}</p>
            <p className="mt-2 text-sm text-white/75">Status: {region.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
