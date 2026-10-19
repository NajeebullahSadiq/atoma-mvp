"use client";

import { StatusBadge } from "@/components/StatusBadge";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import Link from "next/link";

export default function BillsPage() {
  const { language, bills, payBill } = useDemo();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">{t(language, "bills")}</h1>
      <div className="mt-6 space-y-3">
        {bills.map((bill) => (
          <article key={bill.id} className="panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-display text-lg font-bold">{bill.period}</p>
                <StatusBadge status={bill.status} />
              </div>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">
                Due {bill.dueDate} · {bill.amount} AFN
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/account/invoices/${bill.id}`} className="btn btn-secondary text-sm">
                View invoice
              </Link>
              {bill.status === "unpaid" ? (
                <button type="button" className="btn btn-primary text-sm" onClick={() => payBill(bill.id)}>
                  {t(language, "payBill")}
                </button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
