// src/app/api/auth/error/page.tsx
"use client";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Error: Authentication Failed</h1>
      <button onClick={() => router.push("/login")}>Back to Login</button>
    </div>
  );
};

export default ErrorPage;
