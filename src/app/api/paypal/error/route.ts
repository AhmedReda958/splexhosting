import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  const { orderID } = await req.json();
  try {
    if (!orderID) {
      return NextResponse.json(
        { success: false, message: "Invalid Order ID" },
        { status: 400 }
      );
    }

    const order = await prisma.inovice.update({
      where: { paymentId: orderID },
      data: {
        status: "Error",
      },
    });

    return NextResponse.json(
      { success: true, message: "Order updated" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "server error" },
      { status: 500 }
    );
  }
}
