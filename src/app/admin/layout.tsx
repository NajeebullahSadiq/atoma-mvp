"use client";

import { AdminNav } from "@/components/AdminNav";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) return <>{children}</>;

  return (
    <ProtectedRoute adminOnly>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <AdminNav />
        {children}
      </div>
    </ProtectedRoute>
  );
}
