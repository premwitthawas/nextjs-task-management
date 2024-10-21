"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Props {
    image?: string;
    name: string;
    className?: string;
    fallbackClassName?: string,
}
const ProjectAvatar = ({ name, className, image, fallbackClassName }: Props) => {
    if (image) {
        return (
            <div
                className={cn("size-5 relative rounded-md overflow-hidden", className)}
            >
                <Image src={image} alt={name} fill className="object-cover" />
            </div>
        );
    }

    return (
        <Avatar className={cn("size-5 relative rounded-md overflow-hidden", className)}>
            <AvatarFallback className={
                cn("text-white bg-blue-600 font-semibold text-lg uppercase rounded-md",
                    fallbackClassName)
            }>
                {name[0]}
            </AvatarFallback>
        </Avatar>
    );
};

export default ProjectAvatar;
