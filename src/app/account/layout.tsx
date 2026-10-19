"use client";

import { AccountNav } from "@/components/AccountNav";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import type { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <AccountNav />
        {children}
      </div>
    </ProtectedRoute>
  );
}
