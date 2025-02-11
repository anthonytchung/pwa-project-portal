// src/components/header.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  // State to store the user data (or null if not logged in)
  const [user, setUser] = useState<null | { id: number; name: string; email: string }>(null);

  // Fetch profile information once when the component mounts.
  useEffect(() => {
    // console.log("useEffect triggered in Header");
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile/retrieve", {
          credentials: "include",
        });
        // console.log("Response status:", res.status);
        if (res.ok) {
          const data = await res.json();
          // console.log("Fetched profile data:", data);
          // Assume the API returns { user: { id, name, email, ... } }
          setUser(data.user);
        } else {
          console.warn("Not authorized or error fetching profile");
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUser(null);
      }
    }
    fetchProfile();
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      {/* Left side: Logo and Company Name */}
      <div className="flex items-center">
        <Link href="/dashboard">
          <Image
            src="/48fundlogo.svg" // Make sure you have this image in your public folder
            alt="Company Logo"
            width={50}
            height={50}
          />
        </Link>
      </div>

      {/* Right side: Conditional navigation */}
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <div>
              {user.email}
            </div>
            <Link href="/login">
              <Button variant="ghost">Logout</Button>
            </Link>
          </>
        ) : (
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
