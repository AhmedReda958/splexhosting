import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { orderID } = await req.json();
  try {
    const order = await prisma.inovice.update({
      where: { paymentId: orderID },
      data: {
        status: "success",
      },
      select: {
        id: true,
        userId: true,
        amount: true,
      },
    });

    const user = await prisma.user.update({
      where: { id: order.userId },
      data: {
        credits: {
          increment: order.amount,
        },
      },
      select: {
        credits: true,
      },
    });

    return NextResponse.json(
      { success: true, credits: user.credits, id: order.id },
      { status: 201 }
    );
  } catch (err) {
    console.log("Error at Capture Order:", err);
    return NextResponse.json(
      { success: false, message: "Could Not Process the Order" },
      { status: 500 }
    );
  }
}
