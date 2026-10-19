"use client";

import { PageHero } from "@/components/PageHero";
import { TextInput } from "@/components/FormField";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { language, requestOtp, loginWithOtp } = useDemo();
  const router = useRouter();
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("0771234567");
  const [otp, setOtp] = useState("");

  return (
    <div>
      <PageHero title={t(language, "login")} subtitle="Enter mobile → any 6-digit OTP. Seed user: 0771234567" />
      <div className="mx-auto max-w-md px-4 py-10 sm:px-6">
        <form
          className="panel space-y-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (step === "mobile") {
              requestOtp(mobile);
              setStep("otp");
              return;
            }
            if (loginWithOtp(mobile, otp)) router.push("/account");
          }}
        >
          {step === "mobile" ? (
            <TextInput
              label={t(language, "mobile")}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              hint="Try 0771234567 (seed) or 0700000000 (admin)"
            />
          ) : (
            <TextInput
              label={t(language, "otp")}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              inputMode="numeric"
              hint="Enter any 6 digits"
            />
          )}
          <button type="submit" className="btn btn-primary w-full">
            {step === "mobile" ? t(language, "sendOtp") : t(language, "verify")}
          </button>
          {step === "otp" ? (
            <button type="button" className="btn btn-secondary w-full" onClick={() => setStep("mobile")}>
              {t(language, "back")}
            </button>
          ) : null}
          <p className="text-center text-sm text-[var(--ink-soft)]">
            No account?{" "}
            <Link href="/auth/register" className="font-semibold text-[var(--ink)] underline">
              {t(language, "register")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
