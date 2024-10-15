"use client";
import { UserButton } from "@/features/auth/components/user-button";
import React from "react";
import MobileSideBar from "@/components/mobile-sidebar";

const Navbar = () => {
  return (
    <nav className="w-full pt-4 px-6 flex items-center justify-between">
      {/* LEFT */}
      <div className="hidden lg:flex flex-col">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="text-muted-foreground">
          Monitor all of your projects and task here
        </p>
      </div>
      {/* LEFT */}
      {/* RIGHT */}
      <MobileSideBar />
      <UserButton />
      {/* RIGHT */}
    </nav>
  );
};

export default Navbar;
