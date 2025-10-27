"use client";
import { BoltIcon, BookOpenIcon, Layers2Icon, LogOutIcon, PinIcon, UserPenIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";


export default function UserMenu() {
   const session = useSession({ required: false });

   if (session.status !== "authenticated") {
      return null; // or a loading spinner, or a login button
   }

   const Logout = ()=>{
      signOut();
      console.log("signout")
   }
   console.log(session);
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
               <Avatar>
                  <AvatarImage src={`${session?.data?.user?.image}`} alt="Profile image" />
                  <AvatarFallback>P</AvatarFallback>
               </Avatar>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="max-w-64" align="end">
            <DropdownMenuLabel className="flex min-w-0 flex-col">
               <span className="truncate text-sm font-medium text-foreground">{session?.data?.user?.name}</span>
               <span className="truncate text-xs font-normal text-muted-foreground">{session?.data?.user?.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuItem>
                  <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
                  <span>Option 1</span>
               </DropdownMenuItem>
               <DropdownMenuItem>
                  <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
                  <span>Option 2</span>
               </DropdownMenuItem>
               <DropdownMenuItem>
                  <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" />
                  <span>Option 3</span>
               </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuItem>
                  <PinIcon size={16} className="opacity-60" aria-hidden="true" />
                  <span>Option 4</span>
               </DropdownMenuItem>
               <DropdownMenuItem>
                  <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
                  <span>Option 5</span>
               </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button onClick={Logout} variant="ghost" className="w-full justify-start p-0">
                   <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
                   <span>Logout</span>
              </Button>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
