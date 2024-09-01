import { User } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function getAllUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (error) {
    // Handle the error here
    console.error("Error fetching data:", error);
    return [];
  }
}
