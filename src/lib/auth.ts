import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/src/lib/prisma";
import { env } from "@/src/lib/env";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@gmail.com" },
        password: { label: "Passoword", type: "password", placeholder: "password123" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const admin = await prisma.admin.findUnique({
          where: {email: credentials.email},
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
          }
        });
        
        if(!admin){
          return null;
        }
      const passwordMatch = await bcrypt.compare(credentials.password, admin.password);
      if(!passwordMatch){
        return null;
      }

      return {
          id: String(admin.id),
          name: admin.name,
          email: admin.email,
          adminId: admin.id,
          adminName: admin.name,
          adminEmail: admin.email,
        }
      }
    })

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

        user.adminId = admin.id;
        user.adminName = admin.name;
        user.adminEmail = admin.email;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.adminId = user.adminId;
        token.adminName = user.adminName;
        token.adminEmail = user.adminEmail;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.adminId = token.adminId;
        session.user.adminName = token.adminName;
        session.user.adminEmail = token.adminEmail;
      }

      return session;
    },
  },
};