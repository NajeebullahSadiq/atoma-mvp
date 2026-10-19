"use client";

import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import { useState } from "react";

function Bar({ label, used, total, unit }: { label: string; used: number; total: number; unit: string }) {
  const pct = Math.min(100, Math.round((used / total) * 100));
  return (
    <div className="panel p-5">
      <div className="flex justify-between text-sm font-semibold">
        <span>{label}</span>
        <span>
          {used} / {total} {unit}
        </span>
      </div>
      <div className="usage-bar mt-3">
        <span style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-xs text-[var(--ink-soft)]">{pct}% used</p>
    </div>
  );
}

export default function UsagePage() {
  const { language, usage } = useDemo();
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");
  const data = usage[period];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">{t(language, "usage")}</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {(
          [
            ["7d", "7 days"],
            ["30d", "30 days"],
            ["90d", "90 days"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            className="tab"
            data-active={period === key}
            onClick={() => setPeriod(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-[var(--ink-soft)]">{data.label}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Bar label="Data" used={data.dataUsedGb} total={data.dataTotalGb} unit="GB" />
        <Bar label="Voice" used={data.voiceUsedMins} total={data.voiceTotalMins} unit="mins" />
        <Bar label="SMS" used={data.smsUsed} total={data.smsTotal} unit="SMS" />
      </div>
    </div>
  );
}
