// src/app/epc/projects/solarfarm/send/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SendToAccountingPage() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    setSending(true);
    // Simulate sending process; replace with actual API call if needed.
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center">
      <header className="w-full p-4 bg-white shadow">
        <h1 className="text-xl font-bold">Send Report to Accounting</h1>
      </header>
      <Separator />
      <main className="max-w-3xl w-full p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Confirm and Send Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              All issues have been resolved. Click the button below to send the project report to the accounting firm.
            </p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSend} disabled={sending || sent}>
              {sending ? "Sending..." : sent ? "Report Sent" : "Send Report"}
            </Button>
          </CardFooter>
        </Card>
        <div className="flex justify-center">
          <Link href="/epc/mockdashboard">
            <Button variant="ghost">Return to Dashboard</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
