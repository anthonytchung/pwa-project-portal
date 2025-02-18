"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function EPCSetupPage() {
  const { projectid } = useParams(); 
  const router = useRouter();

  // Current wizard step: 1 = Accept Invite, 2 = Link Payroll, 3 = Tag Employees
  // Feel free to store it in localStorage if you want to preserve step on refresh.
  const [step, setStep] = useState(1);

  // Minimal state for the wizard
  const [inviteAccepted, setInviteAccepted] = useState(false);
  const [payrollProvider, setPayrollProvider] = useState("");
  const [employees, setEmployees] = useState([
    { id: 101, name: "Jane Smith", laborType: "" },
    { id: 102, name: "John Doe", laborType: "" },
  ]);

  // For demonstration only; these could be real calls or placeholders.
  const handleAcceptInvite = async () => {
    // In a real app, you'd call /api/projects/[projectid]/acceptInvite or something similar.
    setInviteAccepted(true);
    // Next step
    setStep(2);
  };

  const handleLinkPayroll = async () => {
    // Fake linking logic. Possibly call a real API or just do nothing.
    if (!payrollProvider) return alert("Please select a payroll provider!");
    // Next step
    setStep(3);
  };

  const handleTagEmployees = () => {
    // In a real app, you'd call your employees API to finalize the labor types, etc.
    // For now, we just move on
    alert("Employees tagged (mock).");
    // Maybe redirect to final dashboard or do step = 4 if you have more steps
    router.push(`/projects/${projectid}/dashboard`);
  };

  // Render the wizard steps
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">EPC Setup Wizard</h1>
      <WizardProgress step={step} />

      {step === 1 && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Step 1: Accept Invite</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">This step confirms you’re joining the project.</p>
            {!inviteAccepted ? (
              <Button onClick={handleAcceptInvite}>Accept Invitation</Button>
            ) : (
              <p>You have accepted the invite!</p>
            )}
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Step 2: Link Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Choose or simulate linking your payroll provider.</p>
            <select
              value={payrollProvider}
              onChange={(e) => setPayrollProvider(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="">Select Provider</option>
              <option value="adp">ADP</option>
              <option value="gusto">Gusto</option>
              <option value="quickbooks">QuickBooks</option>
              <option value="manual">Manual (CSV Upload)</option>
            </select>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLinkPayroll}>Next</Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Step 3: Tag Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">
              Below is a list of your employees. Assign labor types or classifications:
            </p>
            <Separator className="my-2" />
            {employees.map((emp) => (
              <div key={emp.id} className="flex items-center gap-2 mb-2">
                <p className="w-40">{emp.name}</p>
                <select
                  className="border rounded px-2 py-1"
                  value={emp.laborType}
                  onChange={(e) => {
                    const newVal = e.target.value;
                    setEmployees((prev) =>
                      prev.map((item) =>
                        item.id === emp.id ? { ...item, laborType: newVal } : item
                      )
                    );
                  }}
                >
                  <option value="">Select labor type</option>
                  <option value="Building">Building</option>
                  <option value="Heavy">Heavy</option>
                  <option value="Highway">Highway</option>
                  <option value="Residential">Residential</option>
                </select>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button onClick={handleTagEmployees}>Finish Setup</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

// A small progress bar or step indicator
function WizardProgress({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-between mb-2">
      {/* You can style these however you want, or use a more advanced stepper component */}
      {["Accept Invite", "Link Payroll", "Tag Employees"].map((label, idx) => {
        const stepNumber = idx + 1;
        const isActive = step === stepNumber;
        const isComplete = step > stepNumber;

        return (
          <div key={label} className="flex items-center space-x-2">
            <div
              className={
                isComplete
                  ? "w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center"
                  : isActive
                  ? "w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center"
                  : "w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center"
              }
            >
              {isComplete ? "✓" : stepNumber}
            </div>
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
