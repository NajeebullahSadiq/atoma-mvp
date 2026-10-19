"use client";

import { PageHero } from "@/components/PageHero";
import { TextArea, TextInput } from "@/components/FormField";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import { useState } from "react";

export default function FinancePage() {
  const { language, showNotice } = useDemo();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div>
      <PageHero
        title={t(language, "finance")}
        subtitle="Enterprise billing, device financing leads, and partner inquiries — demo form only."
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2">
        <div className="panel p-6">
          <h2 className="font-display text-xl font-bold">Business connectivity</h2>
          <p className="mt-3 text-sm text-[var(--ink-soft)]">
            ATOMA Finance helps organizations with multi-line postpaid, fiber installs, and staged
            device payments. Submit a lead and we&apos;ll show a confirmation toast — no backend.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>· Corporate postpaid portfolios</li>
            <li>· Handset installment programs</li>
            <li>· Fiber for branches</li>
          </ul>
        </div>
        <form
          className="panel space-y-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            showNotice("Finance lead submitted. Our demo team will “call back”.");
            setName("");
            setMobile("");
            setCompany("");
            setMessage("");
          }}
        >
          <TextInput label={t(language, "name")} value={name} onChange={(e) => setName(e.target.value)} required />
          <TextInput label={t(language, "mobile")} value={mobile} onChange={(e) => setMobile(e.target.value)} required />
          <TextInput label="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
          <TextArea label="Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
          <button type="submit" className="btn btn-primary">
            {t(language, "submit")}
          </button>
          {sent ? <p className="text-sm font-semibold text-[var(--success)]">{t(language, "success")}</p> : null}
        </form>
      </div>
    </div>
  );
}
