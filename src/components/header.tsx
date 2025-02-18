// src/components/header.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

// Import optional shadcn dropdown + avatar components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils"; // if you need class merge

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
}

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<null | UserProfile>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile/retrieve", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          // Not logged in or unauthorized
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUser(null);
      }
    }
    fetchProfile();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setUser(null);
        router.push("/login");
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // If you don’t want to show the header at all when not logged in, 
  // you can conditionally return null here:
  // if (!user) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 px-4 py-3",
        // Modern “2025 look”: glassy + gradient + subtle shadow
        "shadow-md backdrop-blur-lg",
        // Gradient from left to right
        "bg-gradient-to-r from-blue-500/70 via-sky-400/60 to-violet-500/70 text-white"
      )}
    >
      {/* Header content container */}
      <div className="mx-auto flex max-w-screen-xl items-center justify-between">
        {/* Left side: Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/dashboard">
            <Image
              src="/48fundlogo.svg"
              alt="Company Logo"
              width={48}
              height={48}
              className="cursor-pointer transition-transform hover:scale-105"
            />
          </Link>
          <span className="hidden sm:block font-bold text-lg tracking-wide">
            WageGuardian
          </span>
        </div>

        {/* Right side: user or login link */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              {/* Possibly show role as a badge-like element */}
              <span className="hidden sm:inline-block bg-white/20 text-white px-2 py-1 rounded-md text-xs uppercase font-medium tracking-wider">
                {user.role}
              </span>

              {/* Dropdown with user avatar + name */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-white/10">
                    <Avatar className="h-8 w-8">
                      {/* If you had a user image, <AvatarImage src={user.image} /> */}
                      <AvatarImage src="" alt={user.name} />
                      <AvatarFallback className="bg-gray-300 text-gray-800">
                        {user.name?.[0]?.toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline-block text-sm font-medium">
                      {user.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 bg-white text-gray-800">
                  <DropdownMenuLabel className="font-semibold">
                    Signed in as
                    <div className="font-normal text-gray-600">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* Possibly link to a Profile or Settings page */}
                  <DropdownMenuItem
                    onSelect={() => router.push("/profile")}
                    className="cursor-pointer"
                  >
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => router.push("/dashboard")}
                    className="cursor-pointer"
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onSelect={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (!(pathname == "/login" || "/register") && (
            // If not logged in, show a big “Login” or “Register” button
            
            <Link href="/login">
              <Button variant="outline" className="text-white border-white/70 hover:bg-white/10">
                Login
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
