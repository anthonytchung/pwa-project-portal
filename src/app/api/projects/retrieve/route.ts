// src/app/api/projects/retrieve/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.PRIVATEKEY as string) as {
      userId: number;
      email: string;
    };


    // Query projects for the authenticated user
    const projects = await prisma.project.findMany({
      where: { userId: decoded.userId },
    });

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving projects:", error);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
