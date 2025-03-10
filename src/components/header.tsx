"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { fetchProfile, logout, UserProfile } from "@/lib/api";
import { cn } from "@/lib/utils";

// Import dropdown and avatar components from shadcn UI (or your custom ones)
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";


export default function HeaderWithSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<null | UserProfile>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const profile = await fetchProfile();
      setUser(profile);
    }
    loadProfile();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      if (await logout()) {
        setUser(null);
        router.push("/login");
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      {/* Header */}
      <header
        className={cn(
          "sticky top-0 z-50 flex items-center justify-between px-4 py-3",
          "shadow-md backdrop-blur-lg",
          "bg-gradient-to-r from-blue-500/70 via-sky-400/60 to-violet-500 text-white"
        )}
      >
        <div className="flex items-center space-x-2">
          <Link href="https://48fund.com/">
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
          {/* Toggle Button always visible on all screens */}
          {user && (<Button
            variant="ghost"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="p-2 ml-2"
          >
            <Menu className="h-6 w-6" />
          </Button>)}
          
        </div>

        {/* Right Side User Menu */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
            <span className="bg-white/20 text-white px-2 py-1 rounded-md text-xs uppercase font-medium tracking-wider">
              {user.role}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 hover:bg-white/10"
                >
                  <Avatar className="h-8 w-8">
                    {user.name ? (
                      <AvatarFallback className="bg-gray-300 text-gray-800">
                        {user.name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    ) : null}
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
                <DropdownMenuItem
                  onSelect={() => router.push("/profile")}
                  className="cursor-pointer"
                >
                  My Profile
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
          </div>) : (
            <Link href="/login">
            <Button variant="ghost" className="font-bold">
              Login
            </Button>
          </Link>
          )}
        </div>
      </header>

      {/* Integrated Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 h-full w-56 bg-white shadow-lg transition-transform duration-300 ease-in-out z-40",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4">
          <div className="flex flex-row justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Navigation</h2>
            <Button
              variant="ghost"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="p-2"
            >
              {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          <nav className="flex flex-col space-y-2">
            <Link
              href="/dashboard"
              className="block px-4 py-2 hover:bg-gray-100 rounded transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/projects/new"
              className="block px-4 py-2 hover:bg-gray-100 rounded transition-colors"
            >
              Wage Manager
            </Link>
            <Link
              href="/profile"
              className="block px-4 py-2 hover:bg-gray-100 rounded transition-colors"
            >
              Profile
            </Link>
            {/* Additional navigation items can be added here */}
          </nav>
        </div>
      </aside>
    </>
  );
}
