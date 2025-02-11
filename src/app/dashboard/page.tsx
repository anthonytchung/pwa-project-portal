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
  projectName: string;
  description: string;
  laborType: string;
  county: string;
  state: string,
};

const DashboardPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("http://localhost:3000/api/projects/retrieve", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setProjects(data.projects);
        } else {
          // If the user is unauthorized (e.g. no valid token), redirect to login.
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching projects", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // useEffect(() => {
  //   setProjects([
  //     {
  //       id: 1,
  //       name: "Project Alpha",
  //       description: "This is the description for Project Alpha.",
  //       laborType: "Construction",
  //       county: "Orange County",
  //     },
  //     {
  //       id: 2,
  //       name: "Project Beta",
  //       description: "This is the description for Project Beta.",
  //       laborType: "IT",
  //       county: "San Francisco",
  //     },
  //     // Add more projects as necessary
  //   ]);
  // }, []);

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
                <CardTitle>{project.projectName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{project.description}</p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="secondary">
                    State: {project.state}
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
