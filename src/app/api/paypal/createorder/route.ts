import { NextResponse } from "next/server";
import client from "@/utils/paypal";
import paypal from "@paypal/checkout-server-sdk";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { amount, userId } = await req.json();
    console.log("Amount: ", amount);
    console.log("User ID: ", userId);

    if (!amount || !userId) {
      return NextResponse.json(
        { success: false, message: "Please Provide amount And User ID" },
        { status: 400 }
      );
    }
    const PaypalClient = client();
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers["Prefer"] = "return=representation";
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: amount.toString(),
          },
        },
      ],
    });

    const response = await PaypalClient.execute(request);

    if (response.statusCode !== 201) {
      console.log("RES: ", response);
      return NextResponse.json(
        { success: false, message: "Some Error Occurred at backend" },
        { status: 500 }
      );
    }

    const order = await prisma.inovice.create({
      data: {
        userId: Number(userId),
        paymentId: response.result.id,
        amount: amount,
        description: `Charge Credits balance with ${amount}EUR`,
        paymentMethod: "paypal",
      },
    });

    return NextResponse.json(
      { success: true, data: { order } },
      { status: 201 }
    );
  } catch (err) {
    console.log("Err at Create Order: ", err);
    return NextResponse.json(
      { success: false, message: "Could Not Find the user" },
      { status: 500 }
    );
  }
}
