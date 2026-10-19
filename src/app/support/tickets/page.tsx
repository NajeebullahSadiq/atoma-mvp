"use client";

import { PageHero } from "@/components/PageHero";
import { TextArea, TextInput } from "@/components/FormField";
import { StatusBadge } from "@/components/StatusBadge";
import { formatStamp } from "@/lib/format";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import { useState } from "react";

export default function TicketsPage() {
  const { language, tickets, createTicket, updateTicketStatus, session } = useDemo();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <PageHero title={t(language, "tickets")} subtitle="Create and track support tickets in the demo store." />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <form
          className="panel max-w-xl space-y-4 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            createTicket(subject, description, session?.mobile);
            setSubject("");
            setDescription("");
          }}
        >
          <h2 className="font-display text-lg font-bold">{t(language, "createTicket")}</h2>
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
          {tickets.map((ticket) => (
            <article key={ticket.id} className="panel p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg font-bold">{ticket.subject}</h3>
                <StatusBadge status={ticket.status} />
              </div>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">{ticket.description}</p>
              <p className="mt-2 text-xs text-[var(--ink-soft)]">
                From {ticket.from} · {formatStamp(ticket.createdAt)}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ticket.status === "Open" ? (
                  <button
                    type="button"
                    className="btn btn-secondary text-sm"
                    onClick={() => updateTicketStatus(ticket.id, "In Progress")}
                  >
                    {t(language, "markInProgress")}
                  </button>
                ) : null}
                {ticket.status !== "Resolved" ? (
                  <button
                    type="button"
                    className="btn btn-ink text-sm"
                    onClick={() => updateTicketStatus(ticket.id, "Resolved")}
                  >
                    {t(language, "markResolved")}
                  </button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
