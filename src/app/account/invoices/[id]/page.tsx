"use client";

import { StatusBadge } from "@/components/StatusBadge";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import Link from "next/link";
import { use } from "react";

export default function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { language, bills, payBill } = useDemo();
  const bill = bills.find((b) => b.id === id);

  if (!bill) {
    return (
      <div>
        <p>Invoice not found.</p>
        <Link href="/account/bills" className="btn btn-secondary mt-4">
          {t(language, "back")}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/account/bills" className="text-sm font-semibold text-[var(--ink-soft)]">
        ← {t(language, "bills")}
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl font-bold">Invoice {bill.id}</h1>
        <StatusBadge status={bill.status} />
      </div>
      <p className="mt-2 text-[var(--ink-soft)]">
        Period {bill.period} · Due {bill.dueDate}
      </p>
      <div className="panel mt-6 max-w-lg p-5">
        <ul className="space-y-2 text-sm">
          {bill.items.map((item) => (
            <li key={item.label} className="flex justify-between border-b border-[rgba(7,59,76,0.08)] py-2">
              <span>{item.label}</span>
              <span>{item.amount} AFN</span>
            </li>
          ))}
          <li className="flex justify-between pt-3 text-base font-bold">
            <span>Total</span>
            <span>{bill.amount} AFN</span>
          </li>
        </ul>
        {bill.status === "unpaid" ? (
          <button type="button" className="btn btn-primary mt-5 w-full" onClick={() => payBill(bill.id)}>
            {t(language, "payBill")}
          </button>
        ) : null}
      </div>
    </div>
  );
}
