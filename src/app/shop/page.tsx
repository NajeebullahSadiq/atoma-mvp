"use client";

import { PageHero } from "@/components/PageHero";
import { DEVICES, type Device } from "@/lib/data";
import { formatStamp } from "@/lib/format";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function ShopPage() {
  const { language, orders } = useDemo();
  const [tab, setTab] = useState<"all" | Device["category"]>("all");

  const items = useMemo(
    () => (tab === "all" ? DEVICES : DEVICES.filter((d) => d.category === tab)),
    [tab],
  );

  return (
    <div>
      <PageHero
        title={t(language, "shop")}
        subtitle="Devices, accessories, and SIM kits — order flow is UI-only."
        actions={
          <Link href="/shop/order" className="btn btn-primary">
            {t(language, "orderNow")}
          </Link>
        }
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {(
            [
              ["all", "All"],
              ["device", t(language, "devices")],
              ["accessory", t(language, "accessories")],
              ["sim", t(language, "simKits")],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className="tab"
              data-active={tab === key}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="panel flex flex-col p-5">
              <div
                className="mb-4 h-28 rounded-xl"
                style={{
                  background:
                    item.category === "device"
                      ? "linear-gradient(145deg,#073B4C,#F4A261)"
                      : item.category === "accessory"
                        ? "linear-gradient(145deg,#2A9D8F,#E6D9CB)"
                        : "linear-gradient(145deg,#F4A261,#073B4C)",
                }}
              />
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--amber-deep)]">
                {item.category}
              </p>
              <h2 className="mt-1 font-display text-lg font-bold">{item.name}</h2>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">{item.description}</p>
              <p className="mt-3 text-xl font-bold">{item.price} AFN</p>
              <Link
                href={`/shop/order?item=${item.id}`}
                className="btn btn-ink mt-auto pt-5 text-sm"
              >
                {t(language, "orderNow")}
              </Link>
            </article>
          ))}
        </div>

        {orders.length ? (
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold">Your demo orders</h2>
            <div className="mt-4 space-y-2">
              {orders.map((o) => (
                <div key={o.id} className="panel flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
                  <span>
                    {o.itemName} · {o.price} AFN
                  </span>
                  <span className="text-[var(--ink-soft)]">
                    {o.status} · {formatStamp(o.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
