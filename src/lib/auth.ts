import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/src/lib/prisma";
import { env } from "@/src/lib/env";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "github") {
        if (!user.email) {
          return false;
        }

        const admin = await prisma.admin.findUnique({
          where: {
            email: user.email,
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });

        if (!admin) {
          return false;
        }

        (user as any).adminId = admin.id;
        (user as any).adminName = admin.name;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.adminId = (user as any).adminId;
        token.adminName = (user as any).adminName;
        token.adminEmail = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).adminId = token.adminId;
        (session.user as any).adminName = token.adminName;
        (session.user as any).adminEmail = token.adminEmail;
      }

      return session;
    },
  },
};