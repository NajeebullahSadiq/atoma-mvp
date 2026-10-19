"use client";

import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import Link from "next/link";
import { useMemo, useState } from "react";

type Msg = { from: "bot" | "user"; text: string };

function replyFor(input: string, langGreeting: string): string {
  const q = input.toLowerCase();
  if (q.includes("recharge") || q.includes("شارژ") || q.includes("چارج")) {
    return "To recharge: open Account → Recharge, pick an amount and payment method. Demo only — balance updates in-app.";
  }
  if (q.includes("complaint") || q.includes("شکایت")) {
    return "You can file a complaint under Account → Complaints, or escalate with the ticket link below.";
  }
  if (q.includes("plan") || q.includes("پلان")) {
    return "Browse Plans for prepaid, postpaid, and fiber. Change your plan anytime in Account → Plans.";
  }
  if (q.includes("hello") || q.includes("salam") || q.includes("سلام")) {
    return langGreeting;
  }
  return "I can help with recharge, plans, or complaints. Try a quick reply or open a support ticket.";
}

export function Chatbot() {
  const { language } = useDemo();
  const greeting = t(language, "chatGreeting");
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);

  const seeded = useMemo(() => {
    if (messages.length) return messages;
    return [{ from: "bot" as const, text: greeting }];
  }, [messages, greeting]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Msg = { from: "user", text: trimmed };
    const botMsg: Msg = { from: "bot", text: replyFor(trimmed, greeting) };
    setMessages((prev) => {
      const base: Msg[] = prev.length ? prev : [{ from: "bot", text: greeting }];
      return [...base, userMsg, botMsg];
    });
    setInput("");
  }

  return (
    <div className="fixed bottom-5 right-4 z-[70] sm:right-6">
      {open ? (
        <div className="mb-3 flex h-[420px] w-[min(100vw-2rem,360px)] flex-col overflow-hidden rounded-2xl border border-[rgba(7,59,76,0.12)] bg-white shadow-xl animate-fade-up">
          <div className="flex items-center justify-between bg-[var(--ink)] px-4 py-3 text-[var(--sand)]">
            <div>
              <p className="font-display font-bold">ATOMA Assist</p>
              <p className="text-xs text-white/70">Demo chatbot</p>
            </div>
            <button type="button" className="text-sm" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto bg-[var(--sand)] p-3">
            {seeded.map((m, i) => (
              <div
                key={`${m.from}-${i}`}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.from === "bot"
                    ? "bg-white text-[var(--ink)]"
                    : "ml-auto bg-[var(--ink)] text-[var(--sand)]"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 border-t border-[rgba(7,59,76,0.08)] bg-white p-2">
            {["recharge", "plan", "complaint"].map((q) => (
              <button
                key={q}
                type="button"
                className="rounded-full bg-[var(--stone)] px-2.5 py-1 text-xs font-semibold"
                onClick={() => send(q)}
              >
                {q}
              </button>
            ))}
            <Link
              href="/support/tickets"
              className="rounded-full bg-[var(--amber)] px-2.5 py-1 text-xs font-semibold text-[var(--ink)]"
            >
              {t(language, "chatEscalate")}
            </Link>
          </div>
          <form
            className="flex gap-2 border-t border-[rgba(7,59,76,0.08)] p-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              className="input !py-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t(language, "chatPlaceholder")}
            />
            <button type="submit" className="btn btn-ink !px-3 !py-2 text-sm">
              →
            </button>
          </form>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="btn btn-primary shadow-lg"
      >
        Chat
      </button>
    </div>
  );
}
