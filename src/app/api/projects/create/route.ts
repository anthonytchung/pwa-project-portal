import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { projectName, description, constructionType, state, county } = await req.json();

    if (!projectName || !description) {
      return NextResponse.json({ message: "Project name and description are required" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        projectName,
        description,
        constructionType,
        state,
        county,
        userId: 111,
      },
    });

    return NextResponse.json({ message: "Project created successfully", projectId: project.id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
