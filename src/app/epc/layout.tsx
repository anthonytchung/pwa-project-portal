// src/app/epc/layout.tsx
"use client";

import Sidebar from "@/components/sidebar";

export default function EPCLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      
      <main className="flex-1">{children}</main>
    </div>
  );
}
