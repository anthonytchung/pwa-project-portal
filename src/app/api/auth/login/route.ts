// src/app/api/auth/login/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // Parse the incoming JSON body
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Find the user using Prisma
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No user registered under this email. Did you mean to register?" },
        { status: 400 }
      );
    }

    // Compare provided password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // let isPasswordValid = Object.is(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid password or email." },
        { status: 400 }
      );
    }

    // Create a payload for the JWT (include what you need)
    const payload = { userId: user.id, email: user.email };

    // Sign the JWT using your PRIVATEKEY from environment variables.
    // You can adjust the expiration as needed.
    const token = jwt.sign(payload, process.env.PRIVATEKEY as string, {
      expiresIn: "14d", // token expires in 14 days
    });

    // Create a NextResponse and set a secure, HTTP-only cookie
    const response = NextResponse.json({
      message: "You have successfully logged in.",
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only use secure cookies in production
      sameSite: "none",
      path: "/",
      expires: new Date(Date.now() + 60 * 60 * 24 * 14 * 1000), // 14 days from now
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
