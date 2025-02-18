// src/app/api/projects/[projectId]/employees/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest, { params }: { params: { projectid: string } }) {
  const token = req.cookies.get("auth-token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify the token and get the user information
    const decoded = jwt.verify(token, process.env.PRIVATEKEY as string) as { userId: number };
    
    const { projectid } = await params;
    const parsedProjectId = parseInt(projectid, 10);
    // console.log(decoded.userId)
    // console.log(projectId)

    // Verify that the project exists and belongs to the logged-in user
    const project = await prisma.project.findUnique({
      where: { id: parsedProjectId },
    });
    if (!project || project.userId !== decoded.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Parse the request body for employee data
    const { name, laborType } = await req.json();
    if (!name || !laborType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create the new employee
    const employee = await prisma.employee.create({
      data: {
        name,
        laborType,
        projectId: parsedProjectId,
      },
    });

    return NextResponse.json({ message: "Employee created", employeeId: employee.id }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating employee:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
