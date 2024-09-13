"use client";
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
import { Wallet, Euro } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import PaypalPayButtons from "@/components/PaypalPayButtons";

export default function BalancePage() {
  const [amount, setAmount] = useState(20);
  const [showPaypal, setShowPaypal] = useState(false);
  const [credits, setCredits] = useState(0);

  const getCreditBalance = useCallback(() => {
    fetch("/api/user/credits")
      .then((res) => res.json())
      .then((data) => setCredits(data.credits));
  }, []);

  useEffect(() => {
    getCreditBalance();
  }, [getCreditBalance]);

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
            <Wallet className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm font-medium">Current Balance</p>
              <p className="text-2xl font-bold flex gap-1 items-center">
                {credits} <Euro />
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount to add {amount} EUR</Label>
            {!showPaypal ? (
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  placeholder="Enter amount"
                  className="pl-10"
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
            ) : (
              <PaypalPayButtons amount={amount} />
            )}
          </div>
        </CardContent>
        <CardFooter className="block">
          {!showPaypal ? (
            <Button onClick={() => setShowPaypal(true)} className="w-full">
              Add Credits
            </Button>
          ) : (
            <Button
              onClick={() => setShowPaypal(false)}
              className="w-full"
              variant="link"
            >
              Cancel
            </Button>
          )}
        </CardFooter>
      </Card>
      <div id="paypal-button-container" className="mt-4"></div>
    </div>
  );
}
