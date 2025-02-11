// src/app/api/projects/retrieve/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { projectid: string } }) {
  const token = req.cookies.get("auth-token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.PRIVATEKEY as string) as {
      userId: number;
    };
    const { projectid } = await params;
    const projectId = parseInt(projectid, 10);
    console.log(projectId)

    // Verify that the project exists and belongs to the logged-in user
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project || project.userId !== decoded.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Query projects for the authenticated user
    const employees = await prisma.employee.findMany({
      where: { projectId: projectId },
    });

    return NextResponse.json({ employees }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving employees:", error);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
