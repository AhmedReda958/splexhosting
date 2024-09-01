import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

interface CustomRequest extends NextRequest {
  user?: {
    role: string;
  };
}

export async function GET(request: CustomRequest) {
  const session = await getServerSession(authOptions);
  const { role } = session?.user;

  console.log("Role", session);
  if (role !== "admin") {
    return Response.json("Unauthorized", { status: 401 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      status: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return Response.json(users);
}
