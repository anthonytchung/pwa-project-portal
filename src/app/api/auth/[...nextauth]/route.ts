// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma"; // Ensure Prisma client is properly set up

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        // Check user exists and validate password (use hashing in real-world apps)
        if (user && user.password === credentials?.password) {
          return { id: user.id, email: user.email }; // Return user object if valid
        }

        return null; // Return null if no valid user
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page path
    error: "/auth/error", // Custom error page path
  },
  session: {
    strategy: "jwt", // Use JWT for session
  },
};

// Handle POST and GET requests for NextAuth in the app directory (using Next.js' server-side methods)
export async function GET(req: Request) {
  const res = await NextAuth(req, authOptions); // Directly pass the request object
  return res;
}

export async function POST(req: Request) {
  const res = await NextAuth(req, authOptions); // Directly pass the request object
  return res;
}
