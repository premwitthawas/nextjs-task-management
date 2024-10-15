"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
const MobileSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);
  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"secondary"} className="lg:hidden">
          <MenuIcon className="size-4 text-neutral-500" />
        </Button>
      </SheetTrigger>
      <SheetHeader>
        <SheetTitle />
        <SheetDescription />
      </SheetHeader>
      <SheetContent className="p-0" side={"left"}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
