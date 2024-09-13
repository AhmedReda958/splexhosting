import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const { id } = session?.user;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    select: { credits: true },
  });

  return Response.json(user);
}
