"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
    photoUrl: "/solar_panels.webp", // Replace with your actual project photo path
    companyLogo: "/48fundlogo.svg",
  },
  {
    id: 2,
    projectName: "Commercial Rooftop PV",
    description: "Rooftop installation for multiple warehouses",
    laborType: "Heavy",
    county: "Orange",
    state: "California",
    startdate: "2025-06-10",
    photoUrl: "/solar_farm_placeholder.jpeg", // Replace with your actual project photo path
    companyLogo: "/48fundlogo.svg",
  },
];

export default function MockDashboardPage() {
  const router = useRouter();
  // We’ll store user & projects in local state for demonstration
  const [user] = useState(mockUser);
  const [projects] = useState(mockProjects);

  // Mock “Create Project” action
  const handleCreateProject = () => {
    console.log("Create Project button clicked (mock)!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <Link href="/dashboard">
          <h1 className="text-2xl font-bold cursor-pointer">Dashboard</h1>
        </Link>

        {/* Conditionally show a button based on user role */}
        {user?.role === "DEVELOPER" && (
          <Button onClick={handleCreateProject}>Create Project</Button>
        )}
        {user?.role === "EPC" && (
          <Link href="/epc/projects/overview">
            <Button>Join Project</Button>
          </Link>
        )}
        {user?.role === "SUBCONTRACTOR" && <Button>View Tasks</Button>}
      </header>

      <Separator />

      {/* Main content: Display project cards */}
      <main className="p-6 space-y-4">
        {projects.length === 0 ? (
          <p className="text-gray-700">No projects found.</p>
        ) : (
          projects.map((project) => (
            <Link key={project.id} href="/epc/projects/solarfarm">
              <Card className="p-4 transition-shadow hover:shadow-md cursor-pointer mb-2">
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-xl font-bold">
                    {project.projectName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* LEFT COLUMN: Project Photo + Basic Info */}
                    <div className="md:w-1/2 space-y-2">
                      {/* Project photo */}
                      <div className="relative w-full h-40 bg-gray-200 rounded overflow-hidden">
                        {/* 
                          If using Next.js <Image>, must specify fill or width/height 
                          If you prefer a static <img> tag, you can do so instead
                        */}
                        <Image
                          src={project.photoUrl}
                          alt={`${project.projectName} photo`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm text-gray-600">{project.description}</p>
                      <ul className="space-y-1 text-sm">
                        <li>
                          <strong>State:</strong> {project.state}
                        </li>
                        <li>
                          <strong>County:</strong> {project.county}
                        </li>
                        <li>
                          <strong>Start Date:</strong> {project.startdate}
                        </li>
                      </ul>
                    </div>

                    {/* RIGHT COLUMN: Compliance / Additional Info */}
                    <div className="md:w-1/2 bg-gray-50 p-3 rounded-md shadow-inner">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-semibold">
                          Compliance Summary
                        </h3>
                        {/* Example EPC Logo */}
                        <Image
                          src={project.companyLogo} // Replace with your actual EPC logo path
                          alt="EPC Company Logo"
                          width={40}
                          height={40}
                        />
                      </div>

                      <ul className="space-y-1 text-sm">
                        <li>
                          Apprenticeship Hours:{" "}
                          <Badge variant="secondary">12%</Badge>
                        </li>
                        <li>
                          Apprentice Ratio:{" "}
                          <Badge variant="secondary">Compliant</Badge>
                        </li>
                        <li>
                          Issues Found:{" "}
                          <Badge variant="destructive">1</Badge>
                        </li>
                        <li>
                          Overall Status:{" "}
                          <Badge variant="secondary">Good</Badge>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </main>
    </div>
  );
}
