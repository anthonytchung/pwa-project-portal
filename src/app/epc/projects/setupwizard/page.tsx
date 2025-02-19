"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from 'next/link'

export default function LocalEPCSetupWizard() {
  // Steps: 1 = Link Payroll, 2 = Tag Employees, 3 = Finished
  const [step, setStep] = useState(1);

  // Basic state
  const [payrollProvider, setPayrollProvider] = useState("");
  const [employees, setEmployees] = useState([
    { id: 101, name: "Jane Smith", laborType: "" },
    { id: 102, name: "John Doe", laborType: "" },
  ]);

  // Navigation
  const goNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  // Step 1: Link Payroll
  const handleLinkPayroll = () => {
    if (!payrollProvider) {
      alert("Please select a payroll provider!");
      return;
    }
    goNext(); // proceed to step 2
  };

  // Step 2: Tag Employees
  const handleTagEmployees = () => {
    // alert("Employees tagged (mock)!");
    goNext(); // proceed to step 3 (Finish)
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-slate-100 p-6 flex flex-col items-center">
      {/* Wizard Title */}
      <div className="mb-8 text-center space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">
          EPC Setup Wizard
        </h1>
        <p className="text-sm text-gray-600">
          Complete these steps to finalize your project setup.
        </p>
      </div>

      {/* Wizard Container */}
      <div className="max-w-3xl w-full bg-white/60 backdrop-blur-md rounded-xl shadow-lg p-6 relative">
        {/* Step Progress */}
        <WizardProgress step={step} />

        {/* Step 1: Link Payroll */}
        {step === 1 && (
          <Card className="mt-6 border-0 bg-transparent shadow-none">
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-bold">Step 1: Link Payroll</CardTitle>
              <CardDescription className="mt-1 text-gray-500">
                Choose or simulate linking your payroll provider (mock).
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Payroll Provider
                </label>
                <select
                  value={payrollProvider}
                  onChange={(e) => setPayrollProvider(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Select Provider</option>
                  <option value="adp">ADP</option>
                  <option value="gusto">Gusto</option>
                  <option value="quickbooks">QuickBooks</option>
                  <option value="manual">Manual (CSV Upload)</option>
                </select>
              </div>
            </CardContent>
            <CardFooter className="p-0 mt-4 flex justify-between">
              {/* Back button is hidden in step 1 because there's nowhere to go */}
              <div />
              <Button variant="default" onClick={handleLinkPayroll}>
                Next
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Tag Employees */}
        {step === 2 && (
          <Card className="mt-6 border-0 bg-transparent shadow-none">
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-bold">Step 2: Tag Employees</CardTitle>
              <CardDescription className="mt-1 text-gray-500">
                Assign labor types or classifications (mock).
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-4">
              <p className="mb-2 text-sm text-gray-600">
                Employees:
              </p>
              <Separator className="my-2" />
              {employees.map((emp) => (
                <div key={emp.id} className="flex items-center gap-3 mb-3">
                  <div className="flex-1 text-gray-800 font-medium">
                    {emp.name}
                  </div>
                  <select
                    className="
                      border border-gray-300
                      rounded px-3 py-1
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-300
                      text-gray-700
                    "
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
            <CardFooter className="p-0 mt-4 flex justify-between">
              <Button variant="outline" onClick={goBack}>
                Back
              </Button>
              <Button variant="default" onClick={handleTagEmployees}>
                Finish Setup
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Finish Screen */}
        {step === 3 && (
          <Card className="mt-6 border-0 bg-transparent shadow-none text-center">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-bold">All Done!</CardTitle>
              <CardDescription className="mt-1 text-gray-500">
                You’ve completed all necessary steps.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-sm text-gray-600 mb-4">
                Congratulations on finishing your EPC setup.
              </p>
            </CardContent>
            <CardFooter className="p-0 flex justify-center">
              <Link href="/epc/mockdashboard">
                <Button variant="default" >
                  Return to Dashboard
                </Button>
              </Link>
              
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}

// Updated progress bar for three steps
function WizardProgress({ step }: { step: number }) {
  // We'll define each step label
  const steps = ["Link Payroll", "Tag Employees", "Finish"];
  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-3">
      {steps.map((label, idx) => {
        const stepNumber = idx + 1;
        const isActive = step === stepNumber;
        const isComplete = step > stepNumber;

        // Circle color logic
        const circleClasses = isComplete
          ? "bg-green-500 text-white"
          : isActive
          ? "bg-blue-500 text-white animate-pulse"
          : "bg-gray-200 text-gray-600";

        return (
          <div
            key={label}
            className="flex flex-1 items-center last:flex-none relative"
          >
            {/* Circle */}
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full font-bold transition-all ${circleClasses}`}
            >
              {isComplete ? "✓" : stepNumber}
            </div>

            {/* Label */}
            <div className="ml-2 text-sm font-medium text-gray-700">
              {label}
            </div>

            {/* Connecting line except for last step */}
            {idx < steps.length - 1 && (
              <div className="flex-1 h-[2px] bg-gray-200 mx-2 mt-[-1px]" />
            )}
          </div>
        );
      })}
    </div>
  );
}
