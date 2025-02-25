"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  // State to control whether the sidebar is open on mobile screens.
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button: visible only on small screens and positioned below the header */}
      <div className="fixed top-[80px] left-4 z-50 md:hidden">
        <Button
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar: always visible on medium screens and up; toggled on small screens */}
      <aside
        className={cn(
          "fixed top-[64px] left-0 h-full w-56 bg-white shadow-lg transition-transform duration-300 ease-in-out z-40",
          // On mobile screens, slide in/out based on isOpen.
          isOpen ? "translate-x-0" : "-translate-x-full",
          // On medium screens and up, always show.
          "md:translate-x-0"
        )}
      >
        <div className="p-4 pt-8">
          <h2 className="text-xl font-bold mb-4">Navigation</h2>
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
              New Project
            </Link>
            <Link
              href="/profile"
              className="block px-4 py-2 hover:bg-gray-100 rounded transition-colors"
            >
              Profile
            </Link>
            {/* Add more navigation items as needed */}
          </nav>
        </div>
      </aside>
    </>
  );
}
