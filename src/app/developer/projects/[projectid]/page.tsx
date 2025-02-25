// src/app/projects/[projectId]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Import DropdownMenu components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type Employee = {
  id: number;
  name: string;
  laborType: string;
};

export default function ProjectDetailPage() {
  // useParams returns an object with your dynamic segments.
  const { projectid } = useParams<{ projectid: string }>();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState({ name: "", laborType: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Define the four labor type options
  const laborTypes = ["Building", "Heavy", "Highway", "Residential"];

  // Function to fetch employees for the project
  async function fetchEmployees() {
    try {
      const res = await fetch(
        `/api/projects/${projectid}/employees/retrieve`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setEmployees(data.employees);
      } else {
        console.log("projectid:", projectid);
        router.push("/login");
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (projectid) {
      fetchEmployees();
    }
  }, [projectid, router]);

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!newEmployee.name || !newEmployee.laborType) {
      setError("All fields are required.");
      return;
    }
    try {
      const res = await fetch(
        `/api/projects/${projectid}/employees/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(newEmployee),
        }
      );
      if (res.ok) {
        fetchEmployees();
        setNewEmployee({ name: "", laborType: "" });
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create employee");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <h1 className="text-2xl font-bold">Project Detail</h1>
      </header>
      <Separator />
      <main className="p-6">
        <h2 className="text-xl mb-4">Employees</h2>
        {employees.length === 0 ? (
          <p>No employees yet.</p>
        ) : (
          employees.map((emp) => (
            <Card key={emp.id} className="p-4 mb-4">
              <CardHeader>
                <CardTitle>{emp.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Labor Type: {emp.laborType}</p>
                <Button
                  onClick={async () => {
                    const res = await fetch(
                      `/api/employees/${emp.id}/wage`,
                      { credentials: "include" }
                    );
                    if (res.ok) {
                      const data = await res.json();
                      alert(`Wage Determination: ${data.wage}`);
                    } else {
                      alert("Failed to fetch wage determination.");
                    }
                  }}
                >
                  View Wage Determination
                </Button>
              </CardContent>
            </Card>
          ))
        )}
        <h2 className="text-xl mt-8 mb-4">Add New Employee</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleCreateEmployee} className="space-y-4">
          <div>
            <Label htmlFor="emp-name">Employee Name</Label>
            <Input
              id="emp-name"
              name="name"
              placeholder="Enter employee name"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="labor-type">Labor Type</Label>
            {/* Replace the input with a dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full mt-1">
                  {newEmployee.laborType || "Select Labor Type"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Labor Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {laborTypes.map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onSelect={() =>
                      setNewEmployee({ ...newEmployee, laborType: type })
                    }
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button type="submit">Add Employee</Button>
        </form>
      </main>
    </div>
  );
}
