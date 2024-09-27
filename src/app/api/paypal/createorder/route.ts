import { NextResponse } from "next/server";
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

    const referenceId = userId.toString().concat("-", Date.now().toString());

    const order = await createOrder(amount, referenceId);
    if (order.error) {
      console.log("Error Creating Order: ", order.error);
      return NextResponse.json(
        { success: false, message: "Error Creating Order" },
        { status: 500 }
      );
    }
    const invoice = await prisma.inovice.create({
      data: {
        userId: Number(userId),
        paymentId: order.id,
        amount: amount,
        description: `Charge Credits balance with ${amount}EUR`,
        paymentMethod: "paypal",
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    console.log("Err at Create Order: ", err);
    return NextResponse.json(
      { success: false, message: "Error Creating Order", error: err },
      { status: 500 }
    );
  }
}

function createOrder(amount: number, referenceId: string) {
  const accessToken = Buffer.from(
    process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_CLIENT_SECRET
  ).toString("base64");
  console.log("Access Token: ", accessToken);
  return fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${accessToken}`,
    },
    body: JSON.stringify({
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: amount.toString(),
          },
          reference_id: referenceId,
        },
      ],
      intent: "CAPTURE",
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
            payment_method_selected: "PAYPAL",
            brand_name: "VenixHosting",
            locale: "en-US",
            landing_page: "LOGIN",
            shipping_preference: "GET_FROM_FILE",
            user_action: "PAY_NOW",
            return_url: "https://example.com/returnUrl",
            cancel_url: "https://example.com/cancelUrl",
          },
        },
      },
    }),
  }).then((response) => response.json());
}
