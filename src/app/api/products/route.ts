import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get Porducts
export async function GET(request: NextRequest) {
  try {
    // Fetch all products from the database
    const products = await prisma.product.findMany();

    // Return a success response with the products
    return NextResponse.json({ products }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching products", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      price,
      features,
      cpu,
      cores,
      ram,
      storage,
      type,
    } = body;

    if (
      !name ||
      !description ||
      !type ||
      !price ||
      !features ||
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
        type,
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

// update request
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      name,
      description,
      price,
      features,
      cpu,
      cores,
      ram,
      storage,
      type,
    } = body;

    if (
      !id ||
      !name ||
      !description ||
      !type ||
      !price ||
      !features ||
      !ram ||
      !storage
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update the product entry in the database
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        features,
        cpu,
        cores,
        ram,
        storage,
        type,
      },
    });

    // Return a success response
    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error updating product", error: error.message },
      { status: 500 }
    );
  }
}

// delete request
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    // Delete the product entry from the database
    await prisma.product.delete({
      where: { id },
    });

    // Return a success response
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error deleting product", error: error.message },
      { status: 500 }
    );
  }
}
