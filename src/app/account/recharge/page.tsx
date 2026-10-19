"use client";

import { TextInput, TextSelect } from "@/components/FormField";
import { formatStamp } from "@/lib/format";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import { useState } from "react";

const PRESETS = [100, 200, 500, 1000];

export default function RechargePage() {
  const { language, balance, recharge, recharges } = useDemo();
  const [amount, setAmount] = useState("200");
  const [method, setMethod] = useState("card");
  const [done, setDone] = useState(false);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">{t(language, "recharge")}</h1>
      <p className="mt-1 text-[var(--ink-soft)]">
        {t(language, "balance")}: <strong>{balance} AFN</strong>
      </p>

      <form
        className="panel mt-6 max-w-lg space-y-4 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          const n = Number(amount);
          if (!n || n <= 0) return;
          recharge(n, method);
          setDone(true);
        }}
      >
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((n) => (
            <button
              key={n}
              type="button"
              className={`btn text-sm ${amount === String(n) ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setAmount(String(n))}
            >
              {n} AFN
            </button>
          ))}
        </div>
        <TextInput
          label={`Custom ${t(language, "amount")}`}
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextSelect label="Payment method" value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="card">Card</option>
          <option value="wallet">ATOMA Pay wallet</option>
          <option value="netbanking">Net banking</option>
        </TextSelect>
        <button type="submit" className="btn btn-primary w-full">
          {t(language, "confirm")} recharge
        </button>
        {done ? (
          <p className="text-sm font-semibold text-[var(--success)] animate-fade-in">
            {t(language, "success")} — balance updated.
          </p>
        ) : null}
      </form>

      <h2 className="mt-10 font-display text-xl font-bold">History</h2>
      <div className="mt-4 space-y-2">
        {recharges.map((r) => (
          <div key={r.id} className="panel flex items-center justify-between px-4 py-3 text-sm">
            <span>
              +{r.amount} AFN · {r.method}
            </span>
            <span className="text-[var(--ink-soft)]">{formatStamp(r.createdAt)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
