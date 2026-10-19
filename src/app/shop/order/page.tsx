"use client";

import { PageHero } from "@/components/PageHero";
import { TextInput, TextSelect } from "@/components/FormField";
import { DEVICES } from "@/lib/data";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

function OrderForm() {
  const { language, placeOrder, profile, orders } = useDemo();
  const params = useSearchParams();
  const initial = params.get("item") ?? DEVICES[0].id;
  const [itemId, setItemId] = useState(initial);
  const [name, setName] = useState(profile.name || "");
  const [mobile, setMobile] = useState(profile.mobile || "");
  const [address, setAddress] = useState(profile.address || "");
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const item = useMemo(() => DEVICES.find((d) => d.id === itemId) ?? DEVICES[0], [itemId]);

  return (
    <>
      <form
        className="panel mx-auto max-w-lg space-y-4 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          placeOrder({
            itemId: item.id,
            itemName: item.name,
            price: item.price,
            name,
            mobile,
            address,
          });
          setConfirmed(item.name);
        }}
      >
        <TextSelect label="Item" value={itemId} onChange={(e) => setItemId(e.target.value)}>
          {DEVICES.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} — {d.price} AFN
            </option>
          ))}
        </TextSelect>
        <TextInput label={t(language, "name")} value={name} onChange={(e) => setName(e.target.value)} required />
        <TextInput label={t(language, "mobile")} value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        <TextInput label={t(language, "address")} value={address} onChange={(e) => setAddress(e.target.value)} required />
        <p className="text-sm font-semibold">Total: {item.price} AFN (demo)</p>
        <button type="submit" className="btn btn-primary w-full">
          {t(language, "confirm")} order
        </button>
      </form>

      {confirmed ? (
        <div className="mx-auto mt-6 max-w-lg panel border-[var(--success)] p-5 animate-fade-up">
          <p className="font-display text-lg font-bold text-[var(--success)]">{t(language, "success")}</p>
          <p className="mt-2 text-sm">
            Order for <strong>{confirmed}</strong> is confirmed. It appears in the shop orders list
            ({orders.length} total).
          </p>
          <Link href="/shop" className="btn btn-secondary mt-4">
            Back to shop
          </Link>
        </div>
      ) : null}
    </>
  );
}

export default function ShopOrderPage() {
  const { language } = useDemo();

  return (
    <div>
      <PageHero title={`${t(language, "orderNow")}`} subtitle="Select an item and submit delivery details." />
      <div className="px-4 py-10 sm:px-6">
        <Suspense fallback={<p className="text-center">Loading…</p>}>
          <OrderForm />
        </Suspense>
      </div>
    </div>
  );
}
