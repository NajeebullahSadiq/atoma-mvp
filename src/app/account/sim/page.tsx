"use client";

import { TextInput } from "@/components/FormField";
import { StatusBadge } from "@/components/StatusBadge";
import { getPlanById } from "@/lib/data";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import { useState } from "react";

export default function SimPage() {
  const { language, sims, setPrimarySim, toggleSimBlock, addSim } = useDemo();
  const [number, setNumber] = useState("");

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">SIM management</h1>
      <div className="mt-6 space-y-3">
        {sims.map((sim) => (
          <article key={sim.id} className="panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-display text-lg font-bold">{sim.number}</p>
                <StatusBadge status={sim.status} />
                {sim.primary ? <StatusBadge status="primary" /> : null}
              </div>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">
                Plan: {getPlanById(sim.planId)?.name ?? sim.planId}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {!sim.primary ? (
                <button type="button" className="btn btn-secondary text-sm" onClick={() => setPrimarySim(sim.id)}>
                  {t(language, "setPrimary")}
                </button>
              ) : null}
              <button type="button" className="btn btn-ink text-sm" onClick={() => toggleSimBlock(sim.id)}>
                {sim.status === "active" ? t(language, "block") : t(language, "unblock")}
              </button>
            </div>
          </article>
        ))}
      </div>

      <form
        className="panel mt-8 max-w-md space-y-4 p-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!number.trim()) return;
          addSim(number.trim());
          setNumber("");
        }}
      >
        <h2 className="font-display text-lg font-bold">{t(language, "addSim")}</h2>
        <TextInput
          label={t(language, "mobile")}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          placeholder="07xxxxxxxx"
        />
        <button type="submit" className="btn btn-primary">
          {t(language, "addSim")}
        </button>
      </form>
    </div>
  );
}
