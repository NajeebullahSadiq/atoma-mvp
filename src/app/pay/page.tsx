"use client";

import { PageHero } from "@/components/PageHero";
import { TextInput } from "@/components/FormField";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import { useState } from "react";

export default function PayPage() {
  const { language, walletBalance, walletTopUp, walletSend } = useDemo();
  const [topUp, setTopUp] = useState("200");
  const [to, setTo] = useState("");
  const [sendAmount, setSendAmount] = useState("50");

  return (
    <div>
      <PageHero
        title={t(language, "pay")}
        subtitle="Demo wallet overview with top-up and send flows. No real money moves."
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-3">
        <div className="panel bg-[linear-gradient(145deg,var(--ink),var(--ink-soft))] p-6 text-[var(--sand)] lg:col-span-1">
          <p className="text-sm uppercase tracking-wider text-[var(--amber)]">{t(language, "wallet")}</p>
          <p className="mt-3 font-display text-4xl font-bold">{walletBalance} AFN</p>
          <p className="mt-2 text-sm text-white/70">Available demo balance</p>
        </div>

        <form
          className="panel space-y-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            walletTopUp(Number(topUp) || 0);
          }}
        >
          <h2 className="font-display text-lg font-bold">{t(language, "topUp")}</h2>
          <TextInput
            label={t(language, "amount")}
            type="number"
            min={1}
            value={topUp}
            onChange={(e) => setTopUp(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {[100, 200, 500].map((n) => (
              <button key={n} type="button" className="btn btn-secondary text-sm" onClick={() => setTopUp(String(n))}>
                {n}
              </button>
            ))}
          </div>
          <button type="submit" className="btn btn-primary w-full">
            {t(language, "topUp")}
          </button>
        </form>

        <form
          className="panel space-y-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            walletSend(to, Number(sendAmount) || 0);
            setTo("");
          }}
        >
          <h2 className="font-display text-lg font-bold">{t(language, "sendMoney")}</h2>
          <TextInput
            label="To mobile"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            placeholder="07xxxxxxxx"
          />
          <TextInput
            label={t(language, "amount")}
            type="number"
            min={1}
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
          />
          <button type="submit" className="btn btn-ink w-full">
            {t(language, "sendMoney")}
          </button>
        </form>
      </div>
    </div>
  );
}
