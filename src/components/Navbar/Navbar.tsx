"use client";
import { useId } from "react";
import { MailIcon, SearchIcon } from "lucide-react";
import NotificationMenu from "@/components/notification-menu";
import UserMenu from "@/components/user-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../ThemeToggle";
import SparkleNavbar from "../lightswind/sparkle-navbar";
import Link from "next/link";
import MobileMenu from "../moblie-menu";

const teams = ["Acme Inc.", "coss.com", "Junon"];

// Navigation links array to be used in both desktop and mobile menus

export default function Navbar() {
   const id = useId();

   return (
      <div className="container mx-auto ">
         <header className=" px-4 md:px-6 shadow container mx-auto md:rounded-full bg-input fixed z-50">
            <div className="flex h-16 items-center justify-between gap-4">
               {/* Left side */}
               <div className="flex flex-1 items-center gap-2">
                  {/* Mobile menu trigger */}
                  <div className="flex  items-center md:hidden">
                     {" "}
                     <MobileMenu />
                  </div>   

                  <div className="md:flex items-center gap-6 hidden">
                     {/* Search form */}
                     <div className="relative">
                        <Input id={id} className="peer h-8 ps-8 pe-2" placeholder="Search..." type="search" />
                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/80 peer-disabled:opacity-50">
                           <SearchIcon size={16} />
                        </div>
                     </div>
                  </div>
               </div>
               {/* Middle area */}
               {/* <div className="hidden md:flex md:flex-1 md:justify-center gap-4">
                  <Link href="/">Home</Link>
                  <Link href="/about">About</Link>
                  <Link href="/services">Services</Link>
                  <Link href="/contact">Contact</Link>
                  <Link href="/resume">Resume</Link>
                  <Link href="/dashboard">Contact</Link>
               </div> */}
               <div className="hidden md:flex md:flex-1 md:justify-center gap-4">
                  <SparkleNavbar items={["Home", "About", "Services", "Contact", "Resume", "Dashboard"]} routes={["/", "/about", "/services", "/contact", "/resume", "/dashboard"]} color="#7e0d09" />
               </div>

               {/* Right side */}
               <div className="flex flex-1 items-center justify-end gap-4">
                  <div className="flex items-center gap-2">
                     {/* Messages */}
                     <Button size="icon" variant="ghost" className="relative size-8 rounded-full text-muted-foreground shadow-none" aria-label="Open notifications">
                        <MailIcon size={16} aria-hidden="true" />
                        <div aria-hidden="true" className="absolute top-0.5 right-0.5 size-1 rounded-full bg-primary" />
                     </Button>
                     {/* Notification menu */}
                     <NotificationMenu />
                     <ModeToggle />
                  </div>
                  {/* User menu */}
                  <UserMenu />
               </div>
            </div>
         </header>
      </div>
   );
}
