import { Server } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function getAllServers(): Promise<Server[]> {
  try {
    const servers = await prisma.server.findMany();

    return servers;
  } catch (error) {
    // Handle the error here
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function getServerById(
  id: number,
  withUser: boolean = false
): Promise<Server | null> {
  try {
    const server = await prisma.server.findUnique({
      where: { id },
      include: withUser ? { user: true } : undefined,
    });

    return server;
  } catch (error) {
    // Handle the error here
    console.error("Error fetching data:", error);
    return null;
  }
}
