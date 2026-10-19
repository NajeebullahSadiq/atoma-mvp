"use client";

import { Chatbot } from "@/components/Chatbot";
import { DemoBanner } from "@/components/DemoBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Toast } from "@/components/Toast";
import { useDemo } from "@/lib/store";
import { useEffect, type ReactNode } from "react";

const HTML_LANG: Record<string, string> = {
  en: "en",
  fa: "fa-AF",
  ps: "ps-AF",
};

export function AppChrome({ children }: { children: ReactNode }) {
  const { language } = useDemo();

  useEffect(() => {
    const root = document.documentElement;
    root.lang = HTML_LANG[language] ?? "en";
    root.dir = language === "en" ? "ltr" : "rtl";
    root.classList.remove("lang-en", "lang-fa", "lang-ps");
    root.classList.add(`lang-${language}`);
  }, [language]);

  return (
    <>
      <DemoBanner />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <Chatbot />
      <Toast />
    </>
  );
}
