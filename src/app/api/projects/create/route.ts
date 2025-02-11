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
    // console.log(decoded.userId);

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
        userId: decoded.userId,
      },
    });

    return NextResponse.json({ message: "Project created successfully", projectId: project.id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
