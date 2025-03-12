import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATEKEY as string) as {
      userId: number;
      email: string;
    };

    const {
      projectName,
      description,
      constructionType,
      startDate,
      location,
      invitees
    } = await req.json();
    console.log(startDate)


    if (!projectName || !description) {
      return NextResponse.json(
        { message: "Project name and description are required" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        projectName,
        description,
        constructionType,
        startDate: startDate ? new Date(startDate) : null,
        latitude: location?.lat,
        longitude: location?.lng,
        invitees: invitees ? JSON.stringify(invitees) : "null",
        userId: decoded.userId,
      },
    });

    return NextResponse.json(
      { message: "Project created successfully", projectId: project.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Project creation error:", error);
    const errorMessage = error?.message || "Internal Server Error";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
