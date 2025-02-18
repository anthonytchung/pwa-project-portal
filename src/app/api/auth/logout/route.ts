// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully." });
  // Remove the cookie by using cookies.delete.
  response.cookies.delete("auth-token", { path: "/" });
  return response;
}
