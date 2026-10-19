import type { Metadata } from "next";
import { Figtree, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { AppChrome } from "@/components/AppChrome";
import { Providers } from "@/components/Providers";
import { Suspense } from "react";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

/** Bahij Zar by Bahij Virtual Academy — personal use; Dari & Pashto UI */
const bahijZar = localFont({
  src: [
    {
      path: "../fonts/bahij-zar/BahijZar-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/bahij-zar/BahijZar-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bahij-zar",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ATOMA — Afghanistan Telecom Demo",
  description: "UI-only MVP demo for ATOMA telecom: plans, self-care, shop, and admin.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${figtree.variable} ${bahijZar.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          <Suspense
            fallback={
              <div className="flex flex-1 items-center justify-center p-8 text-[var(--ink-soft)]">
                Loading ATOMA…
              </div>
            }
          >
            <AppChrome>{children}</AppChrome>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
