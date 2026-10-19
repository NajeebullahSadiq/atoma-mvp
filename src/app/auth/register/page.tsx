"use client";

import { PageHero } from "@/components/PageHero";
import { TextInput } from "@/components/FormField";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const { language, requestOtp, register } = useDemo();
  const router = useRouter();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div>
      <PageHero title={t(language, "register")} subtitle="Create a demo profile with OTP mock." />
      <div className="mx-auto max-w-md px-4 py-10 sm:px-6">
        <form
          className="panel space-y-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (step === "form") {
              requestOtp(mobile);
              setStep("otp");
              return;
            }
            if (register(name, mobile, otp)) router.push("/account");
          }}
        >
          {step === "form" ? (
            <>
              <TextInput label={t(language, "name")} value={name} onChange={(e) => setName(e.target.value)} required />
              <TextInput
                label={t(language, "mobile")}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </>
          ) : (
            <TextInput
              label={t(language, "otp")}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              hint="Enter any 6 digits"
            />
          )}
          <button type="submit" className="btn btn-primary w-full">
            {step === "form" ? t(language, "sendOtp") : t(language, "verify")}
          </button>
          <p className="text-center text-sm text-[var(--ink-soft)]">
            Have an account?{" "}
            <Link href="/auth/login" className="font-semibold underline">
              {t(language, "login")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
