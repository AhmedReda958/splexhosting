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
    const cancledOrder = await prisma.inovice.update({
      where: { paymentId: orderID },
      data: {
        status: "failed",
      },
    });

    if ((err as any).statusCode === 422) {
      console.log("Compliance Violation Error:", err);
      return NextResponse.json(
        {
          success: false,
          message:
            "Transaction cannot be processed due to a compliance violation. Please contact customer support.",
        },
        { status: 422 }
      );
    }
    console.log("Error at Capture Order:", err);
    return NextResponse.json(
      { success: false, message: "Could Not Process the Order" },
      { status: 500 }
    );
  }
}
