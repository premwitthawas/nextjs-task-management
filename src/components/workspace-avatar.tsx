"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Props {
  image?: string;
  name: string;
  className?: string;
}
const WorkspaceAvatar = ({ name, className, image }: Props) => {
  if (image) {
    return (
      <div
        className={cn("size-8 relative rounded-md overflow-hidden", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-8", className)}>
      <AvatarFallback className="text-white bg-blue-600 font-semibold text-lg uppercase rounded-md">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default WorkspaceAvatar;
