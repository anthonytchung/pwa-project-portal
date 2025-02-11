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
      };
  
  
      // Query projects for the authenticated user
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });
  
      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      console.error("Error retrieving user:", error);
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
  }
  