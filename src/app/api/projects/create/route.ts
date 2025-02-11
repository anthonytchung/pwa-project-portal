// src/app/api/projects/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  // console.log(req)
  // console.log(req.json())
  const token = req.cookies.get("auth-token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATEKEY as string) as {
      userId: number;
      email: string;
    };

    // Include startDate in your destructuring
    const {
      projectName,
      description,
      constructionType,
      state,
      county,
      startDate,
    } = await req.json();

    if (!projectName || !description) {
      return NextResponse.json(
        { message: "Project name and description are required" },
        { status: 400 }
      );
    }

    // Convert the startDate string to a Date object (if provided)
    const parsedStartDate = startDate ? new Date(startDate) : null;

    const project = await prisma.project.create({
      data: {
        projectName,
        description,
        constructionType,
        state,
        county,
        startDate: parsedStartDate,
        userId: decoded.userId,
      },
    });

    return NextResponse.json(
      { message: "Project created successfully", projectId: project.id },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
