import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: db ? DrizzleAdapter(db) : undefined,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "demo@silverstonelegal.example");
        return {
          id: "demo-user",
          name: "Silverstone Demo Attorney",
          email,
          image: null,
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
});
