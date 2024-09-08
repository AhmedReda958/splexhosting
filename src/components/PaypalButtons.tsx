"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaypalButtons() {
  const paypalCreateOrder = async () => {
    try {
      const response = await fetch("/api/paypal/createorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          order_price: 120,
        }),
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        // Your custom code to show an error like showing a toast:
        // toast.error('Some Error Occured');
        return null;
      }

      const data = await response.json();
      return data.data.order.order_id;
    } catch (err) {
      // Your custom code to show an error like showing a toast:
      // toast.error('Some Error Occured');
      console.error("Fetch Error:", err);
      return null;
    }
  };

  const paypalCaptureOrder = async (orderID) => {
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
        // Your custom code to show an error like showing a toast:
        // toast.error('Some Error Occured');
        return;
      }

      const data = await response.json();

      if (data.success) {
        // Order is successful
        // Your custom code
        // Like showing a success toast:
        // toast.success('Amount Added to Wallet');
        // And/Or Adding Balance to Redux Wallet
        // dispatch(setWalletBalance({ balance: data.data.wallet.balance }));
      }
    } catch (err) {
      // Order is not successful
      // Your custom code

      // Like showing an error toast
      // toast.error('Some Error Occured');
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
      onApprove={async (data, actions) => {
        let response = await paypalCaptureOrder(data.orderID);
        if (response) return true;
      }}
    />
  );
}
