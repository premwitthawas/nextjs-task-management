'use client';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DottedSepeartor from "@/components/dotted-separator";
import Navigiation from "@/components/navigation";
import WorkspaceSwitcher from "@/components/workspace-switcher";
import Projects from "@/components/project";


const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/" className="flex items-center justify-center">
        <Image src={"/logo.svg"} alt="logo" width={164} height={48} />
      </Link>
      <DottedSepeartor className="my-4" />
      <WorkspaceSwitcher />
      <DottedSepeartor className="my-4" />
      <Navigiation />
      <DottedSepeartor className="my-4" />
      <Projects />
    </aside>
  );
};

export default Sidebar;
