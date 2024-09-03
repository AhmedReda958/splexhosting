"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreditCard, DollarSign } from "lucide-react";

export default function Component() {
  const [balance, setBalance] = useState(100);
  const [amount, setAmount] = useState("");
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=YOUR_LIVE_CLIENT_ID`;
    script.addEventListener("load", () => setPaypalLoaded(true));
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    if (!paypalLoaded) {
      alert("PayPal SDK not loaded yet. Please wait.");
      return;
    }

    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            const newBalance = balance + Number(amount);
            setBalance(newBalance);
            setAmount("");
            alert(`Successfully added ${amount} credits!`);
          });
        },
        onError: (err) => {
          alert("Payment could not be processed. Please try again.");
          console.error("PayPal Checkout Error:", err);
        },
      })
      .render("#paypal-button-container");
  };

  return (
    <div className="col-span-full">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Charge Credits</CardTitle>
          <CardDescription>
            Add credits to your account using PayPal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-secondary rounded-lg">
            <CreditCard className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm font-medium">Current Balance</p>
              <p className="text-2xl font-bold">{balance} credits</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount to add</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-[#0070ba] hover:bg-[#003087] text-white"
            onClick={handlePayment}
            disabled={!amount || !paypalLoaded}
          >
            Pay with PayPal
          </Button>
        </CardFooter>
      </Card>
      <div id="paypal-button-container" className="mt-4"></div>
    </div>
  );
}
