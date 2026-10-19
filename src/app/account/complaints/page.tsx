"use client";

import { TextArea, TextInput } from "@/components/FormField";
import { StatusBadge } from "@/components/StatusBadge";
import { formatStamp } from "@/lib/format";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import { useState } from "react";

export default function ComplaintsPage() {
  const { language, complaints, createComplaint, updateComplaintStatus } = useDemo();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">{t(language, "complaints")}</h1>

      <form
        className="panel mt-6 max-w-xl space-y-4 p-5"
        onSubmit={(e) => {
          e.preventDefault();
          createComplaint(subject, description);
          setSubject("");
          setDescription("");
        }}
      >
        <h2 className="font-display text-lg font-bold">{t(language, "createComplaint")}</h2>
        <TextInput label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        <TextArea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          {t(language, "submit")}
        </button>
      </form>

      <div className="mt-8 space-y-3">
        {complaints.length === 0 ? (
          <p className="text-[var(--ink-soft)]">No complaints yet.</p>
        ) : (
          complaints.map((c) => (
            <article key={c.id} className="panel p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg font-bold">{c.subject}</h3>
                <StatusBadge status={c.status} />
              </div>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">{c.description}</p>
              <p className="mt-2 text-xs text-[var(--ink-soft)]">{formatStamp(c.createdAt)}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.status === "Open" ? (
                  <button
                    type="button"
                    className="btn btn-secondary text-sm"
                    onClick={() => updateComplaintStatus(c.id, "In Progress")}
                  >
                    {t(language, "markInProgress")}
                  </button>
                ) : null}
                {c.status !== "Resolved" ? (
                  <button
                    type="button"
                    className="btn btn-ink text-sm"
                    onClick={() => updateComplaintStatus(c.id, "Resolved")}
                  >
                    {t(language, "markResolved")}
                  </button>
                ) : null}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
