"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

// Import Chart.js and react-chartjs-2 components
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Dummy data for the Bar chart (Hours by Week)
const barData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Hours Worked",
      data: [50, 75, 60, 90],
      backgroundColor: "rgba(54, 162, 235, 0.5)",
    },
  ],
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Hours by Week" },
  },
};

// Dummy data for the Pie chart (Hours by Subcontractor)
const pieData = {
  labels: ["Sub 1", "Sub 2", "Sub 3", "Sub 4"],
  datasets: [
    {
      label: "Hours by Subcontractor",
      data: [20, 30, 25, 15],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
      ],
    },
  ],
};

// Dummy issues array; each issue has a description and a status.
const dummyIssues = [
  { id: 1, description: "Week ending 2/14: 0% apprentice hours", resolved: false },
  { id: 2, description: "Week ending 2/21: Data missing for subcontractor", resolved: true },
];

export default function SolarFarmPage() {
  // Check if there are any unresolved issues
  const unresolvedCount = dummyIssues.filter((i) => !i.resolved).length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Top Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <h1 className="text-xl sm:text-2xl font-bold">50 MW Solar Farm Overview</h1>
      </header>
      <Separator />

      <main className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Project Info & Stats */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Mahoney Solar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold">Location:</p>
              <p>Champaign County, Illinois</p>
            </div>
            <div>
              <p className="font-semibold">Project Start Date:</p>
              <p>May 1, 2025</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Total Hours Worked" value="1902" />
            <StatCard label="Number of Employees" value="47" />
            <StatCard label="Apprentice Hours" value="16.25%" />
            <StatCard label="Subcontractors" value="5" />
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Hours by Week</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar data={barData} options={barOptions} />
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Hours by Subcontractor</CardTitle>
            </CardHeader>
            <CardContent>
              <Pie data={pieData} />
            </CardContent>
          </Card>
        </section>

        {/* Issues Log */}
        <section>
          <h2 className="text-xl font-bold mb-2">Issues Log</h2>
          {dummyIssues.length === 0 ? (
            <p className="text-gray-700">No issues reported.</p>
          ) : (
            <ul className="space-y-2 list-decimal list-inside text-sm">
              {dummyIssues.map((issue) => (
                <li key={issue.id} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {!issue.resolved && <AlertCircle className="h-4 w-4 text-red-500" />}
                    {issue.description}
                  </span>
                  <Button variant="outline" size="sm" className="ml-4">
                    {issue.resolved ? "Resolved" : "Resolve"}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Send to Accounting Section */}
        <section className="flex items-center justify-end">
          <Link href="/epc/projects/solarfarm/send">
            <Button variant="default" className="flex items-center gap-2">
              Send Report to Accounting
              <ArrowRightCircle className="h-5 w-5" />
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
}

// Simple stat card component
function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4 flex flex-col items-center justify-center text-center">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-3xl font-bold">{value}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-gray-600">{label}</p>
      </CardContent>
    </Card>
  );
}
