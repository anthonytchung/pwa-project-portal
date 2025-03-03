// src/app/epc/projects/solarfarm/page.tsx
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

// Dummy data for the Hours by Week bar chart
const weeklyHours = [50, 75, 60, 90];
const barData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Hours Worked",
      data: weeklyHours,
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
  scales: {
    x: { title: { display: true, text: "Week" } },
    y: { title: { display: true, text: "Hours Worked" } },
  },
};

// Dummy data for the Hours by Subcontractor pie chart
const pieData = {
  labels: ["Riverside Solar", "Anthony EPC", "AMPS", "BTB Energy"],
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

// Calculate cumulative hours from the weekly data
const cumulativeHours = weeklyHours.reduce<number[]>((acc, hours, idx) => {
  if (idx === 0) return [hours];
  return [...acc, acc[idx - 1] + hours];
}, []);

const cumulativeData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Cumulative Hours",
      data: cumulativeHours,
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
  ],
};

const cumulativeOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Cumulative Hours" },
  },
  scales: {
    x: { title: { display: true, text: "Week" } },
    y: { title: { display: true, text: "Total Hours" } },
  },
};

// Dummy issues array; each issue has a description and a resolved status.
const initialIssues = [
  { id: 1, description: "Week ending 2/14: 0% apprentice hours", resolved: false },
  { id: 2, description: "Week ending 2/21: Data missing for subcontractor", resolved: true },
];

export default function SolarFarmPage() {
  // Store issues in state so we can update them.
  const [issues, setIssues] = useState(initialIssues);

  // Calculate the number of unresolved issues.
  const unresolvedCount = issues.filter((i) => !i.resolved).length;

  // Toggle the resolution status of an issue.
  const handleResolve = (id: number) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === id ? { ...issue, resolved: !issue.resolved } : issue
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Top Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <h1 className="text-xl sm:text-2xl font-bold">50 MW Solar Farm Overview</h1>
        <div className="flex items-center gap-2">
          {unresolvedCount > 0 && (
            <Badge variant="destructive">{unresolvedCount} Unresolved</Badge>
          )}
          <Link href="/epc/projects/solarfarm/send">
            <Button variant="default" className="flex items-center gap-2">
              Send Report to Accounting
              <ArrowRightCircle className="h-5 w-5" />
            </Button>
          </Link>
        </div>
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

        {/* Cumulative Hours Chart */}
        <section>
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Cumulative Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar data={cumulativeData} options={cumulativeOptions} />
            </CardContent>
          </Card>
        </section>

        {/* Issues Log */}
        <section>
          <h2 className="text-xl font-bold mb-2">
            Issues Log{" "}
            {unresolvedCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unresolvedCount} Unresolved
              </Badge>
            )}
          </h2>
          {issues.length === 0 ? (
            <p className="text-gray-700">No issues reported.</p>
          ) : (
            <ul className="space-y-2 list-decimal list-inside text-sm">
              {issues.map((issue) => (
                <li key={issue.id} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {!issue.resolved && <AlertCircle className="h-4 w-4 text-red-500" />}
                    {issue.description}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-4"
                    onClick={() => handleResolve(issue.id)}
                  >
                    {issue.resolved ? "Resolved" : "Resolve"}
                  </Button>
                </li>
              ))}
            </ul>
          )}
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
        <p className="text-gray-600 text-sm">{label}</p>
      </CardContent>
    </Card>
  );
}
