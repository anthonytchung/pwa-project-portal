// src/app/epc/mockdashboard/page.tsx

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock user with EPC role
const mockUser = {
  id: 99,
  name: "EPC User",
  email: "epcuser@example.com",
  role: "EPC",
};

// Mock projects
const mockProjects = [
  {
    id: 1,
    projectName: "50 MW Solar Farm",
    description: "Large-scale solar project in Champaign County, IL",
    laborType: "Building",
    county: "Champaign",
    state: "Illinois",
    startdate: "2025-05-01",
  },
  {
    id: 2,
    projectName: "Commercial Rooftop PV",
    description: "Rooftop installation for multiple warehouses",
    laborType: "Heavy",
    county: "Orange",
    state: "California",
    startdate: "2025-06-10",
  },
];

export default function MockDashboardPage() {
  const router = useRouter();

  // We’ll store user & projects in local state for demonstration
  const [user] = useState(mockUser);
  const [projects] = useState(mockProjects);

  // Mock “Join Project” action
  const handleJoinProject = () => {
    console.log("Join Project button clicked (mock)!");
    // e.g. router.push("/epc/projects/overview");
  };

  // Mock “Create Project” action
  const handleCreateProject = () => {
    console.log("Create Project button clicked (mock)!");
    // e.g. router.push("/projects/new");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <h1 className="text-2xl font-bold">EPC Mock Dashboard</h1>
        {user && user.role === "DEVELOPER" && (
          <Button onClick={handleCreateProject}>Create Project</Button>
        )}

        {user && user.role === "EPC" && (
          <Button onClick={handleJoinProject}>Join Project</Button>
        )}

        {user && user.role === "SUBCONTRACTOR" && (
          <Button>View Tasks</Button>
        )}
      </header>

      <Separator />

      {/* Main content: Display project cards */}
      <main className="p-6 grid gap-4">
        {projects.length === 0 ? (
          <p className="text-gray-700">No projects found.</p>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="p-4">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{project.projectName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{project.description}</p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="secondary">State: {project.state}</Badge>
                  <Badge variant="secondary">County: {project.county}</Badge>
                  <Badge variant="secondary">
                    Start Date: {project.startdate}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </main>
    </div>
  );
}
