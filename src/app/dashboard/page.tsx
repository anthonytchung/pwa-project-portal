"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Project {
  id: number;
  projectName: string;
  description: string;
  laborType: string;
  county: string;
  state: string;
  startdate: string;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
}

const DashboardPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<null | UserProfile>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects/retrieve", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          // console.log(data)
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
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile/retrieve", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          // Not logged in or unauthorized
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUser(null);
      }
    }

    fetchProfile();
    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleCreateProject = () => {
    router.push("/projects/new");
  };

  const handleJoinProject = () => {
    console.log("REDIRECTING")
    router.push("/epc/projects/overview");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header using shadcn components */}
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <h1 className="text-2xl font-bold">Dashboard</h1>
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
