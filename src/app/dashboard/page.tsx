"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Project = {
  id: number;
  name: string;
  description: string;
  laborType: string;
  county: string;
  state: string,
};

const DashboardPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "loading") return; // Wait for session to load
  //   if (!session) {
  //     router.push("/login"); // Redirect to login if not authenticated
  //   }
  // }, [session, status]);

  // if (status === "loading") return <div>Loading...</div>;
  
  

  // Dummy data simulating API fetch of existing projects
  useEffect(() => {
    setProjects([
      {
        id: 1,
        name: "Project Alpha",
        description: "This is the description for Project Alpha.",
        laborType: "Construction",
        county: "Orange County",
      },
      {
        id: 2,
        name: "Project Beta",
        description: "This is the description for Project Beta.",
        laborType: "IT",
        county: "San Francisco",
      },
      // Add more projects as necessary
    ]);
  }, []);

  const handleCreateProject = () => {
    router.push("/projects/new");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header using shadcn components */}
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={handleCreateProject}>Create Project</Button>
      </header>
      
      <Separator />

      {/* Main content: Display project cards */}
      <main className="p-6 grid gap-4">
        {projects.length === 0 ? (
          <p className="text-gray-700">No projects found.</p>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="p-4">
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{project.description}</p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="secondary">
                    Labor: {project.laborType}
                  </Badge>
                  <Badge variant="secondary">
                    County: {project.county}
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
