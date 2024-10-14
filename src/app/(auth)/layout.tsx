"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren } from "react";
const AuthLayout = ({ children }: PropsWithChildren) => {
  const pathName = usePathname();
  const isSignIn = pathName === "/sign-in";
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex items-center justify-between">
          <Image src={"/logo.svg"} alt="logo" width={152} height={56} />
          <div className="flex items-center">
            <Button variant={"secondary"} asChild>
              <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
                {isSignIn ? "SignUp" : "SignIn"}
              </Link>
            </Button>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
