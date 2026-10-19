"use client";

import { useDemo } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

export function ProtectedRoute({
  children,
  adminOnly = false,
}: {
  children: ReactNode;
  adminOnly?: boolean;
}) {
  const { session, hydrated } = useDemo();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !hydrated) return;
    if (!session) {
      router.replace(adminOnly ? "/admin/login" : "/auth/login");
      return;
    }
    if (adminOnly && session.role !== "admin") {
      router.replace("/admin/login");
    }
  }, [mounted, hydrated, session, adminOnly, router]);

  if (!mounted || !hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-[var(--ink-soft)]">
        Loading demo state…
      </div>
    );
  }

  if (!session || (adminOnly && session.role !== "admin")) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-[var(--ink-soft)]">
        Redirecting to login…
      </div>
    );
  }

  return <>{children}</>;
}
