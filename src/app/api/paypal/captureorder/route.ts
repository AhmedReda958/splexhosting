import { NextResponse } from "next/server";
import client from "@/utils/paypal";
import paypal from "@paypal/checkout-server-sdk";

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

    if (!response || response.statusCode !== 201) {
      console.log("Response:", response);
      return NextResponse.json(
        { success: false, message: "Some Error Occurred at backend" },
        { status: 500 }
      );
    }
    // console.log("Response:", response);
    // Your Custom Code to Update Order Status
    // And Other stuff that is related to that order, like wallet
    // Example: Update wallet and send it back to frontend
    const wallet = {}; // Example: replace this with your actual wallet update logic

    return NextResponse.json({ success: true, data: { wallet } });
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
