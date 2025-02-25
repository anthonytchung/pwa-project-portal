"use client";

import Link from "next/link";
import { fetchProfile, fetchProjects, Project, UserProfile } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";


const DashboardPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<null | UserProfile>(null);
  const router = useRouter();
  

  useEffect(() => {
    async function loadData() {
      const userData = await fetchProfile();
      const projectData = await fetchProjects();
      setUser(userData);
      setProjects(projectData);
    }

    loadData();
  }, []);

  const handleCreateProject = () => {
    router.push("/developer/projects/setupwizard");
  };

  const handleJoinProject = () => {
    // console.log("REDIRECTING")
    router.push("/epc/projects/invites");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header using shadcn components */}
      <header className="flex items-center justify-between p-4 bg-white shadow">
        {user && user.role === "DEVELOPER" && (
          <h1 className="text-2xl font-bold">Developer Dashboard</h1>
        )}
        {user && user.role === "EPC" && (
          <h1 className="text-2xl font-bold">EPC Dashboard</h1>
        )}
        {user && user.role === "SUBCONTRACTOR" && (
          <h1 className="text-2xl font-bold">Subcontractor Dashboard</h1>
        )}
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
                <div>
                  <CardTitle>{project.projectName}</CardTitle>
                </div>

              </CardHeader>
              <CardContent>
                <p>{project.description}</p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="secondary">State: {project.state}</Badge>
                  <Badge variant="secondary">County: {project.county}</Badge>
                  <Badge variant="secondary">
                    Created: {project.startdate}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
