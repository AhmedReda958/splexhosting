import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, features, cpu, cores, ram, storage } =
      body;

    if (
      !name ||
      !description ||
      !price ||
      !features ||
      !cpu ||
      !cores ||
      !ram ||
      !storage
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new product entry in the database
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        features,
        cpu,
        cores,
        ram,
        storage,
      },
    });

    // Return a success response
    return NextResponse.json(
      { message: "Product created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error creating product", error: error.message },
      { status: 500 }
    );
  }
}
