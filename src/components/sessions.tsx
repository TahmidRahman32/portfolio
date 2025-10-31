import { useSession } from "next-auth/react";

export const SessionConfig = () => {
   const session = useSession({ required: false });

   if (session?.status !== "authenticated") {
      return null; // or a loading spinner, or a login button
   }
   return session;
};
