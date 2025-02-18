// src/app/api/auth/register/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";  // Prisma client import
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Register body:", body);

    const { name, email, password, role} = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if a user already exists with the given email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user in the database using the hashed password
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Save the hashed password in the "password" field
        role: role,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
