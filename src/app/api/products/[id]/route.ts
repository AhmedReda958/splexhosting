import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// get product by id

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    // Fetch the product by ID from the database
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    // Return a success response with the product
    return NextResponse.json({ product }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching product", error: error.message },
      { status: 500 }
    );
  }
}
