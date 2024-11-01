"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export const PayPalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
        currency: "EUR",
        // intent: "capture",
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
};
