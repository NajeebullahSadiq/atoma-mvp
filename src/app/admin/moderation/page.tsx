"use client";

import { StatusBadge } from "@/components/StatusBadge";
import { useDemo } from "@/lib/store";

export default function AdminModerationPage() {
  const {
    tickets,
    complaints,
    updateTicketStatus,
    updateComplaintStatus,
  } = useDemo();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Tickets & complaints</h1>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">Moderate demo support items and advance status.</p>

      <h2 className="mt-8 font-display text-xl font-bold">Tickets</h2>
      <div className="mt-3 space-y-3">
        {tickets.map((ticket) => (
          <article key={ticket.id} className="panel p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold">{ticket.subject}</h3>
              <StatusBadge status={ticket.status} />
            </div>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">{ticket.description}</p>
            <p className="mt-1 text-xs">From {ticket.from}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-secondary text-sm"
                onClick={() => updateTicketStatus(ticket.id, "In Progress")}
              >
                In Progress
              </button>
              <button
                type="button"
                className="btn btn-ink text-sm"
                onClick={() => updateTicketStatus(ticket.id, "Resolved")}
              >
                Resolved
              </button>
            </div>
          </article>
        ))}
      </div>

      <h2 className="mt-10 font-display text-xl font-bold">Complaints</h2>
      <div className="mt-3 space-y-3">
        {complaints.length === 0 ? (
          <p className="text-sm text-[var(--ink-soft)]">No complaints yet — create one from Account → Complaints.</p>
        ) : (
          complaints.map((c) => (
            <article key={c.id} className="panel p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold">{c.subject}</h3>
                <StatusBadge status={c.status} />
              </div>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">{c.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn btn-secondary text-sm"
                  onClick={() => updateComplaintStatus(c.id, "In Progress")}
                >
                  In Progress
                </button>
                <button
                  type="button"
                  className="btn btn-ink text-sm"
                  onClick={() => updateComplaintStatus(c.id, "Resolved")}
                >
                  Resolved
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
