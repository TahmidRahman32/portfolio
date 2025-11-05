
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth";

declare module "next-auth" {
   interface Session {
      user: {
         id: string;
         name?: string | null;
         email?: string | null;
         role?: string | null;
      } & DefaultSession["user"];
   }

   interface User extends DefaultUser {
      id: string;
      first_name?: string;
      role?: string;
   }
}

declare module "next-auth/jwt" {
   interface JWT {
      id: string;
      email?: string;
      name?: string;
      role?: string;
   }
}

export const authOptions: NextAuthOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),

      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
               console.log("Missing email or password");
               return null;
            }

            try {
               const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                     email: credentials.email,
                     password: credentials.password,
                  }),
               });

               if (!res.ok) {
                  console.log("Login failed:", await res.text());
                  return null;
               }

               const user = await res.json();

               if (user) {
                  return {
                     id: user.id,
                     first_name: user.first_name,
                     email: user.email,
                     role: user.role,
                  };
               }

               return null;
            } catch (error) {
               console.error("Authorize error:", error);
               return null;
            }
         },
      }),
   ],

   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.id = user.id;
            token.email = user.email as string;
            token.name = user.first_name || (user.name as string);
            token.role = user.role;
         }
         return token;
      },

      async session({ session, token }) {
         session.user = {
            id: token.id,
            email: token.email,
            name: token.name,
            role: token.role,
         };
         return session;
      },
   },

   secret: process.env.AUTH_SECRET,

   pages: {
      signIn: "/login",
   },
};
