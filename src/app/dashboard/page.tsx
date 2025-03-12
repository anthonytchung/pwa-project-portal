"use client";

import Link from "next/link";
import Image from "next/image";
import { fetchProfile, fetchProjects, Project, UserProfile } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const userData = await fetchProfile();
      const projectData = await fetchProjects();
      setUser(userData);
      setProjects(projectData || []);
    }
    loadData();
  }, []);

  const handleCreateProject = () => {
    router.push("/developer/projects/setupwizard");
  };

  const handleJoinProject = () => {
    router.push("/epc/projects/invites");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <Link href="/dashboard">
          <h1 className="text-2xl font-bold cursor-pointer">
            {user?.role === "DEVELOPER"
              ? "Developer Dashboard"
              : user?.role === "EPC"
              ? "EPC Dashboard"
              : "Subcontractor Dashboard"}
          </h1>
        </Link>
        {user?.role === "DEVELOPER" && (
          <Button onClick={handleCreateProject}>Create Project</Button>
        )}
        {user?.role === "EPC" && (
          <Button onClick={handleJoinProject}>Join Project</Button>
        )}
        {user?.role === "SUBCONTRACTOR" && <Button>View Tasks</Button>}
      </header>

      <Separator />

      {/* Main Content */}
      <main className="p-6 space-y-4">
        {projects.length === 0 ? (
          <p className="text-gray-700">No projects found.</p>
        ) : (
          projects.map((project) => (
            <Link key={project.id} href={`/developer/projects/${project.id}`}>
              <Card className="p-4 transition-shadow hover:shadow-md cursor-pointer mb-2">
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-xl font-bold">
                    {project.projectName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* LEFT COLUMN: Project Photo & Basic Info */}
                    <div className="md:w-1/2 space-y-2">
                      <div className="relative w-full h-40 bg-gray-200 rounded overflow-hidden">
                        <Image
                          src={project.photoUrl || "/placeholder.png"}
                          alt={`${project.projectName} photo`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm text-gray-600">
                        {project.description || "No project description provided."}
                      </p>
                      <ul className="space-y-1 text-sm">
                        <li>
                          <strong>Location:</strong> {project.latitude}, {project.longitude}
                        </li>
                        <li>
                          <strong>Start Date:</strong> {project.startdate || "Not specified"}
                        </li>
                      </ul>
                    </div>

                    {/* RIGHT COLUMN: Compliance Summary */}
                    <div className="md:w-1/2 bg-gray-50 p-4 rounded-md shadow-inner">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-semibold">
                          Compliance Summary
                        </h3>
                        <Image
                          src={project.companyLogo || "/48fundlogo.svg"}
                          alt="Company Logo"
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
                          <Badge variant="secondary">Good Standing</Badge>
                        </li>
                        <li>
                          Number of Contractors:{" "}
                          <Badge variant="secondary">5</Badge>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="mt-4 p-0">
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/projects/${project.id}`)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))
        )}
      </main>
    </div>
  );
}
