import { NextResponse } from "next/server";
import client from "@/utils/paypal";
import paypal from "@paypal/checkout-server-sdk";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { orderID } = await req.json();

    if (!orderID) {
      return NextResponse.json(
        { success: false, message: "Please Provide Order ID" },
        { status: 400 }
      );
    }

    // Capture order to complete payment
    const PaypalClient = client();
    const request = new paypal.orders.OrdersGetRequest(orderID);
    const response = await PaypalClient.execute(request);

    if (!response) {
      console.log("Response:", response);
      return NextResponse.json(
        { success: false, message: "Some Error Occurred at backend" },
        { status: 500 }
      );
    }
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
      { success: true, credits: user.credits },
      { status: 201 }
    );
  } catch (err) {
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
