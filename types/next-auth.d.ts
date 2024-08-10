import NextAuth from "next-auth";
import { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    firstName?: string;
    lastName?: string;
    role?: string;
  }

  interface Session {
    user: {
      id: string;
      firstName?: string;
      lastName?: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName?: string;
    lastName?: string;
    role?: string;
  }
}
