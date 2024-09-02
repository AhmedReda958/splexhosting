import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, cores, ip4, ram, storage, userId } = body;

    if (!name || !cores || !ram || !storage || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new server entry in the database
    const newServer = await prisma.server.create({
      data: {
        name,
        cores,
        ip4,
        ram,
        storage,
        user: { connect: { id: userId } }, // Replace '1' with the actual user ID
      },
    });

    // Return a success response
    return NextResponse.json(
      { message: "Server created successfully", server: newServer },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error creating server", error: error.message },
      { status: 500 }
    );
  }
}
