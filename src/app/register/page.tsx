// src/app/register/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Button component from your design system
import { Input } from "@/components/ui/input"; // Input component from your design system
import { Label } from "@/components/ui/label"; // Label component from your design system
import { Textarea } from "@/components/ui/textarea"; // Textarea component if needed for longer fields
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"; // Card component for layout

export default function Register() {
  const router = useRouter();

  // Manage form state
  const [formData, setFormData] = useState({
    name: "",
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
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Registration failed.");
      } else {
        // Redirect to login page after successful registration
        router.push("/login");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-slate-400 flex flex-col items-center">
      <div className="m-auto flex-col flex gap-2 w-full max-w-md p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Register</CardTitle>
          </CardHeader>

          <CardContent>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
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

              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
