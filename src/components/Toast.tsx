"use client";

import { useDemo } from "@/lib/store";
import { useEffect } from "react";

export function Toast() {
  const { notice, clearNotice } = useDemo();

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(clearNotice, 3200);
    return () => clearTimeout(t);
  }, [notice, clearNotice]);

  if (!notice) return null;

  const tone =
    notice.type === "error"
      ? "bg-[var(--danger)]"
      : notice.type === "info"
        ? "bg-[var(--ink-soft)]"
        : "bg-[var(--success)]";

  return (
    <div
      className={`fixed bottom-5 left-1/2 z-[80] max-w-md -translate-x-1/2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg animate-fade-up ${tone}`}
      role="status"
    >
      {notice.message}
    </div>
  );
}
