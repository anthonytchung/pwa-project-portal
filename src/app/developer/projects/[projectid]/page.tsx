// src/app/projects/[projectid]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fetchProjectById, Project } from "@/lib/api"; // Assume you create a function to fetch a single project

export default function ProjectOverviewPage() {
  const { projectid } = useParams<{ projectid: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      // Replace fetchProjectById with your API call; for now, use a placeholder
      const fetchedProject = await fetchProjectById(projectid);
      setProject(fetchedProject);
      setLoading(false);
    }

    if (projectid) {
      loadProject();
    }
  }, [projectid]);

  if (loading) {
    return <p>Loading project details...</p>;
  }

  if (!project) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Project Overview</h1>
        <p>No project details available.</p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{project.projectName}</h1>
      <Separator className="mb-4" />
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{project.description || "No description provided."}</p>
          <ul className="mt-4 space-y-2">
            <li>
              <strong>Location:</strong> {project.state}, {project.county}
            </li>
            <li>
              <strong>Start Date:</strong> {project.startdate || "Not specified"}
            </li>
            {/* Add more fields as necessary */}
          </ul>
        </CardContent>
        <CardFooter className="mt-4">
          <Button onClick={() => window.history.back()}>Back to Dashboard</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
