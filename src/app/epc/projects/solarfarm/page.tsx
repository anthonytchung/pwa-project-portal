// src/app/epc/projects/solarfarm/page.tsx

"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function SolarFarmPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Top Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <h1 className="text-xl sm:text-2xl font-bold">
          50 MW Solar Farm Overview (Mock)
        </h1>
      </header>
      <Separator />

      <main className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Project Info & Stats */}
        <section>
          <h2 className="text-2xl font-bold">Project Name</h2>
          <p className="text-sm text-gray-600 mb-4">
            Sub details (location, county, etc.)
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Big stat cards */}
            <StatCard label="Total Hours Worked" value="1902" />
            <StatCard label="Number of Employees" value="47" />
            <StatCard label="Apprentice Hours" value="16.25%" />
            <StatCard label="Subcontractors" value="5" />
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Left chart */}
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Hours by Week</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Mock chart placeholder */}
              <div className="h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                [ Mock Chart Placeholder ]
              </div>
            </CardContent>
          </Card>

          {/* Right chart */}
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Hours by Subcontractor</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Mock chart placeholder */}
              <div className="h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                [ Mock Chart Placeholder ]
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Issues Log */}
        <section>
          <h2 className="text-xl font-bold mb-2">Issues Log</h2>
          <ul className="space-y-2 list-decimal list-inside text-sm text-gray-700">
            <li className="flex items-center justify-between">
              <span>
                During week ending 2/14 AMPs logged 79 hours of total work.
                0% of the hours logged were by apprentice workers
              </span>
              <Button variant="outline" className="ml-4">
                Click to Resolve
              </Button>
            </li>
            <li className="flex items-center justify-between">
              <span>
                During week ending 2/14 AMPs logged 79 hours of total work.
                0% of the hours logged were by apprentice workers
              </span>
              <Button variant="outline" className="ml-4">
                Click to Resolve
              </Button>
            </li>
            <li className="flex items-center justify-between">
              <span>
                During week ending 2/14 AMPs logged 79 hours of total work.
                0% of the hours logged were by apprentice workers
              </span>
              <Button variant="outline" className="ml-4">
                Click to Resolve
              </Button>
            </li>
            <li className="flex items-center justify-between">
              <span>
                During week ending 2/14 AMPs logged 79 hours of total work.
                0% of the hours logged were by apprentice workers
              </span>
              <Button variant="outline" className="ml-4">
                Click to Resolve
              </Button>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

// Simple stat card for the summary boxes
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
