import GoogleProvider from "next-auth/providers/google";
import { pages } from "next/dist/build/templates/app-page";

export const authOptions = {
   // Configure one or more authentication providers
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
   ],
   secret: process.env.AUTH_SECRET,
   pages: {
      signIn: "/login",
   },
};

