"use client";

import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";

export function DemoBanner() {
  const { language } = useDemo();
  return (
    <div className="bg-[var(--ink)] px-3 py-2 text-center text-xs font-semibold tracking-wide text-[var(--amber)] sm:text-sm">
      {t(language, "demoBanner")}
    </div>
  );
}
