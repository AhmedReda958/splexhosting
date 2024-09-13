import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// update request
export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(params.orderId) },
    });

    await prisma.server.update({
      where: { id: order?.serverId ?? undefined },
      data: {
        status: "active",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      },
    });

    // Update the order entry in the database
    await prisma.order.update({
      where: { id: Number(params.orderId) },
      data: {
        status: "accepted",
      },
    });

    // Return a success response
    return NextResponse.json(
      { message: "order accepted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error accepting the order", error: error.message },
      { status: 500 }
    );
  }
}
