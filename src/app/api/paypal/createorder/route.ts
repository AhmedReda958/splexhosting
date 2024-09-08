// app/api/create-order/route.ts

import { NextResponse } from "next/server";
import client from "@/utils/paypal";
import paypal from "@paypal/checkout-server-sdk";

export async function POST(req: Request) {
  try {
    const { order_price, user_id } = await req.json();

    if (!order_price || !user_id) {
      return NextResponse.json(
        { success: false, message: "Please Provide order_price And User ID" },
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
            currency_code: "USD",
            value: order_price.toString(),
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

    // Your Custom Code for doing something with the order
    // Usually, you would store an order in the database like MongoDB

    // Example:
    const order = response.result;

    return NextResponse.json({ success: true, data: { order } });
  } catch (err) {
    console.log("Err at Create Order: ", err);
    return NextResponse.json(
      { success: false, message: "Could Not Find the user" },
      { status: 500 }
    );
  }
}
