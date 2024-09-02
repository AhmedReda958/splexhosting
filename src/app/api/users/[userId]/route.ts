import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const revalidate = 60;

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions);
  const { role } = session?.user;

  if (role !== "admin") {
    return Response.json("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(params.userId) },
    include: { servers: true },
  });

  return Response.json(user);
}
