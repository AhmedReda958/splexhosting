"use client";

import { useToast } from "@/hooks/use-toast";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSession } from "next-auth/react";
import { useEffect, useCallback, use } from "react";
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

  const paypalCreateOrder = useCallback(async () => {
    try {
      const response = await fetch("/api/paypal/createorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          amount,
        }),
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        console.error("Error:", errorData.message);

        toast({ title: "Some Error Occured", variant: "destructive" });
        return null;
      }

      const data = await response.json();
      return data.data.order.paymentId;
    } catch (err) {
      toast({ title: "Some Error Occured", variant: "destructive" });

      console.error("Fetch Error:", err);
      return null;
    }
  }, [amount, toast, user]);

  const paypalCaptureOrder = async ({ orderID }: { orderID: string }) => {
    try {
      const response = await fetch("/api/paypal/captureorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderID }),
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        toast({
          title: "Some Error Occured",
          description: errorData.message,
          variant: "destructive",
        });
        return;
      }
      const data = await response.json();

      if (data.success) {
        // Order is successful
        toast({
          title: "Amount Added to Wallet",
          description: `${amount} EUR To your Wallet your balace now is ${data.credits}EUR`,
        });
        callback(data);
        if (goToInvoice) {
          router.push(`/dashboard/invoices/${data.id}`);
        }
        if (redirectTo) {
          router.push(redirectTo);
        }
      }
    } catch (err) {
      toast({
        title: "Some Error Occured",
        description: err as string,
        variant: "destructive",
      });
      console.error("Fetch Error:", err);
    }
  };

  return (
    <PayPalButtons
      style={{
        color: "gold",
        shape: "rect",
        label: "pay",
        height: 50,
      }}
      createOrder={async (data, actions) => {
        let order_id = await paypalCreateOrder();
        return order_id + "";
      }}
      onApprove={paypalCaptureOrder}
    />
  );
}
