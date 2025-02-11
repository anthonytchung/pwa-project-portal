// src/app/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Button component from your design system
import { Input } from "@/components/ui/input"; // Input component from your design system
import { Label } from "@/components/ui/label"; // Label component from your design system
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Card component for layout
import { signIn } from "next-auth/react"; // NextAuth signIn method

export default function Login() {
  const router = useRouter();

  // Manage form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // For handling error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // For handling loading state

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous error

    // Simple client-side validation
    if (!formData.email || !formData.password) {
      setError("Both fields are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      // const result = await signIn("credentials", {
      //   email: formData.email,
      //   password: formData.password,
      //   redirect: false,
      // });
      const res = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      const data = await res.json()
      if (data.error) {
        setError(data.error); // If there's an error, show it
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle navigation to the register page
  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div className="min-h-screen min-w-screen bg-slate-400 flex flex-col items-center">
      <div className="m-auto flex-col flex gap-2 w-full max-w-md p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
          </CardHeader>

          <CardContent>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              <CardFooter className="flex flex-col gap-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>

                {/* Register button */}
                <Button variant="ghost" onClick={handleRegister}>
                  Don't have an account? Register
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
