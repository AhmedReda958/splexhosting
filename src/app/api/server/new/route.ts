import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, cpu, cores, ip4, ram, storage, userId } = body;

    if (!name || !ram || !storage || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    console.log(cpu);

    // Create a new server entry in the database
    const newServer = await prisma.server.create({
      data: {
        name,
        ip4,
        cores,
        cpu,
        ram,
        storage,
        user: { connect: { id: userId } },
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
