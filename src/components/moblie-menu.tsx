"use client";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import Link from "next/link";

export default function MobileMenu() {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
               <div>
                  <Menu />
               </div>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="max-w-56" align="end">
            <DropdownMenuGroup>
               <DropdownMenuItem className="text-center flex flex-col font-primary-c">
                  <Link href={"/"}>Home</Link>
               </DropdownMenuItem>
               <DropdownMenuItem className="text-center flex flex-col font-primary-c">
                  <Link href="/about">About</Link>
               </DropdownMenuItem>
               <DropdownMenuItem className="text-center flex flex-col font-primary-c">
                  <Link href="/services">Services</Link>
               </DropdownMenuItem>
               <DropdownMenuItem className="text-center flex flex-col font-primary-c">
                  <Link href="/contact">Contact</Link>
               </DropdownMenuItem>
               <DropdownMenuItem className="text-center flex flex-col font-primary-c">
                  <Link href="/resume">Resume</Link>
               </DropdownMenuItem>
               <DropdownMenuItem className="text-center flex flex-col font-primary-c">
                  <Link href="/dashboard">Dashboard</Link>
               </DropdownMenuItem>
            </DropdownMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
