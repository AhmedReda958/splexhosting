"use client";

import { useToast } from "@/hooks/use-toast";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

export default function PaypalPayButtons({
  amount,
  goToInvoice = true,
  redirectTo = "",
  callback = () => {},
}: {
  amount: number;
  goToInvoice?: boolean;
  redirectTo?: string;
  callback?: (data: any) => void;
}) {
  const session = useSession();
  const user = session.data?.user;

  const { toast } = useToast();
  const router = useRouter();

  const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
    try {
      const response = await fetch("/api/paypal/createorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          amount,
        }),
      });

      const orderData = await response.json();
      console.log("Order Data: ", orderData);

      if (!orderData.id) {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : "Unexpected error occurred, please try again.";

        throw new Error(errorMessage);
      }

      return orderData.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data) => {
    // Capture the funds from the transaction.
    const response = await fetch("/api/paypal/captureorder", {
      method: "POST",
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    });

    const details = await response.json();

    toast({
      title: "Amount Added to Wallet",
      description: `${amount} EUR To your Wallet your balace now is ${details.credits}EUR`,
    });
    callback(data);
    if (goToInvoice) {
      router.push(`/dashboard/invoices/${details.id}`);
    }
    if (redirectTo) {
      router.push(redirectTo);
    }
  };

  const onError: PayPalButtonsComponentProps["onError"] = async (data) => {
    const response = await fetch("/api/paypal/error", {
      method: "PUT",
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    });
    toast({
      title: "Operation Failed",
      description: "Transaction Failed, Please try again",
      variant: "destructive",
    });
  };
  const onCancel: PayPalButtonsComponentProps["onCancel"] = async (data) => {
    const response = await fetch("/api/paypal/cancelorder", {
      method: "PUT",
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    });
    toast({
      title: "Operation Canceled",
      description: "Transaction Canceled",
      variant: "destructive",
    });
  };

  return (
    <>
      <PayPalButtons
        style={{
          color: "gold",
          shape: "rect",
          label: "pay",
          height: 50,
        }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        onCancel={onCancel}
      />
      {/* <h3 className="text-2xl text-orange-400">
        Paypal Payment is disabled for now contact support for more information
      </h3> */}
    </>
  );
}
