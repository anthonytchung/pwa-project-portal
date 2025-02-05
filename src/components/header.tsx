"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      {/* Left side: Logo and Company Name */}
      <div className="flex items-center">
        <Image
          src="/48fundlogo.svg" // Make sure you have a logo image at public/logo.png
          alt="Company Logo"
          width={50}
          height={50}
        //   className="mr-2"
        />
      </div>
      {/* Right side: Profile */}
      <div>
        <Button variant="ghost">Profile</Button>
      </div>
    </header>
  );
};

export default Header;
