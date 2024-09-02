import { DServer, Server } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

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

export async function getCurrentUserServers() {
  const session = await getServerSession(authOptions);
  try {
    const server = await prisma.server.findMany({
      where: { userId: Number(session?.user.id) },
    });

    return server;
  } catch (error) {
    // Handle the error here
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getAllDServers(): Promise<DServer[]> {
  try {
    const servers = await prisma.dServer.findMany();

    return servers;
  } catch (error) {
    // Handle the error here
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function getDServerById(
  id: number,
  withUser: boolean = false
): Promise<DServer | null> {
  try {
    const server = await prisma.dServer.findUnique({
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

export async function getCurrentUserDServers() {
  const session = await getServerSession(authOptions);
  try {
    const server = await prisma.dServer.findMany({
      where: { userId: Number(session?.user.id) },
    });

    return server;
  } catch (error) {
    // Handle the error here
    console.error("Error fetching data:", error);
    return null;
  }
}
