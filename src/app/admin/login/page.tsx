"use client";

import { PageHero } from "@/components/PageHero";
import { TextInput } from "@/components/FormField";
import { t } from "@/lib/i18n";
import { useDemo } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const { language, requestOtp, loginWithOtp, loginAdminPassword } = useDemo();
  const router = useRouter();
  const [mode, setMode] = useState<"otp" | "password">("password");
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("0700000000");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <PageHero
        title={`${t(language, "admin")} login`}
        subtitle="Mobile 0700000000 + any 6-digit OTP, or password admin123."
      />
      <div className="mx-auto max-w-md px-4 py-10 sm:px-6">
        <div className="mb-4 flex gap-2">
          <button
            type="button"
            className="tab"
            data-active={mode === "password"}
            onClick={() => setMode("password")}
          >
            Password
          </button>
          <button
            type="button"
            className="tab"
            data-active={mode === "otp"}
            onClick={() => setMode("otp")}
          >
            OTP
          </button>
        </div>

        {mode === "password" ? (
          <form
            className="panel space-y-4 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (loginAdminPassword(password)) router.push("/admin");
            }}
          >
            <TextInput
              label={t(language, "password")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              hint="admin123"
            />
            <button type="submit" className="btn btn-primary w-full">
              {t(language, "login")}
            </button>
          </form>
        ) : (
          <form
            className="panel space-y-4 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (step === "mobile") {
                requestOtp(mobile);
                setStep("otp");
                return;
              }
              if (loginWithOtp(mobile, otp)) router.push("/admin");
            }}
          >
            {step === "mobile" ? (
              <TextInput
                label={t(language, "mobile")}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            ) : (
              <TextInput
                label={t(language, "otp")}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
              />
            )}
            <button type="submit" className="btn btn-primary w-full">
              {step === "mobile" ? t(language, "sendOtp") : t(language, "verify")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
