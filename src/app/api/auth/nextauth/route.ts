// // src/app/api/auth/[...nextauth]/route.ts
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcryptjs";
// import prisma from "@/lib/prisma";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials as { email: string; password: string };
//         const user = await prisma.user.findUnique({ where: { email } });

//         if (!user || !(await compare(password, user.password))) {
//           return null; // Return null if user not found or password incorrect
//         }

//         return { id: user.id, email: user.email, name: user.name }; // User authenticated
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login", // Redirect here if user is not authenticated
//   },
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id; // Store user ID in the token
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id; // Make the user ID available in session
//         session.user.email = token.email;
//       }
//       return session;
//     },
//   },
// };

// export default NextAuth(authOptions);
